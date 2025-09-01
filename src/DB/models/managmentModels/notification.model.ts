
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { rolesSchema } from './roles.model';
import { UserSchema } from './users.model';
import { notificationsKyes } from '../../../notifications/notifications';

// Validation function to check if applyOn values are valid
const validateNotificationsKyes = (input: string[]): boolean => {
  return input.every(value => Object.values(notificationsKyes).includes(value));
};

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class Notification {
  constructor(
    name: string,
    triggerType: string,
    applyOn: string[],
    frequency: string,
    usersToBeNotified?: Types.ObjectId[],
    rolesToBeNotified?: Types.ObjectId[],
    isActive?: boolean,
    customSchedule?: string,
    triggerCount?: number
  ) {
    this.name = name;
    this.triggerType = triggerType;
    this.applyOn = applyOn;
    this.frequency = frequency;
    this.usersToBeNotified = usersToBeNotified || [];
    this.rolesToBeNotified = rolesToBeNotified || [];
    this.isActive = isActive !== undefined ? isActive : true;

  }

  @Prop({ type: String, required: true, minlength: 2, maxlength: 100 })
  name: string;

  @Prop({ 
    type: String, 
    required: true,
    default: 'Action' 
  })
  triggerType: string;

  @Prop({ 
    type: [String], 
    required: true,
    validate: {
      validator: validateNotificationsKyes,
      message: 'applyOn values must be from the predefined list in notifications.ts'
    }
  })
  applyOn: string[];

  @Prop({ 
    type: String, 
    required: true,
    default: 'Each action' 
  })
  frequency: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  usersToBeNotified: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'roles', default: [] })
  rolesToBeNotified: Types.ObjectId[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
export const NOTIFICATION_MODEL = 'NOTIFICATION_MODEL';
export const NotificationModel = MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]);

// Pre-save hook to validate applyOn values
NotificationSchema.pre('save', function(next) {
  if (this.applyOn && this.applyOn.length > 0) {
    if (!validateNotificationsKyes(this.applyOn)) {
      return next(new Error('Invalid applyOn values. All values must be from the predefined list in notifications.ts'));
    }
  }

  if(this.usersToBeNotified.length > 0 && this.rolesToBeNotified.length > 0) {
    return next(new Error('usersToBeNotified and rolesToBeNotified cannot be used together'));
  }


  next();
});

// Index for better query performance
NotificationSchema.index({ isActive: 1, triggerType: 1 });
NotificationSchema.index({ usersToBeNotified: 1 });
NotificationSchema.index({ rolesToBeNotified: 1 });

export const getManagmentNotificationModel = (businessNumber: string): DataBaseRepository<NotificationDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in notification model")
  }

  let connection = ConnectionManager.getConnection(businessNumber);
  
  // Register required models for refs
  if (!connection.models['roles']) {
    connection.model('roles', rolesSchema);
  }
  if (!connection.models['User']) {
    connection.model('User', UserSchema);
  }

  const model = connection.models['Notification'] || connection.model('Notification', NotificationSchema) as unknown as Model<NotificationDocument>;

  return new DataBaseRepository<NotificationDocument>(model);
}

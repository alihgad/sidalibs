/* eslint-disable prettier/prettier */
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { Hash } from '../../../secuirty/Hash.helper';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { rolesSchema } from './roles.model';
import { BranchSchema } from '../TenantModels/branch.model';
import { CryptoExporter } from '../../../secuirty/crypto.exporter';
import { languages } from '../../../common/type';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    role: Types.ObjectId[],
    isOwner: Boolean,
    jwtSecret: string,
    cashierLogin?: string,
    email?: string,
    password?: string,
    notifications?: string[],
    loginDevicesSession?: Map<string, { LSID: string; userAgent: string; ipAddress: string; createdAt: Date; deviceType?: string; }>
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.role = role;
    this.isOwner = isOwner;
    this.jwtSecret = jwtSecret;
    this.cashierLogin = cashierLogin;
    this.email = email;
    this.password = password;
    this.notifications = notifications || [];
    this.loginDevicesSession = loginDevicesSession || new Map();
  }

  @Prop({ type: String, required: true, minlength: 2, maxlength: 20 })
  firstName: string;

  @Prop({ type: String, required: true, minlength: 2, maxlength: 20 })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email?: string;

  @Prop({ type: String, required: true, select: false })
  password?: string;

  @Prop({ type: String, required: true, select: false })
  phone: string;
  @Prop({ type: Boolean })
  isOwner: Boolean
  @Prop({ type: [Types.ObjectId], ref: 'roles' })
  role: Types.ObjectId[];
  @Prop({ type: [String], default: [] })
  notifications: string[];
  @Prop({ type: String, select: false })
  jwtSecret: string;
  @Prop({ type: String })
  cashierLogin?: string;
  @Prop({ type: [Types.ObjectId], ref: 'Branch' })
  branches!: Types.ObjectId[];
  @Prop({ type: String, enum: Object.values(languages), default: languages.AR, required: true })
  language?: string;
  @Prop({ type: Boolean, default: false })
  isEmailVerified?: boolean;

  @Prop({ type: Boolean, default: false })
  isPhoneVerified?: boolean;

  @Prop({
    type: Map,
    of: {
      LSID: { type: String, required: true },
      browser: { type: String },
      os: { type: String },
      ipAddress: { type: String },
      createdAt: { type: Date, default: Date.now },
      deviceType: { type: String },
    },
    default: {},
  })
  loginDevicesSession?: Map<string, {
    LSID: string;
    browser?: string;
    os?: string;
    ipAddress: string;
    createdAt: Date;
    deviceType?: string;
  }>;
  userName?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const USER_MODEL = 'USER_MODEL';
export const UserModel = MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]);

// Define virtual field userName
UserSchema.virtual('userName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});
UserSchema.pre("save", function (next) {
  if (this.isModified('password')) {
    if (this.password !== undefined) {
      this.password = Hash(this.password, Number(process.env.SALT_ROUND) || 10);
    }
  }
  if (this.isModified('phone')) {
    if (this.phone !== undefined) {
      this.phone = CryptoExporter.encrypt(this.phone, process.env.CRYPTO_SECRET) as string;
    }
  }
  if (this.isModified('jwtSecret')) {
    if (this.jwtSecret !== undefined) {
      this.jwtSecret = CryptoExporter.encrypt(this.jwtSecret, process.env.CRYPTO_SECRET) as string;
    }
  }
  next();
})
export const getUserModel = (businessNumber: string): DataBaseRepository<UserDocument> => {
  if (!businessNumber) {
    throw new Error("businessNumber is required in user model")
  }
  let connection = ConnectionManager.getConnection(businessNumber);
  
  // تسجيل الـ models المطلوبة للـ refs
  if (!connection.models['roles']) {
    connection.model('roles', rolesSchema);
  }
  if (!connection.models['Branch']) {
    connection.model('Branch', BranchSchema);
  }

  const model = connection.models['User'] || connection.model('User', UserSchema) as unknown as Model<UserDocument>;

  return new DataBaseRepository<UserDocument>(model);
}
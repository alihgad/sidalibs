import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, Document, HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { OrderType } from '../../../common/type';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'CallCenterSettings'
})
export class CallCenterSettings {

  @Prop({ type: String, required: true, unique: true, index: true })
  businessNumber!: string;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  agents?: Types.ObjectId[]; // Select system users who can make an online order  

  @Prop({ type: [Types.ObjectId], ref: "PaymentMethod", default: [] })
  acceptedPaymentModes?: Types.ObjectId[]; // Select the payment modes that will be accepted for call center orders

  @Prop({ type: [Types.ObjectId], ref: 'Branch', default: [] })
  inactiveBranches?: Types.ObjectId[]; // Select the branches where the call center will be deactivated

  @Prop({ type: Types.ObjectId, ref: 'Group' })
  menuGroup?: Types.ObjectId; // Select the menu group to view categories, products & combos

  @Prop({ type: [String], default: [], enum: Object.values(OrderType) })
  inactiveOrderTypes?: string[]; // Select order types that will not be available for call center orders

  @Prop({ type: Boolean, default: false })
  allowDiscounts?: boolean; // Check this box if you want to allow call center agents to make discounts

  @Prop({ type: Boolean, default: false })
  allowEditingOrders?: boolean; // Allow Call Center Agents to Edit Active orders from the Call Center

  @Prop({ type: Boolean, default: false })
  allowVoidingActiveOrders?: boolean; // Allow Call Center Agents to Void Active orders from the Call Center

  @Prop({ type: Boolean, default: false })
  allowAgentsToReadAllCCOrders?: boolean; // Allow the agent to read orders created by other agents

  @Prop({ type: Boolean, default: false })
  allowAgentsToReadAllOrders?: boolean; // Allow agents to view all orders from all Sources

  @Prop({ type: Boolean, default: false })
  allowPriceTags?: boolean; // Allow call center agents to apply price tags on orders

}

export type CallCenterSettingsDocument = HydratedDocument<CallCenterSettings>;

export const CallCenterSettingsSchema = SchemaFactory.createForClass(CallCenterSettings);

export const getCallCenterSettingsModel = (): DataBaseRepository<CallCenterSettingsDocument> => {
  const connection = ConnectionManager.getConnection("main");
  
  const model = connection.models['CallCenterSettings'] || connection.model('CallCenterSettings', CallCenterSettingsSchema) as unknown as Model<CallCenterSettingsDocument>;

  return new DataBaseRepository<CallCenterSettingsDocument>(model);
};




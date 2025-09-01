import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  tenantId!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true, enum: ['subscription', 'purchase', 'other'], default: 'subscription' })
  type!: 'subscription' | 'purchase' | 'other';

  @Prop({ default: 'completed', enum: ['completed', 'failed', 'pending'] })
  status!: 'completed' | 'failed' | 'pending';

  @Prop()
  notes?: string;

  @Prop({ required: true })
  paidAt!: Date;

  @Prop({required:true})
  items!:[string]

  @Prop({required : true})
  countery!: string


  @Prop({required : true})
  plan!: string


}

export type paymentDocument = HydratedDocument<Payment> & { _id: string };
export const paymentSchema = SchemaFactory.createForClass(Payment);
export const payment_MODEL = 'payment_MODEL';
export const paymentModel = MongooseModule.forFeature([
  { name: Payment.name, schema: paymentSchema },
]);

export const PaymentSchema = SchemaFactory.createForClass(Payment);
export const getPaymentModel = (): DataBaseRepository<paymentDocument> => {
    
    let connection = ConnectionManager.getConnection("main");
    const model = connection.models['payment'] || connection.model('payment',paymentSchema ) as unknown as Model<paymentDocument>;
    return new DataBaseRepository<paymentDocument>(model);
}

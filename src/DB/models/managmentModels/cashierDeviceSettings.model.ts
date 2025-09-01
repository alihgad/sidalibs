// cashier-settings.schema.ts

import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

export type CashierSettingsDocument = HydratedDocument<CashierSettings>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class CashierSettings {
  @Prop({ required: true, unique: true, index: true })
  businessNumber!: string;

  // Payment Settings
  @Prop({ type: String, default: '50,100' })
  preApprovedPaymentAmounts!: string; // مبالغ الدفع المحددة مسبقاً

  @Prop({ type: String, default: '' })
  paymentCurrencies!: string; // عملات الدفع

  @Prop({ type: String, default: '' })
  predefinedTipPercentages!: string; // نسب الإكراميات المحددة مسبقاً

  @Prop({ type: Number, default: 0 })
  orderRaisingDelayMinutes!: number; // التأخير في رفع الطلبات (دقيقة)

  @Prop({ type: Number, default: 30 })
  inactiveUserLogoutMinutes!: number; // تسجيل خروج المستخدمين غير النشطين (دقيقة)

  // Return Period Settings
  @Prop({ enum: ['limited', 'notAllowed', 'unlimited'], default: 'limited' })
  returnPeriodType!: string; // نوع فترة الإرجاع

  @Prop({ type: Number, default: 1200 })
  returnPeriodMinutes!: number; // فترة الإرجاع بالدقائق

  // Order Tags
  @Prop({ type: String, default: '' })
  requiredOrderTags!: string; // Require Order Tags for Orders

  // Rounding Method
  @Prop({ enum: ['none', 'round', 'floor', 'ceil'], default: 'none' })
  roundingMethod!: string; // طريقة التقريب

  // Boolean Settings
  @Prop({ type: Boolean, default: false })
  enableTips!: boolean; // تفعيل الإكراميات

  @Prop({ type: Boolean, default: false })
  discountsRequireCustomerInfo!: boolean; // الخصومات والكوبونات تتطلب معلومات العميل

  @Prop({ type: Boolean, default: false })
  cancellationRequiresCustomerInfo!: boolean; // الإلغاء يتطلب معلومات العميل

  @Prop({ type: Boolean, default: false })
  tableSelectionRequiredForLocalOrders!: boolean; // اختيار الطاولة وعدد الزوار إلزامي للطلبات المحلية

  // Additional Boolean Settings
  @Prop({ type: Boolean, default: false })
  alwaysAskCancellationReason!: boolean; // السؤال دائماً عن سبب الإلغاء

  @Prop({ type: Boolean, default: true })
  autoSendOrderToKitchenAfterPayment!: boolean; // إرسال الطلب للمطبخ تلقائياً بعد الدفع الكامل

  @Prop({ type: Boolean, default: false })
  autoSyncDataAtWorkdayStart!: boolean; // مزامنة البيانات تلقائياً عند بداية يوم العمل

  @Prop({ type: Boolean, default: false })
  autoPrintProductReport!: boolean; // طباعة تقرير المنتجات تلقائياً

  @Prop({ type: Boolean, default: false })
  autoPrintLiabilitiesReport!: boolean; // طباعة تقرير العهدات تلقائياً

  @Prop({ type: Boolean, default: false })
  preventEndDayBeforeInventoryCount!: boolean; // منع إنهاء اليوم قبل جرد المخزون

  @Prop({ type: Boolean, default: false })
  autoCloseSelfServiceOrders!: boolean; // إغلاق طلبات جهاز الخدمة الذاتية تلقائياً

  @Prop({ type: Boolean, default: false })
  preventSellingOutOfStockProducts!: boolean; // منع بيع المنتجات الغير متوفرة في المخزون

  @Prop({ type: Boolean, default: false })
  printPaymentReceiptForActiveOrders!: boolean; // طباعة إيصال المدفوعات للطلبات النشطة

  @Prop({ type: Boolean, default: false })
  allowOpeningOneLiability!: boolean; // السماح بفتح عهدة واحدة

  @Prop({ type: Boolean, default: false })
  requireCustomerInfoBeforeClosingOrder!: boolean; // يتوجب إدخال معلومات العميل قبل إغلاق الطلب
}

export const CashierSettingsSchema = SchemaFactory.createForClass(CashierSettings);
export const CASHIER_SETTINGS_MODEL = 'CASHIER_SETTINGS_MODEL';
export const CashierSettingsModel = MongooseModule.forFeature([{ name: 'CashierSettings', schema: CashierSettingsSchema }]);

export const getCashierSettingsModel = (): DataBaseRepository<CashierSettingsDocument> => {
  let connection = ConnectionManager.getConnection("main");
  
  const model = connection.models['CashierSettings'] || connection.model('CashierSettings', CashierSettingsSchema) as unknown as Model<CashierSettingsDocument>;

  return new DataBaseRepository<CashierSettingsDocument>(model);
}

import Stripe from 'stripe';
export declare enum licencesEnum {
    "mainCashier" = "mainCashier",
    "KDS" = "KDS",
    "addOnsCashier" = "addOnsCashier"
}
export declare enum productsType {
    "cashier device" = "prod_SIzCGDfhu25vAS",
    "Cash drawer" = "prod_SIzIlxrgnulDuu",
    "Printer" = "prod_SIzGdXV3w7eBdi",
    "iPad" = "prod_SIzFplT3mK3nu9",
    "KDS" = "prod_SIzEHkZq4Xehzz"
}
export declare enum ProductsTypeEnum {
    IOS_CASHIER = "ios cashier",
    ANDROID_CASHIER = "android cashier",
    LARGE_KITCHEN_SCREEN = "large kitchen screen",
    TABLET_KITCHEN_SCREEN = "tablet kitchen\u00A0screen"
}
export declare class DeviceType {
    type: ProductsTypeEnum;
    quantity: number;
}
export declare enum PlanType {
    FREE = "FREE",
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM"
}
export declare enum PlanDuration {
    month = "month",
    quarter = "quarter",
    year = "year"
}
export declare const planIntervalsMap: Record<PlanDuration, Stripe.Price.Recurring.Interval>;
export declare const planIntervalCountMap: Record<PlanDuration, number>;
export declare const devicePriceMap: Record<ProductsTypeEnum, number>;
export declare const planPriceMap: Record<PlanType, Record<licencesEnum, number>>;
export interface ProductPurchase {
    productName: string;
    productDescription: string;
    unitAmount: number;
    quantity: number;
}
export declare enum languages {
    AR = "AR",
    EN = "EN"
}
export declare class LicenseType {
    type: licencesEnum;
    name?: string;
    duration: PlanDuration;
}
export declare enum OrderType {
    LOCAL = "LOCAL",
    PICKUP = "PICKUP",
    DELIVERY = "DELIVERY",
    DRIVE_THRU = "DRIVE_THRU"
}
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PREPARING = "preparing",
    READY = "ready",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare enum DaysOfWeek {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY"
}
export declare enum PromotionType {
    SIMPLE = "SIMPLE",
    ADVANCED = "ADVANCED",
    PERCENTAGE = "PERCENTAGE",
    FIXED_AMOUNT = "FIXED_AMOUNT",
    BUY_ONE_GET_ONE = "BUY_ONE_GET_ONE",
    FREE_ITEM = "FREE_ITEM"
}
export declare enum DiscountType {
    FIXED = "FIXED",
    PERCENTAGE = "PERCENTAGE"
}
export declare enum DiscountAppliesTo {
    PRODUCT = "PRODUCT",
    ORDER = "ORDER"
}
export declare enum TemporaryEventType {
    FIXED_PRICE = "FIXED_PRICE",
    PRICE_DISCOUNT = "PRICE_DISCOUNT",
    PRICE_INCREASE = "PRICE_INCREASE",
    ACTIVATE_PRODUCTS = "ACTIVATE_PRODUCTS",
    DEACTIVATE_PRODUCTS = "DEACTIVATE_PRODUCTS"
}
export declare enum PaymentMethodType {
    CASH = "CASH",
    CARD = "CARD",
    OTHER = "OTHER"
}
export declare enum TagType {
    CUSTOMERS = "CUSTOMERS",
    BRANCHES = "BRANCHES",
    INVENTORY = "INVENTORY",
    ORDER = "ORDER",
    SUPPLIER = "SUPPLIER",
    USER = "USER",
    PRODUCT = "PRODUCT",
    DEVICE = "DEVICE"
}
export declare enum LogActionType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    OTHER = "OTHER"
}
export declare enum ReasonType {
    CANCELLATION_RETURN = "CANCELLATION_RETURN",
    QUANTITY_MODIFICATION = "QUANTITY_MODIFICATION",
    CASH_REGISTER_OPERATIONS = "CASH_REGISTER_OPERATIONS"
}
export declare enum CostCalculationMethod {
    FIXED = "FIXED",
    OPERATION_BASED = "OPERATION_BASED"
}
export declare enum PricingMethod {
    FIXED = "FIXED",
    OPEN = "OPEN"
}
export declare enum SaleMethod {
    UNIT = "UNIT",
    WEIGHT = "WEIGHT"
}
export declare enum ServingUnit {
    GRAM = "GRAM",
    ML = "ML",
    SERVING = "SERVING"
}
export declare enum SaleStatusEnum {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare enum PaymentMethodEnum {
    CASH = "cash",
    CARD = "card",
    OTHER = "other"
}
export declare enum DeliveryTime {
    T_00_00 = "00:00",
    T_00_30 = "00:30",
    T_01_00 = "01:00",
    T_01_30 = "01:30",
    T_02_00 = "02:00",
    T_02_30 = "02:30",
    T_03_00 = "03:00",
    T_03_30 = "03:30",
    T_04_00 = "04:00",
    T_04_30 = "04:30",
    T_05_00 = "05:00",
    T_05_30 = "05:30",
    T_06_00 = "06:00",
    T_06_30 = "06:30",
    T_07_00 = "07:00",
    T_07_30 = "07:30",
    T_08_00 = "08:00",
    T_08_30 = "08:30",
    T_09_00 = "09:00",
    T_09_30 = "09:30",
    T_10_00 = "10:00",
    T_10_30 = "10:30",
    T_11_00 = "11:00",
    T_11_30 = "11:30",
    T_12_00 = "12:00",
    T_12_30 = "12:30",
    T_13_00 = "13:00",
    T_13_30 = "13:30",
    T_14_00 = "14:00",
    T_14_30 = "14:30",
    T_15_00 = "15:00",
    T_15_30 = "15:30",
    T_16_00 = "16:00",
    T_16_30 = "16:30",
    T_17_00 = "17:00",
    T_17_30 = "17:30",
    T_18_00 = "18:00",
    T_18_30 = "18:30",
    T_19_00 = "19:00",
    T_19_30 = "19:30",
    T_20_00 = "20:00",
    T_20_30 = "20:30",
    T_21_00 = "21:00",
    T_21_30 = "21:30",
    T_22_00 = "22:00",
    T_22_30 = "22:30",
    T_23_00 = "23:00",
    T_23_30 = "23:30",
    T_23_59 = "23:59"
}
export declare enum PurchaseOrderStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CLOSED = "closed",
    DRAFT = "draft",
    CANCELLED = "cancelled"
}
export declare enum PurchaseStatus {
    CLOSED = "closed",
    DRAFT = "draft",
    PENDING = "pending"
}
export declare enum PurchaseType {
    PURCHASE = "purchase",
    RETURN = "return"
}
export declare enum TransferStatus {
    DRAFT = "draft",
    PENDING = "pending",
    CLOSED = "closed",
    CANCELLED = "cancelled"
}
export declare enum TransferType {
    TRANSFER_SENDING = "transfer_sending",
    TRANSFER_RECEIVING = "transfer_receiving"
}
export declare enum InventoryCountStatus {
    DRAFT = "draft",
    PENDING = "pending",
    CLOSED = "closed",
    CANCELLED = "cancelled"
}
export declare enum ChargeType {
    VALUE = "value",
    PERCENTAGE = "percentage"
}
export declare enum KitchenFlowStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum KitchenFlowType {
    ORDER = "ORDER",
    PREPARATION = "PREPARATION",
    COOKING = "COOKING",
    ASSEMBLY = "ASSEMBLY",
    PACKAGING = "PACKAGING"
}
export declare enum DeliveryStatus {
    PENDING = "pending",
    PREPARING = "preparing",
    READY = "ready",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare enum OrderSource {
    CASHIER = "cashier",
    DRIVE_THRU = "drive_thru"
}
export declare enum ProductionType {
    PRODUCTION = "production",
    CONSUMPTION = "consumption",
    WASTE = "waste"
}
export declare enum ProductionStatus {
    PENDING = "pending",
    SENT = "sent",
    CLOSED = "closed",
    CANCELLED = "cancelled"
}
//# sourceMappingURL=type.d.ts.map
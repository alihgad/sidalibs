import Stripe from 'stripe';
export declare enum deviceTypeEnum {
    "mainCashier" = "mainCashier",
    "addOnsCashier" = "addOnsCashier",
    "KDS" = "KDS"
}
export declare enum licencesEnum {
    "mainCashier" = "mainCashier",
    "KDS" = "KDS",
    "addOnsCashier" = "addOnsCashier"
}
export declare enum ProductsTypeEnum {
    POS = "POS",
    KIOSK = "KIOSK",
    TABLET = "TABLET"
}
export declare enum productsType {
    "cashier device" = "prod_SIzCGDfhu25vAS",
    "Cash drawer" = "prod_SIzIlxrgnulDuu",
    "Printer" = "prod_SIzGdXV3w7eBdi",
    "iPad" = "prod_SIzFplT3mK3nu9",
    "KDS" = "prod_SIzEHkZq4Xehzz"
}
export declare enum ProductsTypeEnum {
    CASHIER_DEVICE = "cashier device",
    CASH_DRAWER = "Cash drawer",
    PRINTER = "Printer",
    IPAD = "iPad",
    KDS = "KDS"
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
    '00:00' = "00:00",
    '00:30' = "00:30",
    '01:00' = "01:00",
    '01:30' = "01:30",
    '02:00' = "02:00",
    '02:30' = "02:30",
    '03:00' = "03:00",
    '03:30' = "03:30",
    '04:00' = "04:00",
    '04:30' = "04:30",
    '05:00' = "05:00",
    '05:30' = "05:30",
    '06:00' = "06:00",
    '06:30' = "06:30",
    '07:00' = "07:00",
    '07:30' = "07:30",
    '08:00' = "08:00",
    '08:30' = "08:30",
    '09:00' = "09:00",
    '09:30' = "09:30",
    '10:00' = "10:00",
    '10:30' = "10:30",
    '11:00' = "11:00",
    '11:30' = "11:30",
    '12:00' = "12:00",
    '12:30' = "12:30",
    '13:00' = "13:00",
    '13:30' = "13:30",
    '14:00' = "14:00",
    '14:30' = "14:30",
    '15:00' = "15:00",
    '15:30' = "15:30",
    '16:00' = "16:00",
    '16:30' = "16:30",
    '17:00' = "17:00",
    '17:30' = "17:30",
    '18:00' = "18:00",
    '18:30' = "18:30",
    '19:00' = "19:00",
    '19:30' = "19:30",
    '20:00' = "20:00",
    '20:30' = "20:30",
    '21:00' = "21:00",
    '21:30' = "21:30",
    '22:00' = "22:00",
    '22:30' = "22:30",
    '23:00' = "23:00",
    '23:30' = "23:30",
    '23:59' = "23:59"
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
//# sourceMappingURL=type.d.ts.map
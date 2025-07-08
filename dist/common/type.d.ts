import Stripe from 'stripe';
export declare enum deviceTypeEnum {
    "cashier" = "cashier",
    "KDS" = "KDS"
}
export declare enum licencesEnum {
    "cashier" = "cashier",
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
export declare const planPriceMap: Record<PlanType, number>;
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
    name: string;
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
//# sourceMappingURL=type.d.ts.map
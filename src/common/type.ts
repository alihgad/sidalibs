import { registerEnumType } from '@nestjs/graphql';
import Stripe from 'stripe';
export enum ProductsTypeEnum {
    POS = 'POS',
    KIOSK = 'KIOSK',
    TABLET = 'TABLET'
}
export enum productsType {
    "cashier device" = "prod_SIzCGDfhu25vAS",
    "Cash drawer" = "prod_SIzIlxrgnulDuu",
    "Printer" = "prod_SIzGdXV3w7eBdi",
    "iPad" = "prod_SIzFplT3mK3nu9",
    "KDS" = "prod_SIzEHkZq4Xehzz",
}
export enum ProductsTypeEnum {
    CASHIER_DEVICE = "cashier device",
    CASH_DRAWER = "Cash drawer",
    PRINTER = "Printer",
    IPAD = "iPad",
    KDS = "KDS"
}
registerEnumType(ProductsTypeEnum, {

    name: 'ProductsTypeEnum',
    description: 'The type of product',
});
export enum PlanType {
    FREE = 'FREE',
    BASIC = 'BASIC',
    STANDARD = 'STANDARD',
    PREMIUM = 'PREMIUM',
}
export enum PlanDuration {
    month = 'month',
    quarter = 'quarter',
    year = 'year',
}
export const planIntervalsMap: Record<PlanDuration, Stripe.Price.Recurring.Interval> = {
    [PlanDuration.month]: 'month',
    [PlanDuration.quarter]: 'month',
    [PlanDuration.year]: 'year',
};
export const planIntervalCountMap: Record<PlanDuration, number> = {
    [PlanDuration.month]: 1,
    [PlanDuration.quarter]: 3,
    [PlanDuration.year]: 1,
};
registerEnumType(PlanType, {
    name: 'PlanType',
    description: 'The type of plan',
})
registerEnumType(PlanDuration, {
    name: 'PlanDuration',
    description: 'The duration of the plan',
})
export const devicePriceMap: Record<ProductsTypeEnum, number> = {
    [ProductsTypeEnum.CASHIER_DEVICE]: 10000, // $100.00
    [ProductsTypeEnum.CASH_DRAWER]: 5000,
    [ProductsTypeEnum.PRINTER]: 8000,
    [ProductsTypeEnum.IPAD]: 30000,
    [ProductsTypeEnum.KDS]: 7000,
    [ProductsTypeEnum.POS]: 0,
    [ProductsTypeEnum.KIOSK]: 0,
    [ProductsTypeEnum.TABLET]: 0
};

export const planPriceMap: Record<PlanType, number> = {
    [PlanType.BASIC]: 2000,
    [PlanType.STANDARD]: 4000,
    [PlanType.PREMIUM]: 6000,
    [PlanType.FREE]: 0,
};
export interface ProductPurchase {
    productName: string;
    productDescription: string;
    unitAmount: number;
    quantity: number;
}
export enum languages {
    AR = 'AR',
    EN = 'EN'
}

registerEnumType(languages, {
    name: 'Languages',
    description: 'Available languages for the application',
});

export enum OrderType {
    LOCAL = 'LOCAL',
    PICKUP = 'PICKUP',
    DELIVERY = 'DELIVERY',
    DRIVE_THRU = 'DRIVE_THRU'
}

export enum DaysOfWeek {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY'
}

export enum PromotionType {
    SIMPLE = 'SIMPLE',
    ADVANCED = 'ADVANCED',
    PERCENTAGE = 'PERCENTAGE',
    FIXED_AMOUNT = 'FIXED_AMOUNT',
    BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE',
    FREE_ITEM = 'FREE_ITEM'
}

registerEnumType(OrderType, {
    name: 'OrderType',
    description: 'The type of order',
});

registerEnumType(DaysOfWeek, {
    name: 'DaysOfWeek',
    description: 'Days of the week',
});

registerEnumType(PromotionType, {
    name: 'PromotionType',
    description: 'The type of promotion',
});

export enum DiscountType {
    FIXED = 'FIXED',
    PERCENTAGE = 'PERCENTAGE'
}

export enum DiscountAppliesTo {
    PRODUCT = 'PRODUCT',
    ORDER = 'ORDER'
}

registerEnumType(DiscountType, {
    name: 'DiscountType',
    description: 'The type of discount',
});

registerEnumType(DiscountAppliesTo, {
    name: 'DiscountAppliesTo',
    description: 'What the discount applies to',
});

export enum TemporaryEventType {
    FIXED_PRICE = 'FIXED_PRICE',
    PRICE_DISCOUNT = 'PRICE_DISCOUNT',
    PRICE_INCREASE = 'PRICE_INCREASE',
    ACTIVATE_PRODUCTS = 'ACTIVATE_PRODUCTS',
    DEACTIVATE_PRODUCTS = 'DEACTIVATE_PRODUCTS'
}

registerEnumType(TemporaryEventType, {
    name: 'TemporaryEventType',
    description: 'The type of temporary event',
});

export enum PaymentMethodType {
    CASH = 'CASH',
    CARD = 'CARD',
    OTHER = 'OTHER'
}

registerEnumType(PaymentMethodType, {
    name: 'PaymentMethodType',
    description: 'The type of payment method',
});

export enum TagType {
    CUSTOMERS = 'CUSTOMERS',
    BRANCHES = 'BRANCHES',
    INVENTORY = 'INVENTORY',
    ORDER = 'ORDER',
    SUPPLIER = 'SUPPLIER',
    USER = 'USER',
    PRODUCT = 'PRODUCT',
    DEVICE = 'DEVICE'
}

registerEnumType(TagType, {
    name: 'TagType',
    description: 'The type of tag',
});
export enum LogActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    OTHER = 'OTHER'
}
registerEnumType(LogActionType, {
    name: 'LogActionType',
    description: 'The type of log',
});

export enum ReasonType {
    CANCELLATION_RETURN = 'CANCELLATION_RETURN',
    QUANTITY_MODIFICATION = 'QUANTITY_MODIFICATION',
    CASH_REGISTER_OPERATIONS = 'CASH_REGISTER_OPERATIONS'
}

registerEnumType(ReasonType, {
    name: 'ReasonType',
    description: 'The type of reason',
});
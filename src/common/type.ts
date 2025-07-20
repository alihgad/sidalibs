import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsInt, Min, IsString, IsOptional } from 'class-validator';

import Stripe from 'stripe';


export enum deviceTypeEnum{
    "mainCashier" = "mainCashier",
    "addOnsCashier" = "addOnsCashier",
    "KDS" = "KDS"
}


registerEnumType(deviceTypeEnum, {
    name: 'deviceTypeEnum',
    description: 'The type of device',
})

export enum licencesEnum{
    "mainCashier" = "mainCashier",
    "KDS" = "KDS",
    "addOnsCashier" = "addOnsCashier",
}


registerEnumType(licencesEnum, {
    name: 'licencesEnum',
    description: 'The type of licence',
})

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




@ObjectType('DeviceType')
@InputType('DeviceInputType')
export class DeviceType {
    @Field(() => ProductsTypeEnum)
    @IsEnum(ProductsTypeEnum)
    @IsNotEmpty()
    type!: ProductsTypeEnum;

    @Field(() => Number)
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantity!: number;
}




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

export const planPriceMap: Record<PlanType, Record<licencesEnum, number>> = {
    [PlanType.BASIC]: {
        [licencesEnum.mainCashier]: 2000,
        [licencesEnum.KDS]: 500,
        [licencesEnum.addOnsCashier]: 1000,
    },
    [PlanType.STANDARD]: {
        [licencesEnum.mainCashier]: 4000,
        [licencesEnum.KDS]: 1000,
        [licencesEnum.addOnsCashier]: 2000,
    },
    [PlanType.PREMIUM]: {
        [licencesEnum.mainCashier]: 6000,
        [licencesEnum.KDS]: 1500,
        [licencesEnum.addOnsCashier]: 3000,
    },
    [PlanType.FREE]: {
        [licencesEnum.mainCashier]: 0,
        [licencesEnum.KDS]: 0,
        [licencesEnum.addOnsCashier]: 0,
    },
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


@ObjectType('LicenceType')
@InputType('LicenceInputType')
export class LicenseType {

    @Field(() => licencesEnum)
    @IsEnum(licencesEnum)
    @IsNotEmpty()
    type!: licencesEnum;

    @Field(() => String)
    @IsString()
    @IsOptional()
    name?: string;

    @Field(() => PlanDuration)
    @IsEnum(PlanDuration)
    @IsNotEmpty()
    duration!: PlanDuration;

}



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

export enum CostCalculationMethod {
    FIXED = 'FIXED',
    OPERATION_BASED = 'OPERATION_BASED'
}

registerEnumType(CostCalculationMethod, {
    name: 'CostCalculationMethod',
    description: 'Cost calculation method (fixed or operation based)',
});

export enum PricingMethod {
    FIXED = 'FIXED',
    OPEN = 'OPEN'
}

registerEnumType(PricingMethod, {
    name: 'PricingMethod',
    description: 'Pricing method (fixed or open)',
});

export enum SaleMethod {
    UNIT = 'UNIT',
    WEIGHT = 'WEIGHT'
}

registerEnumType(SaleMethod, {
    name: 'SaleMethod',
    description: 'Sale method (unit or weight)',
});

export enum ServingUnit {
    GRAM = 'GRAM',
    ML = 'ML',
    SERVING = 'SERVING'
}

registerEnumType(ServingUnit, {
    name: 'ServingUnit',
    description: 'Serving unit for nutritional values',
});


export enum SaleStatusEnum {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded'
}

registerEnumType(SaleStatusEnum, {
    name: 'SaleStatus',
    description: 'The status of the sale',
});

export enum PaymentMethodEnum {
    CASH = 'cash',
    CARD = 'card',
    OTHER = 'other'
}

registerEnumType(PaymentMethodEnum, {
    name: 'PaymentMethod',
    description: 'The method of payment',
});


export enum DeliveryTime {
    '00:00' = '00:00',
    '00:30' = '00:30',
    '01:00' = '01:00',
    '01:30' = '01:30',
    '02:00' = '02:00',
    '02:30' = '02:30',
    '03:00' = '03:00',
    '03:30' = '03:30',
    '04:00' = '04:00',
    '04:30' = '04:30',
    '05:00' = '05:00',
    '05:30' = '05:30',
    '06:00' = '06:00',
    '06:30' = '06:30',
    '07:00' = '07:00',
    '07:30' = '07:30',
    '08:00' = '08:00',
    '08:30' = '08:30',
    '09:00' = '09:00',
    '09:30' = '09:30',
    '10:00' = '10:00',
    '10:30' = '10:30',
    '11:00' = '11:00',
    '11:30' = '11:30',
    '12:00' = '12:00',
    '12:30' = '12:30',
    '13:00' = '13:00',
    '13:30' = '13:30',
    '14:00' = '14:00',
    '14:30' = '14:30',
    '15:00' = '15:00',
    '15:30' = '15:30',
    '16:00' = '16:00',
    '16:30' = '16:30',
    '17:00' = '17:00',
    '17:30' = '17:30',
    '18:00' = '18:00',
    '18:30' = '18:30',
    '19:00' = '19:00',
    '19:30' = '19:30',
    '20:00' = '20:00',
    '20:30' = '20:30',
    '21:00' = '21:00',
    '21:30' = '21:30',
    '22:00' = '22:00',
    '22:30' = '22:30',
    '23:00' = '23:00',
    '23:30' = '23:30',
    '23:59' = '23:59'
  }

  registerEnumType(DeliveryTime, {
    name: 'DeliveryTime',
    description: 'The time of the delivery',
  });


  export enum PurchaseOrderStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CLOSED = 'CLOSED',
    DRAFT = 'DRAFT',
    CANCELLED = 'CANCELLED'
  }

  registerEnumType(PurchaseOrderStatus, {
    name: 'PurchaseOrderStatus',
    description: 'The status of the purchase order',
  });





"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasonType = exports.LogActionType = exports.TagType = exports.PaymentMethodType = exports.TemporaryEventType = exports.DiscountAppliesTo = exports.DiscountType = exports.PromotionType = exports.DaysOfWeek = exports.OrderType = exports.languages = exports.planPriceMap = exports.devicePriceMap = exports.planIntervalCountMap = exports.planIntervalsMap = exports.PlanDuration = exports.PlanType = exports.productsType = exports.ProductsTypeEnum = exports.licencesEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var licencesEnum;
(function (licencesEnum) {
    licencesEnum["cashier"] = "cashier";
    licencesEnum["KDS"] = "KDS";
})(licencesEnum || (exports.licencesEnum = licencesEnum = {}));
(0, graphql_1.registerEnumType)(licencesEnum, {
    name: 'licencesEnum',
    description: 'The type of licence',
});
var ProductsTypeEnum;
(function (ProductsTypeEnum) {
    ProductsTypeEnum["POS"] = "POS";
    ProductsTypeEnum["KIOSK"] = "KIOSK";
    ProductsTypeEnum["TABLET"] = "TABLET";
})(ProductsTypeEnum || (exports.ProductsTypeEnum = ProductsTypeEnum = {}));
var productsType;
(function (productsType) {
    productsType["cashier device"] = "prod_SIzCGDfhu25vAS";
    productsType["Cash drawer"] = "prod_SIzIlxrgnulDuu";
    productsType["Printer"] = "prod_SIzGdXV3w7eBdi";
    productsType["iPad"] = "prod_SIzFplT3mK3nu9";
    productsType["KDS"] = "prod_SIzEHkZq4Xehzz";
})(productsType || (exports.productsType = productsType = {}));
(function (ProductsTypeEnum) {
    ProductsTypeEnum["CASHIER_DEVICE"] = "cashier device";
    ProductsTypeEnum["CASH_DRAWER"] = "Cash drawer";
    ProductsTypeEnum["PRINTER"] = "Printer";
    ProductsTypeEnum["IPAD"] = "iPad";
    ProductsTypeEnum["KDS"] = "KDS";
})(ProductsTypeEnum || (exports.ProductsTypeEnum = ProductsTypeEnum = {}));
(0, graphql_1.registerEnumType)(ProductsTypeEnum, {
    name: 'ProductsTypeEnum',
    description: 'The type of product',
});
var PlanType;
(function (PlanType) {
    PlanType["FREE"] = "FREE";
    PlanType["BASIC"] = "BASIC";
    PlanType["STANDARD"] = "STANDARD";
    PlanType["PREMIUM"] = "PREMIUM";
})(PlanType || (exports.PlanType = PlanType = {}));
var PlanDuration;
(function (PlanDuration) {
    PlanDuration["month"] = "month";
    PlanDuration["quarter"] = "quarter";
    PlanDuration["year"] = "year";
})(PlanDuration || (exports.PlanDuration = PlanDuration = {}));
exports.planIntervalsMap = {
    [PlanDuration.month]: 'month',
    [PlanDuration.quarter]: 'month',
    [PlanDuration.year]: 'year',
};
exports.planIntervalCountMap = {
    [PlanDuration.month]: 1,
    [PlanDuration.quarter]: 3,
    [PlanDuration.year]: 1,
};
(0, graphql_1.registerEnumType)(PlanType, {
    name: 'PlanType',
    description: 'The type of plan',
});
(0, graphql_1.registerEnumType)(PlanDuration, {
    name: 'PlanDuration',
    description: 'The duration of the plan',
});
exports.devicePriceMap = {
    [ProductsTypeEnum.CASHIER_DEVICE]: 10000, // $100.00
    [ProductsTypeEnum.CASH_DRAWER]: 5000,
    [ProductsTypeEnum.PRINTER]: 8000,
    [ProductsTypeEnum.IPAD]: 30000,
    [ProductsTypeEnum.KDS]: 7000,
    [ProductsTypeEnum.POS]: 0,
    [ProductsTypeEnum.KIOSK]: 0,
    [ProductsTypeEnum.TABLET]: 0
};
exports.planPriceMap = {
    [PlanType.BASIC]: 2000,
    [PlanType.STANDARD]: 4000,
    [PlanType.PREMIUM]: 6000,
    [PlanType.FREE]: 0,
};
var languages;
(function (languages) {
    languages["AR"] = "AR";
    languages["EN"] = "EN";
})(languages || (exports.languages = languages = {}));
(0, graphql_1.registerEnumType)(languages, {
    name: 'Languages',
    description: 'Available languages for the application',
});
var OrderType;
(function (OrderType) {
    OrderType["LOCAL"] = "LOCAL";
    OrderType["PICKUP"] = "PICKUP";
    OrderType["DELIVERY"] = "DELIVERY";
    OrderType["DRIVE_THRU"] = "DRIVE_THRU";
})(OrderType || (exports.OrderType = OrderType = {}));
var DaysOfWeek;
(function (DaysOfWeek) {
    DaysOfWeek["SUNDAY"] = "SUNDAY";
    DaysOfWeek["MONDAY"] = "MONDAY";
    DaysOfWeek["TUESDAY"] = "TUESDAY";
    DaysOfWeek["WEDNESDAY"] = "WEDNESDAY";
    DaysOfWeek["THURSDAY"] = "THURSDAY";
    DaysOfWeek["FRIDAY"] = "FRIDAY";
    DaysOfWeek["SATURDAY"] = "SATURDAY";
})(DaysOfWeek || (exports.DaysOfWeek = DaysOfWeek = {}));
var PromotionType;
(function (PromotionType) {
    PromotionType["SIMPLE"] = "SIMPLE";
    PromotionType["ADVANCED"] = "ADVANCED";
    PromotionType["PERCENTAGE"] = "PERCENTAGE";
    PromotionType["FIXED_AMOUNT"] = "FIXED_AMOUNT";
    PromotionType["BUY_ONE_GET_ONE"] = "BUY_ONE_GET_ONE";
    PromotionType["FREE_ITEM"] = "FREE_ITEM";
})(PromotionType || (exports.PromotionType = PromotionType = {}));
(0, graphql_1.registerEnumType)(OrderType, {
    name: 'OrderType',
    description: 'The type of order',
});
(0, graphql_1.registerEnumType)(DaysOfWeek, {
    name: 'DaysOfWeek',
    description: 'Days of the week',
});
(0, graphql_1.registerEnumType)(PromotionType, {
    name: 'PromotionType',
    description: 'The type of promotion',
});
var DiscountType;
(function (DiscountType) {
    DiscountType["FIXED"] = "FIXED";
    DiscountType["PERCENTAGE"] = "PERCENTAGE";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var DiscountAppliesTo;
(function (DiscountAppliesTo) {
    DiscountAppliesTo["PRODUCT"] = "PRODUCT";
    DiscountAppliesTo["ORDER"] = "ORDER";
})(DiscountAppliesTo || (exports.DiscountAppliesTo = DiscountAppliesTo = {}));
(0, graphql_1.registerEnumType)(DiscountType, {
    name: 'DiscountType',
    description: 'The type of discount',
});
(0, graphql_1.registerEnumType)(DiscountAppliesTo, {
    name: 'DiscountAppliesTo',
    description: 'What the discount applies to',
});
var TemporaryEventType;
(function (TemporaryEventType) {
    TemporaryEventType["FIXED_PRICE"] = "FIXED_PRICE";
    TemporaryEventType["PRICE_DISCOUNT"] = "PRICE_DISCOUNT";
    TemporaryEventType["PRICE_INCREASE"] = "PRICE_INCREASE";
    TemporaryEventType["ACTIVATE_PRODUCTS"] = "ACTIVATE_PRODUCTS";
    TemporaryEventType["DEACTIVATE_PRODUCTS"] = "DEACTIVATE_PRODUCTS";
})(TemporaryEventType || (exports.TemporaryEventType = TemporaryEventType = {}));
(0, graphql_1.registerEnumType)(TemporaryEventType, {
    name: 'TemporaryEventType',
    description: 'The type of temporary event',
});
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["CASH"] = "CASH";
    PaymentMethodType["CARD"] = "CARD";
    PaymentMethodType["OTHER"] = "OTHER";
})(PaymentMethodType || (exports.PaymentMethodType = PaymentMethodType = {}));
(0, graphql_1.registerEnumType)(PaymentMethodType, {
    name: 'PaymentMethodType',
    description: 'The type of payment method',
});
var TagType;
(function (TagType) {
    TagType["CUSTOMERS"] = "CUSTOMERS";
    TagType["BRANCHES"] = "BRANCHES";
    TagType["INVENTORY"] = "INVENTORY";
    TagType["ORDER"] = "ORDER";
    TagType["SUPPLIER"] = "SUPPLIER";
    TagType["USER"] = "USER";
    TagType["PRODUCT"] = "PRODUCT";
    TagType["DEVICE"] = "DEVICE";
})(TagType || (exports.TagType = TagType = {}));
(0, graphql_1.registerEnumType)(TagType, {
    name: 'TagType',
    description: 'The type of tag',
});
var LogActionType;
(function (LogActionType) {
    LogActionType["CREATE"] = "CREATE";
    LogActionType["UPDATE"] = "UPDATE";
    LogActionType["DELETE"] = "DELETE";
    LogActionType["LOGIN"] = "LOGIN";
    LogActionType["LOGOUT"] = "LOGOUT";
    LogActionType["OTHER"] = "OTHER";
})(LogActionType || (exports.LogActionType = LogActionType = {}));
(0, graphql_1.registerEnumType)(LogActionType, {
    name: 'LogActionType',
    description: 'The type of log',
});
var ReasonType;
(function (ReasonType) {
    ReasonType["CANCELLATION_RETURN"] = "CANCELLATION_RETURN";
    ReasonType["QUANTITY_MODIFICATION"] = "QUANTITY_MODIFICATION";
    ReasonType["CASH_REGISTER_OPERATIONS"] = "CASH_REGISTER_OPERATIONS";
})(ReasonType || (exports.ReasonType = ReasonType = {}));
(0, graphql_1.registerEnumType)(ReasonType, {
    name: 'ReasonType',
    description: 'The type of reason',
});

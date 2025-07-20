"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderStatus = exports.DeliveryTime = exports.PaymentMethodEnum = exports.SaleStatusEnum = exports.ServingUnit = exports.SaleMethod = exports.PricingMethod = exports.CostCalculationMethod = exports.ReasonType = exports.LogActionType = exports.TagType = exports.PaymentMethodType = exports.TemporaryEventType = exports.DiscountAppliesTo = exports.DiscountType = exports.PromotionType = exports.DaysOfWeek = exports.OrderType = exports.LicenseType = exports.languages = exports.planPriceMap = exports.devicePriceMap = exports.planIntervalCountMap = exports.planIntervalsMap = exports.PlanDuration = exports.PlanType = exports.DeviceType = exports.productsType = exports.ProductsTypeEnum = exports.licencesEnum = exports.deviceTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var deviceTypeEnum;
(function (deviceTypeEnum) {
    deviceTypeEnum["mainCashier"] = "mainCashier";
    deviceTypeEnum["addOnsCashier"] = "addOnsCashier";
    deviceTypeEnum["KDS"] = "KDS";
})(deviceTypeEnum || (exports.deviceTypeEnum = deviceTypeEnum = {}));
(0, graphql_1.registerEnumType)(deviceTypeEnum, {
    name: 'deviceTypeEnum',
    description: 'The type of device',
});
var licencesEnum;
(function (licencesEnum) {
    licencesEnum["mainCashier"] = "mainCashier";
    licencesEnum["KDS"] = "KDS";
    licencesEnum["addOnsCashier"] = "addOnsCashier";
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
let DeviceType = class DeviceType {
};
exports.DeviceType = DeviceType;
__decorate([
    (0, graphql_1.Field)(() => ProductsTypeEnum),
    (0, class_validator_1.IsEnum)(ProductsTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeviceType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DeviceType.prototype, "quantity", void 0);
exports.DeviceType = DeviceType = __decorate([
    (0, graphql_1.ObjectType)('DeviceType'),
    (0, graphql_1.InputType)('DeviceInputType')
], DeviceType);
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
var languages;
(function (languages) {
    languages["AR"] = "AR";
    languages["EN"] = "EN";
})(languages || (exports.languages = languages = {}));
(0, graphql_1.registerEnumType)(languages, {
    name: 'Languages',
    description: 'Available languages for the application',
});
let LicenseType = class LicenseType {
};
exports.LicenseType = LicenseType;
__decorate([
    (0, graphql_1.Field)(() => licencesEnum),
    (0, class_validator_1.IsEnum)(licencesEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LicenseType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LicenseType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => PlanDuration),
    (0, class_validator_1.IsEnum)(PlanDuration),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LicenseType.prototype, "duration", void 0);
exports.LicenseType = LicenseType = __decorate([
    (0, graphql_1.ObjectType)('LicenceType'),
    (0, graphql_1.InputType)('LicenceInputType')
], LicenseType);
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
var CostCalculationMethod;
(function (CostCalculationMethod) {
    CostCalculationMethod["FIXED"] = "FIXED";
    CostCalculationMethod["OPERATION_BASED"] = "OPERATION_BASED";
})(CostCalculationMethod || (exports.CostCalculationMethod = CostCalculationMethod = {}));
(0, graphql_1.registerEnumType)(CostCalculationMethod, {
    name: 'CostCalculationMethod',
    description: 'Cost calculation method (fixed or operation based)',
});
var PricingMethod;
(function (PricingMethod) {
    PricingMethod["FIXED"] = "FIXED";
    PricingMethod["OPEN"] = "OPEN";
})(PricingMethod || (exports.PricingMethod = PricingMethod = {}));
(0, graphql_1.registerEnumType)(PricingMethod, {
    name: 'PricingMethod',
    description: 'Pricing method (fixed or open)',
});
var SaleMethod;
(function (SaleMethod) {
    SaleMethod["UNIT"] = "UNIT";
    SaleMethod["WEIGHT"] = "WEIGHT";
})(SaleMethod || (exports.SaleMethod = SaleMethod = {}));
(0, graphql_1.registerEnumType)(SaleMethod, {
    name: 'SaleMethod',
    description: 'Sale method (unit or weight)',
});
var ServingUnit;
(function (ServingUnit) {
    ServingUnit["GRAM"] = "GRAM";
    ServingUnit["ML"] = "ML";
    ServingUnit["SERVING"] = "SERVING";
})(ServingUnit || (exports.ServingUnit = ServingUnit = {}));
(0, graphql_1.registerEnumType)(ServingUnit, {
    name: 'ServingUnit',
    description: 'Serving unit for nutritional values',
});
var SaleStatusEnum;
(function (SaleStatusEnum) {
    SaleStatusEnum["PENDING"] = "pending";
    SaleStatusEnum["COMPLETED"] = "completed";
    SaleStatusEnum["CANCELLED"] = "cancelled";
    SaleStatusEnum["REFUNDED"] = "refunded";
})(SaleStatusEnum || (exports.SaleStatusEnum = SaleStatusEnum = {}));
(0, graphql_1.registerEnumType)(SaleStatusEnum, {
    name: 'SaleStatus',
    description: 'The status of the sale',
});
var PaymentMethodEnum;
(function (PaymentMethodEnum) {
    PaymentMethodEnum["CASH"] = "cash";
    PaymentMethodEnum["CARD"] = "card";
    PaymentMethodEnum["OTHER"] = "other";
})(PaymentMethodEnum || (exports.PaymentMethodEnum = PaymentMethodEnum = {}));
(0, graphql_1.registerEnumType)(PaymentMethodEnum, {
    name: 'PaymentMethod',
    description: 'The method of payment',
});
var DeliveryTime;
(function (DeliveryTime) {
    DeliveryTime["00:00"] = "00:00";
    DeliveryTime["00:30"] = "00:30";
    DeliveryTime["01:00"] = "01:00";
    DeliveryTime["01:30"] = "01:30";
    DeliveryTime["02:00"] = "02:00";
    DeliveryTime["02:30"] = "02:30";
    DeliveryTime["03:00"] = "03:00";
    DeliveryTime["03:30"] = "03:30";
    DeliveryTime["04:00"] = "04:00";
    DeliveryTime["04:30"] = "04:30";
    DeliveryTime["05:00"] = "05:00";
    DeliveryTime["05:30"] = "05:30";
    DeliveryTime["06:00"] = "06:00";
    DeliveryTime["06:30"] = "06:30";
    DeliveryTime["07:00"] = "07:00";
    DeliveryTime["07:30"] = "07:30";
    DeliveryTime["08:00"] = "08:00";
    DeliveryTime["08:30"] = "08:30";
    DeliveryTime["09:00"] = "09:00";
    DeliveryTime["09:30"] = "09:30";
    DeliveryTime["10:00"] = "10:00";
    DeliveryTime["10:30"] = "10:30";
    DeliveryTime["11:00"] = "11:00";
    DeliveryTime["11:30"] = "11:30";
    DeliveryTime["12:00"] = "12:00";
    DeliveryTime["12:30"] = "12:30";
    DeliveryTime["13:00"] = "13:00";
    DeliveryTime["13:30"] = "13:30";
    DeliveryTime["14:00"] = "14:00";
    DeliveryTime["14:30"] = "14:30";
    DeliveryTime["15:00"] = "15:00";
    DeliveryTime["15:30"] = "15:30";
    DeliveryTime["16:00"] = "16:00";
    DeliveryTime["16:30"] = "16:30";
    DeliveryTime["17:00"] = "17:00";
    DeliveryTime["17:30"] = "17:30";
    DeliveryTime["18:00"] = "18:00";
    DeliveryTime["18:30"] = "18:30";
    DeliveryTime["19:00"] = "19:00";
    DeliveryTime["19:30"] = "19:30";
    DeliveryTime["20:00"] = "20:00";
    DeliveryTime["20:30"] = "20:30";
    DeliveryTime["21:00"] = "21:00";
    DeliveryTime["21:30"] = "21:30";
    DeliveryTime["22:00"] = "22:00";
    DeliveryTime["22:30"] = "22:30";
    DeliveryTime["23:00"] = "23:00";
    DeliveryTime["23:30"] = "23:30";
    DeliveryTime["23:59"] = "23:59";
})(DeliveryTime || (exports.DeliveryTime = DeliveryTime = {}));
(0, graphql_1.registerEnumType)(DeliveryTime, {
    name: 'DeliveryTime',
    description: 'The time of the delivery',
});
var PurchaseOrderStatus;
(function (PurchaseOrderStatus) {
    PurchaseOrderStatus["PENDING"] = "PENDING";
    PurchaseOrderStatus["APPROVED"] = "APPROVED";
    PurchaseOrderStatus["REJECTED"] = "REJECTED";
    PurchaseOrderStatus["CLOSED"] = "CLOSED";
    PurchaseOrderStatus["DRAFT"] = "DRAFT";
})(PurchaseOrderStatus || (exports.PurchaseOrderStatus = PurchaseOrderStatus = {}));
(0, graphql_1.registerEnumType)(PurchaseOrderStatus, {
    name: 'PurchaseOrderStatus',
    description: 'The status of the purchase order',
});

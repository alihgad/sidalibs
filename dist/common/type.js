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
exports.TransactionTypes = exports.ProductionStatus = exports.ProductionType = exports.OrderSource = exports.DeliveryStatus = exports.KitchenFlowType = exports.KitchenFlowStatus = exports.ChargeType = exports.InventoryCountStatus = exports.TransferType = exports.TransferStatus = exports.PurchaseType = exports.PurchaseStatus = exports.PurchaseOrderStatus = exports.DeliveryTime = exports.PaymentMethodEnum = exports.SaleStatusEnum = exports.ServingUnit = exports.SaleMethod = exports.PricingMethod = exports.CostCalculationMethod = exports.ReasonType = exports.LogActionType = exports.TagType = exports.PaymentMethodType = exports.TemporaryEventType = exports.DiscountAppliesTo = exports.DiscountType = exports.PromotionType = exports.DaysOfWeek = exports.OrderStatus = exports.OrderType = exports.LicenseType = exports.languages = exports.planPriceMap = exports.devicePriceMap = exports.planIntervalCountMap = exports.planIntervalsMap = exports.PlanDuration = exports.PlanType = exports.DeviceType = exports.ProductsTypeEnum = exports.productsType = exports.licencesEnum = exports.ZatcaOnboardingStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var ZatcaOnboardingStatus;
(function (ZatcaOnboardingStatus) {
    ZatcaOnboardingStatus["PENDING_OTP"] = "PENDING_OTP";
    ZatcaOnboardingStatus["READY_FOR_CSR"] = "READY_FOR_CSR";
    ZatcaOnboardingStatus["COMPLETED"] = "COMPLETED";
})(ZatcaOnboardingStatus || (exports.ZatcaOnboardingStatus = ZatcaOnboardingStatus = {}));
(0, graphql_1.registerEnumType)(ZatcaOnboardingStatus, { name: 'ZatcaOnboardingStatus' });
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
var productsType;
(function (productsType) {
    productsType["cashier device"] = "prod_SIzCGDfhu25vAS";
    productsType["Cash drawer"] = "prod_SIzIlxrgnulDuu";
    productsType["Printer"] = "prod_SIzGdXV3w7eBdi";
    productsType["iPad"] = "prod_SIzFplT3mK3nu9";
    productsType["KDS"] = "prod_SIzEHkZq4Xehzz";
})(productsType || (exports.productsType = productsType = {}));
var ProductsTypeEnum;
(function (ProductsTypeEnum) {
    ProductsTypeEnum["IOS_CASHIER"] = "ios cashier";
    ProductsTypeEnum["ANDROID_CASHIER"] = "android cashier";
    ProductsTypeEnum["LARGE_KITCHEN_SCREEN"] = "large kitchen screen";
    ProductsTypeEnum["TABLET_KITCHEN_SCREEN"] = "tablet kitchen\u00A0screen";
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
    [ProductsTypeEnum.IOS_CASHIER]: 10000,
    [ProductsTypeEnum.ANDROID_CASHIER]: 30000,
    [ProductsTypeEnum.LARGE_KITCHEN_SCREEN]: 7000,
    [ProductsTypeEnum.TABLET_KITCHEN_SCREEN]: 7000
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
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PREPARING"] = "preparing";
    OrderStatus["READY"] = "ready";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["REFUNDED"] = "refunded";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
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
(0, graphql_1.registerEnumType)(OrderStatus, {
    name: 'OrderStatus',
    description: 'The status of order',
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
    DeliveryTime["T_00_00"] = "00:00";
    DeliveryTime["T_00_30"] = "00:30";
    DeliveryTime["T_01_00"] = "01:00";
    DeliveryTime["T_01_30"] = "01:30";
    DeliveryTime["T_02_00"] = "02:00";
    DeliveryTime["T_02_30"] = "02:30";
    DeliveryTime["T_03_00"] = "03:00";
    DeliveryTime["T_03_30"] = "03:30";
    DeliveryTime["T_04_00"] = "04:00";
    DeliveryTime["T_04_30"] = "04:30";
    DeliveryTime["T_05_00"] = "05:00";
    DeliveryTime["T_05_30"] = "05:30";
    DeliveryTime["T_06_00"] = "06:00";
    DeliveryTime["T_06_30"] = "06:30";
    DeliveryTime["T_07_00"] = "07:00";
    DeliveryTime["T_07_30"] = "07:30";
    DeliveryTime["T_08_00"] = "08:00";
    DeliveryTime["T_08_30"] = "08:30";
    DeliveryTime["T_09_00"] = "09:00";
    DeliveryTime["T_09_30"] = "09:30";
    DeliveryTime["T_10_00"] = "10:00";
    DeliveryTime["T_10_30"] = "10:30";
    DeliveryTime["T_11_00"] = "11:00";
    DeliveryTime["T_11_30"] = "11:30";
    DeliveryTime["T_12_00"] = "12:00";
    DeliveryTime["T_12_30"] = "12:30";
    DeliveryTime["T_13_00"] = "13:00";
    DeliveryTime["T_13_30"] = "13:30";
    DeliveryTime["T_14_00"] = "14:00";
    DeliveryTime["T_14_30"] = "14:30";
    DeliveryTime["T_15_00"] = "15:00";
    DeliveryTime["T_15_30"] = "15:30";
    DeliveryTime["T_16_00"] = "16:00";
    DeliveryTime["T_16_30"] = "16:30";
    DeliveryTime["T_17_00"] = "17:00";
    DeliveryTime["T_17_30"] = "17:30";
    DeliveryTime["T_18_00"] = "18:00";
    DeliveryTime["T_18_30"] = "18:30";
    DeliveryTime["T_19_00"] = "19:00";
    DeliveryTime["T_19_30"] = "19:30";
    DeliveryTime["T_20_00"] = "20:00";
    DeliveryTime["T_20_30"] = "20:30";
    DeliveryTime["T_21_00"] = "21:00";
    DeliveryTime["T_21_30"] = "21:30";
    DeliveryTime["T_22_00"] = "22:00";
    DeliveryTime["T_22_30"] = "22:30";
    DeliveryTime["T_23_00"] = "23:00";
    DeliveryTime["T_23_30"] = "23:30";
    DeliveryTime["T_23_59"] = "23:59";
})(DeliveryTime || (exports.DeliveryTime = DeliveryTime = {}));
(0, graphql_1.registerEnumType)(DeliveryTime, {
    name: 'DeliveryTime',
    description: 'The delivery time slots',
});
var PurchaseOrderStatus;
(function (PurchaseOrderStatus) {
    PurchaseOrderStatus["PENDING"] = "pending";
    PurchaseOrderStatus["APPROVED"] = "approved";
    PurchaseOrderStatus["REJECTED"] = "rejected";
    PurchaseOrderStatus["CLOSED"] = "closed";
    PurchaseOrderStatus["DRAFT"] = "draft";
    PurchaseOrderStatus["CANCELLED"] = "cancelled";
})(PurchaseOrderStatus || (exports.PurchaseOrderStatus = PurchaseOrderStatus = {}));
(0, graphql_1.registerEnumType)(PurchaseOrderStatus, {
    name: 'PurchaseOrderStatus',
    description: 'The status of the purchase order',
});
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus["CLOSED"] = "closed";
    PurchaseStatus["DRAFT"] = "draft";
    PurchaseStatus["PENDING"] = "pending";
})(PurchaseStatus || (exports.PurchaseStatus = PurchaseStatus = {}));
(0, graphql_1.registerEnumType)(PurchaseStatus, {
    name: 'PurchaseStatus',
    description: 'The status of the purchase',
});
var PurchaseType;
(function (PurchaseType) {
    PurchaseType["PURCHASE"] = "purchase";
    PurchaseType["RETURN"] = "return";
})(PurchaseType || (exports.PurchaseType = PurchaseType = {}));
(0, graphql_1.registerEnumType)(PurchaseType, {
    name: 'PurchaseType',
    description: 'The type of purchase',
});
var TransferStatus;
(function (TransferStatus) {
    TransferStatus["DRAFT"] = "draft";
    TransferStatus["PENDING"] = "pending";
    TransferStatus["CLOSED"] = "closed";
    TransferStatus["CANCELLED"] = "cancelled";
})(TransferStatus || (exports.TransferStatus = TransferStatus = {}));
(0, graphql_1.registerEnumType)(TransferStatus, {
    name: 'TransferStatus',
    description: 'The status of the transfer',
});
var TransferType;
(function (TransferType) {
    TransferType["TRANSFER_SENDING"] = "transfer_sending";
    TransferType["TRANSFER_RECEIVING"] = "transfer_receiving";
})(TransferType || (exports.TransferType = TransferType = {}));
(0, graphql_1.registerEnumType)(TransferType, {
    name: 'TransferType',
    description: 'The type of transfer',
});
var InventoryCountStatus;
(function (InventoryCountStatus) {
    InventoryCountStatus["DRAFT"] = "draft";
    InventoryCountStatus["PENDING"] = "pending";
    InventoryCountStatus["CLOSED"] = "closed";
    InventoryCountStatus["CANCELLED"] = "cancelled";
})(InventoryCountStatus || (exports.InventoryCountStatus = InventoryCountStatus = {}));
(0, graphql_1.registerEnumType)(InventoryCountStatus, {
    name: 'InventoryCountStatus',
    description: 'The status of the inventory count',
});
var ChargeType;
(function (ChargeType) {
    ChargeType["VALUE"] = "value";
    ChargeType["PERCENTAGE"] = "percentage";
})(ChargeType || (exports.ChargeType = ChargeType = {}));
(0, graphql_1.registerEnumType)(ChargeType, {
    name: 'ChargeType',
    description: 'The type of charge',
});
var KitchenFlowStatus;
(function (KitchenFlowStatus) {
    KitchenFlowStatus["PENDING"] = "PENDING";
    KitchenFlowStatus["IN_PROGRESS"] = "IN_PROGRESS";
    KitchenFlowStatus["COMPLETED"] = "COMPLETED";
    KitchenFlowStatus["CANCELLED"] = "CANCELLED";
})(KitchenFlowStatus || (exports.KitchenFlowStatus = KitchenFlowStatus = {}));
var KitchenFlowType;
(function (KitchenFlowType) {
    KitchenFlowType["ORDER"] = "ORDER";
    KitchenFlowType["PREPARATION"] = "PREPARATION";
    KitchenFlowType["COOKING"] = "COOKING";
    KitchenFlowType["ASSEMBLY"] = "ASSEMBLY";
    KitchenFlowType["PACKAGING"] = "PACKAGING";
})(KitchenFlowType || (exports.KitchenFlowType = KitchenFlowType = {}));
(0, graphql_1.registerEnumType)(KitchenFlowStatus, {
    name: 'KitchenFlowStatus',
    description: 'The status of the kitchen flow',
});
(0, graphql_1.registerEnumType)(KitchenFlowType, {
    name: 'KitchenFlowType',
    description: 'The type of kitchen flow',
});
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus["PENDING"] = "pending";
    DeliveryStatus["PREPARING"] = "preparing";
    DeliveryStatus["READY"] = "ready";
    DeliveryStatus["OUT_FOR_DELIVERY"] = "out_for_delivery";
    DeliveryStatus["DELIVERED"] = "delivered";
    DeliveryStatus["CANCELLED"] = "cancelled";
})(DeliveryStatus || (exports.DeliveryStatus = DeliveryStatus = {}));
(0, graphql_1.registerEnumType)(DeliveryStatus, {
    name: 'DeliveryStatus',
    description: 'The status of order delivery',
});
var OrderSource;
(function (OrderSource) {
    OrderSource["CASHIER"] = "cashier";
    OrderSource["DRIVE_THRU"] = "drive_thru";
})(OrderSource || (exports.OrderSource = OrderSource = {}));
(0, graphql_1.registerEnumType)(OrderSource, {
    name: 'OrderSource',
    description: 'The source of the order',
});
var ProductionType;
(function (ProductionType) {
    ProductionType["PRODUCTION"] = "production";
    ProductionType["CONSUMPTION"] = "consumption";
    ProductionType["WASTE"] = "waste";
})(ProductionType || (exports.ProductionType = ProductionType = {}));
(0, graphql_1.registerEnumType)(ProductionType, {
    name: 'ProductionType',
    description: 'The type of production',
});
var ProductionStatus;
(function (ProductionStatus) {
    ProductionStatus["PENDING"] = "pending";
    ProductionStatus["SENT"] = "sent";
    ProductionStatus["CLOSED"] = "closed";
    ProductionStatus["CANCELLED"] = "cancelled";
})(ProductionStatus || (exports.ProductionStatus = ProductionStatus = {}));
(0, graphql_1.registerEnumType)(ProductionStatus, {
    name: 'ProductionStatus',
    description: 'The status of the production',
});
var TransactionTypes;
(function (TransactionTypes) {
    TransactionTypes["production"] = "production";
    TransactionTypes["purchase"] = "purchase";
    TransactionTypes["sales"] = "sales";
    TransactionTypes["transfer"] = "transfer";
})(TransactionTypes || (exports.TransactionTypes = TransactionTypes = {}));
(0, graphql_1.registerEnumType)(TransactionTypes, {
    name: 'TransationTypes',
    description: 'The type of transaction',
});

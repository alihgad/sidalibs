"use strict";
// export let notifications = [
//     {
//         key: "cost_adjustment_transaction_closed",
//         label: "قيام مستخدم بإكمال تنفيذ عملية تعديل تكلفة"
//     },
//     {
//         key: "count_transaction_closed",
//         label: "قيام مستخدم بإكمال تنفيذ عملية جرد المخزون"
//     },
//     {
//         key: "purchasing_transaction_closed",
//         label: "قيام مستخدم بإكمال تنفيذ عملية شراء"
//     },
//     {
//         key: "quantity_adjustment_transaction_closed",
//         label: "قيام مستخدم بإكمال تنفيذ عملية تعديل كمية"
//     },
//     {
//         key: "return_to_supplier_transaction_closed",
//         label: "قيام مستخدم بإرجاع وحدات مخزون إلى مورد"
//     },
//     {
//         key: "transfer_receiving_transaction_closed",
//         label: "قيام مستخدم بإستقبال وحدات مخزون من عملية تحويل"
//     },
//     {
//         key: "production_transaction_closed",
//         label: "قيام مستخدم بإكمال تنفيذ عملية إنتاج"
//     },
//     {
//         key: "transfer_sending_transaction_closed",
//         label: "قيام مستخدم بإرسال وحدات مخزون في عملية تحويل"
//     }
// ];
// //   const notificationsKyes = Object.fromEntries(
// //     notifications.map(p => [p.key, p.key])
// //   );
// // console.log(notifications);
// export const notificationsKeys = [
//     [
//         {
//             "cost_adjustment_transaction_closed": "cost_adjustment_transaction_closed",
//         },
//         {
//             "count_transaction_closed": "count_transaction_closed",
//         },
//         {
//             "purchasing_transaction_closed": "purchasing_transaction_closed",
//         },
//         {
//             "quantity_adjustment_transaction_closed": "quantity_adjustment_transaction_closed",
//         },
//         {
//             "return_to_supplier_transaction_closed": "return_to_supplier_transaction_closed",
//         },
//         {
//             "transfer_receiving_transaction_closed": "transfer_receiving_transaction_closed",
//         },
//         {
//             "production_transaction_closed": "production_transaction_closed",
//         },
//         {
//             "transfer_sending_transaction_closed": "transfer_sending_transaction_closed",
//         }
//     ]
// ]
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsKyes = exports.notifications = void 0;
exports.notifications = [
    {
        key: "inventory_business_date_ends",
        label: "انتهاء تاريخ العمل للمخزون"
    },
    {
        key: "user_submits_a_purchase_order_for_review_and_needs_approval",
        label: "إرسال طلب شراء للمراجعة والموافقة"
    },
    {
        key: "user_submits_a_cost_adjustment_transaction",
        label: "إرسال معاملة تعديل تكلفة"
    },
    {
        key: "user_submits_a_purchasing_transaction",
        label: "إرسال معاملة شراء"
    },
    {
        key: "user_submits_an_inventory_count_transaction",
        label: "إرسال معاملة جرد المخزون"
    },
    {
        key: "user_submits_a_transfer_order_for_review",
        label: "إرسال طلب تحويل للمراجعة"
    },
    {
        key: "user_submits_a_production_transaction",
        label: "إرسال معاملة إنتاج"
    },
    {
        key: "user_submits_a_quantity_adjustment_transaction",
        label: "إرسال معاملة تعديل كميات"
    },
    {
        key: "user_returns_items_to_a_supplier",
        label: "إرجاع عناصر للمورّد"
    },
    {
        key: "user_sends_inventory_items_from_a_warehouse_or_branch",
        label: "إرسال عناصر مخزون من مستودع أو فرع"
    },
    {
        key: "there_is_a_transfer_transaction_waiting_to_be_received",
        label: "وجود معاملة تحويل بانتظار الاستلام"
    },
    {
        key: "user_receives_inventory_items_from_a_transfer_transaction",
        label: "استلام عناصر المخزون من معاملة تحويل"
    },
    {
        key: "inventory_item_reaches_its_maximum_quantity_level",
        label: "وصول عنصر المخزون إلى الحد الأقصى للكمية"
    },
    {
        key: "inventory_item_reaches_its_minimum_quantity_level",
        label: "وصول عنصر المخزون إلى الحد الأدنى للكمية"
    },
    {
        key: " inventory_item_is_not_available_anymore",
        label: "عدم توفر عنصر المخزون بعد الآن"
    },
    {
        key: "user_rejects_a_transfer",
        label: "رفض مستخدم لعملية تحويل"
    },
    {
        key: "user_receives_a_transfer_with_a_quantity_variance",
        label: "استلام عملية تحويل مع اختلاف في الكمية"
    }
];
exports.notificationsKyes = {
    inventory_business_date_ends: 'inventory_business_date_ends',
    user_submits_a_purchase_order_for_review_and_needs_approval: 'user_submits_a_purchase_order_for_review_and_needs_approval',
    user_submits_a_cost_adjustment_transaction: 'user_submits_a_cost_adjustment_transaction',
    user_submits_a_purchasing_transaction: 'user_submits_a_purchasing_transaction',
    user_submits_an_inventory_count_transaction: 'user_submits_an_inventory_count_transaction',
    user_submits_a_transfer_order_for_review: 'user_submits_a_transfer_order_for_review',
    user_submits_a_production_transaction: 'user_submits_a_production_transaction',
    user_submits_a_quantity_adjustment_transaction: 'user_submits_a_quantity_adjustment_transaction',
    user_returns_items_to_a_supplier: 'user_returns_items_to_a_supplier',
    user_sends_inventory_items_from_a_warehouse_or_branch: 'user_sends_inventory_items_from_a_warehouse_or_branch',
    there_is_a_transfer_transaction_waiting_to_be_received: 'there_is_a_transfer_transaction_waiting_to_be_received',
    user_receives_inventory_items_from_a_transfer_transaction: 'user_receives_inventory_items_from_a_transfer_transaction',
    inventory_item_reaches_its_maximum_quantity_level: 'inventory_item_reaches_its_maximum_quantity_level',
    inventory_item_reaches_its_minimum_quantity_level: 'inventory_item_reaches_its_minimum_quantity_level',
    inventory_item_is_not_available_anymore: 'inventory_item_is_not_available_anymore',
    user_rejects_a_transfer: 'user_rejects_a_transfer',
    user_receives_a_transfer_with_a_quantity_variance: 'user_receives_a_transfer_with_a_quantity_variance'
};

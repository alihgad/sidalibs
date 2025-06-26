export let notifications = [
    {
        key: "cost_adjustment_transaction_closed",
        label: "قيام مستخدم بإكمال تنفيذ عملية تعديل تكلفة"
    },
    {
        key: "count_transaction_closed",
        label: "قيام مستخدم بإكمال تنفيذ عملية جرد المخزون"
    },
    {
        key: "purchasing_transaction_closed",
        label: "قيام مستخدم بإكمال تنفيذ عملية شراء"
    },
    {
        key: "quantity_adjustment_transaction_closed",
        label: "قيام مستخدم بإكمال تنفيذ عملية تعديل كمية"
    },
    {
        key: "return_to_supplier_transaction_closed",
        label: "قيام مستخدم بإرجاع وحدات مخزون إلى مورد"
    },
    {
        key: "transfer_receiving_transaction_closed",
        label: "قيام مستخدم بإستقبال وحدات مخزون من عملية تحويل"
    },
    {
        key: "production_transaction_closed",
        label: "قيام مستخدم بإكمال تنفيذ عملية إنتاج"
    },
    {
        key: "transfer_sending_transaction_closed",
        label: "قيام مستخدم بإرسال وحدات مخزون في عملية تحويل"
    }
];
//   const notificationsKyes = Object.fromEntries(
//     notifications.map(p => [p.key, p.key])
//   );
// console.log(notifications);
export const notificationsKeys = [
    [
        {
            "cost_adjustment_transaction_closed": "cost_adjustment_transaction_closed",
        },
        {
            "count_transaction_closed": "count_transaction_closed",
        },
        {
            "purchasing_transaction_closed": "purchasing_transaction_closed",
        },
        {
            "quantity_adjustment_transaction_closed": "quantity_adjustment_transaction_closed",
        },
        {
            "return_to_supplier_transaction_closed": "return_to_supplier_transaction_closed",
        },
        {
            "transfer_receiving_transaction_closed": "transfer_receiving_transaction_closed",
        },
        {
            "production_transaction_closed": "production_transaction_closed",
        },
        {
            "transfer_sending_transaction_closed": "transfer_sending_transaction_closed",
        }
    ]
]
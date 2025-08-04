"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionKeys = exports.permissions = void 0;
const permissionsCategorys_1 = require("./permissionsCategorys");
exports.permissions = [
    // Role Permissions
    {
        name: 'إدارة الأدوار',
        description: 'السماح للمستخدم بإدارة وتعديل وحذف الأدوار في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.role_permissions,
        key: 'manage_roles'
    },
    {
        name: 'قراءة الأدوار',
        description: 'السماح للمستخدم بعرض الأدوار في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.role_permissions,
        key: 'read_roles'
    },
    // Order Permissions
    {
        name: 'قراءة الطلبات',
        description: 'السماح للمستخدم بعرض الطلبات في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.order_permissions,
        key: 'read_orders'
    },
    {
        name: 'إدارة الطلبات',
        description: 'السماح للمستخدم بقبول، رفض، إلغاء و دفع الطلبات في لوحة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.order_permissions,
        key: 'manage_orders'
    },
    {
        name: 'إدارة وسوم الطلبات',
        description: 'السماح للمستخدم بتعديل وسوم الطلب للطلبات في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.order_permissions,
        key: 'manage_order_tags'
    },
    // Customer Permissions
    {
        name: 'قراءة العملاء',
        description: 'السماح للمستخدم بعرض بيانات العملاء في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.customer_permissions,
        key: 'read_customers'
    },
    {
        name: 'قراءة تقرير تحليلات العملاء',
        description: 'السماح للمستخدم بعرض ولاء العملاء، الحساب الآجل، ... إلخ',
        category: permissionsCategorys_1.permissionsCategorys.customer_permissions,
        key: 'read_customer_analytics'
    },
    {
        name: 'إدارة العملاء',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف العملاء',
        category: permissionsCategorys_1.permissionsCategorys.customer_permissions,
        key: 'manage_customers'
    },
    {
        name: 'إدارة الحساب الآجل للعملاء',
        description: 'السماح للمستخدم بتفعيل / إلغاء تفعيل الحساب الآجل وإضافة دفعات',
        category: permissionsCategorys_1.permissionsCategorys.customer_permissions,
        key: 'manage_customer_credit'
    },
    {
        name: 'إدارة برنامج ولاء العملاء',
        description: 'يسمح للمستخدم بتفعيل / إلغاء تفعيل الولاء للعملاء',
        category: permissionsCategorys_1.permissionsCategorys.customer_permissions,
        key: 'manage_customer_loyalty'
    },
    // Inventory Permissions
    {
        name: 'قراءة مواد المخزون',
        description: 'السماح للمستخدم بعرض وحدات المخزون',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'read_inventory_items'
    },
    {
        name: 'إدارة مواد المخزون',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف وحدات المخزون',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'manage_inventory_items'
    },
    {
        name: 'قراءة الموردين',
        description: 'السماح للمستخدم بعرض بيانات الموردين',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'read_suppliers'
    },
    {
        name: 'إدارة الموردين',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف الموردين',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'manage_suppliers'
    },
    {
        name: 'إنشاء طلبات الشراء',
        description: 'السماح للمستخدم بإنشاء طلب شراء وحفظه كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_purchase_orders'
    },
    {
        name: 'إرسال طلبات الشراء',
        description: 'السماح للمستخدم بإرسال مسودات طلبات الشراء للموافقة عليها',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_purchase_orders'
    },
    {
        name: 'تأكيد طلبات الشراء',
        description: 'السماح للمستخدم بالموافقة على طلبات الشراء المرسلة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'approve_purchase_orders'
    },
    {
        name: 'استقبال طلبات الشراء المؤكدة',
        description: 'Allows the user to view approved POs.',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'receive_approved_purchase_orders'
    },
    {
        name: 'إنشاء طلبات التحويل',
        description: 'السماح للمستخدم بطلب الوحدات من المستودع وحفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_transfer_requests'
    },
    {
        name: 'إرسال طلبات التحويل',
        description: 'السماح للمستخدم بإرسال مسودات طلبات التحويل المطلوبة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_transfer_requests'
    },
    {
        name: 'إنشاء عمليات التحويل',
        description: 'السماح للمستخدم بإنشاء تحويل من فرع / مستودع إلى مواقع أخرى وحفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_transfers'
    },
    {
        name: 'إرسال عمليات التحويل',
        description: 'السماح للمستخدم بإرسال مسودات عمليات التحويل',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_transfers'
    },
    {
        name: 'قراءة عمليات الشراء',
        description: 'السماح للمستخدم بعرض عمليات الشراء',
        category: permissionsCategorys_1.permissionsCategorys.purchase_permissions,
        key: 'read_purchases'
    },
    {
        name: 'إنشاء عمليات الشراء',
        description: 'السماح للمستخدم بإنشاء عملية شراء وحفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_purchases'
    },
    {
        name: 'إرسال عمليات الشراء',
        description: 'السماح للمستخدم بإرسال مسودات عمليات الشراء',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_purchases'
    },
    {
        name: 'انشاء عمليات الشراء من طلبات الشراء',
        description: 'السماح للمستخدم بانشاء عملية شراء من طلب شراء فقط و حفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_purchases_from_purchase_orders'
    },
    {
        name: 'انشاء عملية شراء مباشرة',
        description: 'السماح للمستخدم بانشاء عمليات شراء مباشرة و حفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_direct_purchases'
    },
    {
        name: 'إنشاء عمليات الإنتاج',
        description: 'السماح للمستخدم بإنشاء عمليات الإنتاج وحفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_production_operations'
    },
    {
        name: 'إرسال عمليات الإنتاج',
        description: 'السماح للمستخدم بإرسال مسودات عمليات الإنتاج',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_production_operations'
    },
    {
        name: 'إنشاء عمليات تعديل الكمية',
        description: 'السماح للمستخدم بإنشاء عمليات تعديل الكمية وحفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_quantity_adjustments'
    },
    {
        name: 'إرسال عمليات تعديل الكمية',
        description: 'السماح للمستخدم بإرسال مسودات عمليات تعديل الكمية',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_quantity_adjustments'
    },
    {
        name: 'إنشاء عمليات تعديل التكلفة',
        description: 'السماح للمستخدم بإنشاء عمليات تعديل التكلفة وحفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_cost_adjustments'
    },
    {
        name: 'إرسال عمليات تعديل التكلفة',
        description: 'السماح للمستخدم بإرسال مسودات عمليات تعديل التكلفة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_cost_adjustments'
    },
    {
        name: 'إنشاء عمليات الجرد',
        description: 'السماح للمستخدم بإنشاء عمليات الجرد وحفظها كمسودة',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_inventory_counts'
    },
    {
        name: 'إرسال عمليات الجرد',
        description: 'السماح للمستخدم بإرسال مسودات عمليات الجرد',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_inventory_counts'
    },
    {
        name: 'قراءة عمليات الطلب',
        description: 'السماح للمستخدم بعرض عمليات المخزون التي تم إجراؤها من الطلبات',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'read_order_operations'
    },
    {
        name: 'إنشاء عمليات فحص المخزون الفوري',
        description: 'يسمح للمستخدم بإنشاء حركة فحص فورية للمخزون',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_instant_inventory_checks'
    },
    {
        name: 'إرسال عمليات فحص المخزون الفوري',
        description: 'يسمح للمستخدم بإرسال وعرض حركة فحص المخزون الفوري',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'send_instant_inventory_checks'
    },
    {
        name: 'إنشاء نموذج جرد المخزون',
        description: 'السماح للمستخدم بإنشاء نموذج لجرد المخزون',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'create_inventory_count_template'
    },
    {
        name: 'قراءة الأصناف',
        description: 'السماح للمستخدم بعرض الأصناف في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'read_categories'
    },
    {
        name: 'إدارة الأصناف',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف الأصناف في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.inventory_permissions,
        key: 'manage_categories'
    },
    // Menu Permissions
    {
        name: 'قراءة قائمة المنتجات',
        description: 'السماح للمستخدم بعرض عناصر القائمة في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.menu_permissions,
        key: 'read_menu_items'
    },
    {
        name: 'إدارة قائمة المنتجات',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف عناصر القائمة في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.menu_permissions,
        key: 'manage_menu_items'
    },
    // Other Permissions
    {
        name: 'إدارة المكونات',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف المكونات',
        category: permissionsCategorys_1.permissionsCategorys.other_permissions,
        key: 'manage_ingredients'
    },
    {
        name: 'إدارة التكاليف',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف التكلفة',
        category: permissionsCategorys_1.permissionsCategorys.other_permissions,
        key: 'manage_costs'
    },
    // Administrative Permissions
    {
        name: 'إدارة الفروع',
        description: 'السماح للمستخدم بإدارة وتعديل بيانات الفروع وإعداداتها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_branches'
    },
    {
        name: 'إدارة الكوبونات',
        description: 'السماح للمستخدم بإنشاء وتعديل وحذف الكوبونات في وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_coupons'
    },
    {
        name: 'إدارة الأجهزة',
        description: 'السماح للمستخدم بإدارة وتعديل بيانات الرخص وإعداداتها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_devices'
    },
    {
        name: 'إدارة الخصومات',
        description: 'السماح للمستخدم بإنشاء الخصومات وتعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_discounts'
    },
    {
        name: 'إدارة بطاقات الهدايا',
        description: 'السماح للمستخدم بإنشاء بطاقات الهدايا وتعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_gift_cards'
    },
    {
        name: 'إدارة العروض الترويجية',
        description: 'السماح للمستخدم بإنشاء العروض الترويجية وتعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_promotions'
    },
    {
        name: 'إدارة الإعدادات',
        description: 'السماح للمستخدم بإدارة إعدادات الحساب بما في ذلك الولاء وإعدادات الكاشير ... إلخ',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_settings'
    },
    {
        name: 'إدارة مناطق التوصيل',
        description: 'السماح للمستخدم بإنشاء و تعديل مناطق التوصيل',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_delivery_zones'
    },
    {
        name: 'إدارة الفعاليات المؤقتة',
        description: 'السماح للمستخدم بإنشاء الفعاليات المؤقتة وتعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_temporary_events'
    },
    {
        name: 'إدارة المستخدمين',
        description: 'السماح للمستخدم بإنشاء وتعديل وحذف المستخدمين وتعيين الأدوار لهم',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_users'
    },
    {
        name: 'إدارة التطبيقات',
        description: 'السماح للمستخدم بإدارة وتعديل إعدادات التطبيقات',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_applications'
    },
    {
        name: 'إدارة الضرائب و المجموعات الضريبية',
        description: 'السماح للمستخدم بإنشاء و تعديل الضرائب و المجموعات الضريبية',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_taxes'
    },
    {
        name: 'إدارة طرق الدفع',
        description: 'السماح للمستخدم بإنشاء و تعديل طرق الدفع',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_payment_methods'
    },
    {
        name: 'إدارة الرسوم',
        description: 'السماح للمستخدم بإنشاء الرسوم و تعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_fees'
    },
    {
        name: 'إدارة الوسوم',
        description: 'السماح للمستخدم بإنشاء الوسوم و تعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_tags'
    },
    {
        name: 'إدارة الأسباب',
        description: 'السماح للمستخدم بإنشاء و تعديل الأسباب',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_reasons'
    },
    {
        name: 'إدارة مسارات التحضير',
        description: 'السماح للمستخدم بإنشاء مسارات التحضير و تعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_preparation_routes'
    },
    {
        name: 'إدارة الطلب عبر الإنترنت',
        description: 'السماح للمستخدم بإدارة الطلب عبر الإنترنت',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_online_orders'
    },
    {
        name: 'إدارة الإشعارات',
        description: 'السماح للمستخدم بإنشاء الإشعارات و تعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_notifications'
    },
    {
        name: 'إدارة برنامج الولاء',
        description: 'السماح للمستخدم بالتحكم ببرنامج الولاء',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_loyalty_program'
    },
    {
        name: 'إدارة الرخص والفواتير',
        description: 'السماح للمستخدم بعرض وإدارة وحدة التراخيص والفواتير على وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_licenses_invoices'
    },
    {
        name: 'إدارة مسببات الحساسية',
        description: 'السماح للمستخدم بالتحكم بقائمة مسببات الحساسية',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_allergens'
    },
    {
        name: 'إدارة وسوم السعر',
        description: 'السماح للمستخدم بإنشاء وسوم السعر و تعديلها',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_price_tags'
    },
    {
        name: 'إدارة الحجوزات',
        description: 'السماح للمستخدم بإدارة الحجوزات',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_reservations'
    },
    {
        name: 'إدارة السائقين',
        description: 'السماح للمستخدم بعرض وإدارة وحدة السائقين على وحدة التحكم',
        category: permissionsCategorys_1.permissionsCategorys.administrative_permissions,
        key: 'manage_drivers'
    },
    // Report Permissions
    {
        name: 'عرض تقرير تحليل تكلفة المخزون',
        description: 'السماح للمستخدم بعرض وتصدير هذا التقرير',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_inventory_cost_analysis'
    },
    {
        name: 'عرض تقرير حركة المخزون',
        description: 'السماح للمستخدم بعرض وتصدير هذا التقرير',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_inventory_movement'
    },
    {
        name: 'عرض تقرير مستويات المخزون',
        description: 'السماح للمستخدم بعرض وتصدير هذا التقرير',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_inventory_levels'
    },
    {
        name: 'عرض تقارير عمليات المخزون',
        description: 'السماح للمستخدم بعرض وتصدير هذا التقرير',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_inventory_operations'
    },
    {
        name: 'عرض تقارير أخرى',
        description: 'السماح للمستخدم بعرض وتصدير التقارير مثل الضرائب وعمليات الصندوق الإلغاءات و المرتجعات ... إلخ',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_other_reports'
    },
    {
        name: 'عرض تقارير المبيعات',
        description: 'السماح للمستخدم بعرض جميع تقارير المبيعات والمدفوعات وتصديرها',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_sales_reports'
    },
    {
        name: 'عرض تقارير تاريخ تعديل التكلفة',
        description: 'السماح للمستخدم بعرض وتصدير هذا التقرير',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_cost_adjustment_history'
    },
    {
        name: 'عرض تقارير فودكس Pay',
        description: 'السماح للمستخدم بعرض تقارير متعلقة ب فودكس Pay',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_foodics_pay_reports'
    },
    {
        name: 'عرض تقارير تكلفة القائمة',
        description: 'السماح للمستخدم بعرض وتصدير تقارير تكلفة القائمة',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_menu_cost_reports'
    },
    {
        name: 'عرض تقرير تكلفة مواد المخزون',
        description: 'السماح للمستخدم بعرض وتصدير تقارير تكلفة مواد المخزون',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_inventory_item_cost'
    },
    {
        name: 'عرض سجل حركات المستخدم',
        description: 'السماح للمستخدم بعرض سجل حركات المستخدم',
        category: permissionsCategorys_1.permissionsCategorys.report_permissions,
        key: 'view_user_activity_log'
    },
    // Summary Permissions
    {
        name: 'الملخص العام',
        description: 'السماح للمستخدم بعرض صفحة الملخص العام والرسوم البيانية',
        category: permissionsCategorys_1.permissionsCategorys.summary_permissions,
        key: 'view_general_summary'
    },
    {
        name: 'ملخص الفروع',
        description: 'السماح للمستخدم بعرض صفحة ملخص الفروع',
        category: permissionsCategorys_1.permissionsCategorys.summary_permissions,
        key: 'view_branch_summary'
    },
    {
        name: 'ملخص المخزون',
        description: 'السماح للمستخدم بعرض صفحة ملخص المخزون',
        category: permissionsCategorys_1.permissionsCategorys.summary_permissions,
        key: 'view_inventory_summary'
    },
    {
        name: 'ملخص مركز الإتصال',
        description: 'السماح للمستخدم بعرض صفحة ملخص مركز الاتصال',
        category: permissionsCategorys_1.permissionsCategorys.summary_permissions,
        key: 'view_call_center_summary'
    },
    {
        name: 'الوصول إلى ملخص المطبخ',
        description: 'السماح للمستخدم بعرض ملخص المطبخ',
        category: permissionsCategorys_1.permissionsCategorys.summary_permissions,
        key: 'view_kitchen_summary'
    },
    // Cashier Waiter Permissions
    {
        name: 'الدخول إلى الصفحة الرئيسية',
        description: 'السماح للمستخدم بالدخول للمحاسبة وفتح العهدة في الكاشير',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'access_main_page'
    },
    {
        name: 'الدخول لإدارة الأجهزة',
        description: 'السماح للمستخدم بإضافة وتعديل وحذف الأجهزة في الكاشير',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'access_device_management'
    },
    {
        name: 'عرض التقارير',
        description: 'السماح للمستخدم بعرض وطباعة التقارير في الكاشير',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'view_reports'
    },
    {
        name: 'تعيين كنادل',
        description: 'السماح للمستخدم بالقيام بدور النادل',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'assign_as_waiter'
    },
    {
        name: 'إضافة رسوم ذات قيمة مفتوحة',
        description: 'السماح للمستخدم بإضافة رسوم مفتوحة للطلب',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'add_open_fees'
    },
    {
        name: 'إضافة منتجات ذات قيمة مفتوحة',
        description: 'السماح للمستخدم بإضافة منتجات ذات سعر مفتوح',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'add_open_price_products'
    },
    {
        name: 'تطبيق خصومات معرفة مسبقاً',
        description: 'السماح للمستخدم بتطبيق خصم معرف على وحدة التحكم على الطلبات أو المنتجات',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'apply_predefined_discounts'
    },
    {
        name: 'تطبيق خصومات مفتوحة',
        description: 'السماح للمستخدم بتطبيق خصومات مفتوحة على الطلبات أو المنتجات',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'apply_open_discounts'
    },
    {
        name: 'تعديل المنتجات المرسلة إلى المطبخ',
        description: 'السماح للمستخدم بتعديل منتج بعد إرساله إلى المطبخ',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'edit_kitchen_sent_products'
    },
    {
        name: 'تجميع الطلبات',
        description: 'السماح للمستخدم بدمج الطلبات المحلية',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'merge_orders'
    },
    {
        name: 'فتح درج النقود',
        description: 'السماح للمستخدم بفتح درج النقود لسبب غير عمليات البيع',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'open_cash_drawer'
    },
    {
        name: 'إنهاء اليوم',
        description: 'السماح للمستخدم بإنهاء اليوم',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'end_day'
    },
    {
        name: 'طباعة الشيك',
        description: 'السماح للمستخدم بطباعة فاتورة الشيك قبل إغلاق الطلب',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'print_check'
    },
    {
        name: 'طباعة الفاتورة',
        description: 'السماح للمستخدم بإعادة طباعة فاتورة طلب مغلق',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'print_invoice'
    },
    {
        name: 'إرجاع الطلب',
        description: 'السماح للمستخدم بإرجاع طلب مغلق وإرجاع نقود العميل',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'return_order'
    },
    {
        name: 'تقسيم الطلب',
        description: 'السماح للمستخدم بتقسيم الطلب إلى طلبات متعددة',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'split_order'
    },
    {
        name: 'عرض الطلبات المغلقة',
        description: 'السماح للمستخدم بعرض تاريخ الطلبات المغلقة',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'view_closed_orders'
    },
    {
        name: 'إلغاء الطلبات والمنتجات',
        description: 'السماح للمستخدم بإلغاء الطلبات والمنتجات لسبب ما',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'cancel_orders_products'
    },
    {
        name: 'إضافة دفعات للطلب',
        description: 'السماح للمستخدم بإضافة دفعات إلى الطلبات',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'add_order_payments'
    },
    {
        name: 'تعديل طلبات مفتوحة لمستخدم اخر',
        description: 'السماح للمستخدم بتعديل طلبات تم فتحها بواسطة مستخدم آخر',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'edit_other_user_open_orders'
    },
    {
        name: 'تغيير مالك الطاولة',
        description: 'السماح للمستخدم بتغيير مالك الطاولة',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'change_table_owner'
    },
    {
        name: 'تسجيل بصمة للمستخدمين',
        description: 'السماح للمستخدم بتسجيل بصمة لبقية المستخدمين',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'register_user_fingerprints'
    },
    {
        name: 'إرسال للمطبخ قبل الدفع',
        description: 'السماح بإرسال الطلب للمطبخ قبل دفع قيمة الطلب',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'send_to_kitchen_before_payment'
    },
    {
        name: 'إعادة الطباعة في المطبخ',
        description: 'السماح بإعادة طباعة الطلب في المطبخ',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'reprint_in_kitchen'
    },
    {
        name: 'تعديل ترتيب الطاولات',
        description: 'السماح للمستخدم بتعديل ترتيب الطاولات في الكاشير',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'edit_table_layout'
    },
    {
        name: 'إغلاق الورديات/العهدات عند وجود طلبات نشطة',
        description: 'السماح للمستخدم بإغلاق الورديات/العهدات عند وجود طلبات نشطة',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'close_shifts_with_active_orders'
    },
    {
        name: 'دفع الطلبات بدون اغلاقها',
        description: 'تمكن المستخدم من دفع الطلب كاملا بدون اغلاقه',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'pay_orders_without_closing'
    },
    {
        name: 'ادارة توفر المنتج',
        description: 'يسمح للمستخدم بإدارة توفر المنتج (متوفر ، غير متوفر ، أو تحديد الكمية المتوفرة) في الكاشير',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'manage_product_availability'
    },
    {
        name: 'تنشيط الطلبات الآجلة',
        description: 'السماح للمستخدم بتعيين تواريخ مستقبلية للطلبات',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'activate_future_orders'
    },
    {
        name: 'تعيين كسائق',
        description: 'السماح بتعيين المستخدم كسائق لطلبات التوصيل',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'assign_as_driver'
    },
    {
        name: 'تنفيذ فحص النقود',
        description: 'تمكن المستخدم من تنفيذ فحص النقود اثناء يوم العمل دون اغلاق العهدة و طباعة المبيعات الحالية',
        category: permissionsCategorys_1.permissionsCategorys.cashier_waiter_permissions,
        key: 'perform_cash_check'
    },
    // Inventory Spot Permissions
    {
        name: 'إدارة عمليات المخزون',
        description: 'السماح للمستخدم بإدارة عمليات المخزون',
        category: permissionsCategorys_1.permissionsCategorys.inventory_spot_permissions,
        key: 'manage_inventory_spot'
    },
    {
        name: 'عرض عمليات المخزون',
        description: 'السماح للمستخدم بعرض عمليات المخزون',
        category: permissionsCategorys_1.permissionsCategorys.inventory_spot_permissions,
        key: 'read_inventory_spot'
    },
    // Count Sheet Permissions
    {
        name: 'إدارة عمليات الجرد',
        description: 'السماح للمستخدم بإدارة عمليات الجرد',
        category: permissionsCategorys_1.permissionsCategorys.count_sheet_permissions,
        key: 'manage_count_sheet'
    },
    {
        name: 'عرض عمليات الجرد',
        description: 'السماح للمستخدم بعرض عمليات الجرد',
        category: permissionsCategorys_1.permissionsCategorys.count_sheet_permissions,
        key: 'read_count_sheet'
    },
    // Transfer Permissions
    {
        name: 'إدارة عمليات النقل',
        description: 'السماح للمستخدم بإدارة عمليات النقل',
        category: permissionsCategorys_1.permissionsCategorys.transfer_permissions,
        key: 'manage_transfer'
    },
    {
        name: 'عرض عمليات النقل',
        description: 'السماح للمستخدم بعرض عمليات النقل',
        category: permissionsCategorys_1.permissionsCategorys.transfer_permissions,
        key: 'read_transfer'
    },
    // Transfer Order Permissions
    {
        name: 'إدارة عمليات النقل',
        description: 'السماح للمستخدم بإدارة عمليات النقل',
        category: permissionsCategorys_1.permissionsCategorys.transfer_order_permissions,
        key: 'manage_transfer_order'
    },
    {
        name: 'عرض عمليات النقل',
        description: 'السماح للمستخدم بعرض عمليات النقل',
        category: permissionsCategorys_1.permissionsCategorys.transfer_order_permissions,
        key: 'read_transfer_order'
    },
    // Charges Permissions
    {
        name: 'إدارة الرسوم',
        description: 'السماح للمستخدم بإدارة الرسوم',
        category: permissionsCategorys_1.permissionsCategorys.charges_permissions,
        key: 'manage_charges'
    },
    {
        name: 'عرض الرسوم',
        description: 'السماح للمستخدم بعرض الرسوم',
        category: permissionsCategorys_1.permissionsCategorys.charges_permissions,
        key: 'read_charges'
    },
    {
        name: 'إدارة المسارات الطبخية',
        description: 'السماح للمستخدم بإدارة المسارات الطبخية',
        category: permissionsCategorys_1.permissionsCategorys.kitchen_flow_permissions,
        key: 'manage_kitchen_flow'
    },
    {
        name: 'عرض المسارات الطبخية',
        description: 'السماح للمستخدم بعرض المسارات الطبخية',
        category: permissionsCategorys_1.permissionsCategorys.kitchen_flow_permissions,
        key: 'read_kitchen_flow'
    },
    // Receipt Permissions
    {
        name: 'إدارة الفواتير',
        description: 'السماح للمستخدم بإدارة الفواتير',
        category: permissionsCategorys_1.permissionsCategorys.receipt_permissions,
        key: 'manage_receipts'
    },
    {
        name: 'عرض الفواتير',
        description: 'السماح للمستخدم بعرض الفواتير',
        category: permissionsCategorys_1.permissionsCategorys.receipt_permissions,
        key: 'read_receipts'
    },
    // Call Center Permissions
    {
        name: 'إدارة عمليات خدمة العملاء',
        description: 'السماح للمستخدم بإدارة عمليات خدمة العملاء',
        category: permissionsCategorys_1.permissionsCategorys.call_center_permissions,
        key: 'manage_call_center'
    },
    {
        name: 'إدارة عمليات خدمة العملاء',
        description: 'السماح للمستخدم بإدارة عمليات خدمة العملاء',
        category: permissionsCategorys_1.permissionsCategorys.call_center_permissions,
        key: 'manage_call_center'
    }
];
//  ده بدل ما تعمل الاوبجكت الى تحت يدوي شغل دي وهيطلعلك الاوبجكت فى كونسول لوج
// const permissionKeys = Object.fromEntries(
//     permissions.map(p => [p.key, p.key])
//   );
// console.log(permissionKeys);
exports.permissionKeys = {
    "read_orders": "read_orders",
    "manage_orders": "manage_orders",
    "manage_order_tags": "manage_order_tags",
    "read_customers": "read_customers",
    "read_customer_analytics": "read_customer_analytics",
    "manage_customers": "manage_customers",
    "manage_customer_credit": "manage_customer_credit",
    "manage_customer_loyalty": "manage_customer_loyalty",
    "read_inventory_items": "read_inventory_items",
    "manage_inventory_items": "manage_inventory_items",
    "read_suppliers": "read_suppliers",
    "manage_suppliers": "manage_suppliers",
    "create_purchase_orders": "create_purchase_orders",
    "send_purchase_orders": "send_purchase_orders",
    "approve_purchase_orders": "approve_purchase_orders",
    "receive_approved_purchase_orders": "receive_approved_purchase_orders",
    "create_transfer_requests": "create_transfer_requests",
    "send_transfer_requests": "send_transfer_requests",
    "create_transfers": "create_transfers",
    "send_transfers": "send_transfers",
    "read_purchases": "read_purchases",
    "create_purchases": "create_purchases",
    "send_purchases": "send_purchases",
    "create_purchases_from_purchase_orders": "create_purchases_from_purchase_orders",
    "create_direct_purchases": "create_direct_purchases",
    "create_production_operations": "create_production_operations",
    "send_production_operations": "send_production_operations",
    "create_quantity_adjustments": "create_quantity_adjustments",
    "send_quantity_adjustments": "send_quantity_adjustments",
    "create_cost_adjustments": "create_cost_adjustments",
    "send_cost_adjustments": "send_cost_adjustments",
    "create_inventory_counts": "create_inventory_counts",
    "send_inventory_counts": "send_inventory_counts",
    "read_order_operations": "read_order_operations",
    "create_instant_inventory_checks": "create_instant_inventory_checks",
    "send_instant_inventory_checks": "send_instant_inventory_checks",
    "create_inventory_count_template": "create_inventory_count_template",
    "read_categories": "read_categories",
    "manage_categories": "manage_categories",
    "read_menu_items": "read_menu_items",
    "manage_menu_items": "manage_menu_items",
    "manage_ingredients": "manage_ingredients",
    "manage_costs": "manage_costs",
    "manage_branches": "manage_branches",
    "manage_coupons": "manage_coupons",
    "manage_devices": "manage_devices",
    "manage_discounts": "manage_discounts",
    "manage_gift_cards": "manage_gift_cards",
    "manage_promotions": "manage_promotions",
    "manage_settings": "manage_settings",
    "manage_delivery_zones": "manage_delivery_zones",
    "manage_temporary_events": "manage_temporary_events",
    "manage_users": "manage_users",
    "manage_applications": "manage_applications",
    "manage_taxes": "manage_taxes",
    "manage_payment_methods": "manage_payment_methods",
    "manage_fees": "manage_fees",
    "manage_tags": "manage_tags",
    "manage_reasons": "manage_reasons",
    "manage_preparation_routes": "manage_preparation_routes",
    "manage_online_orders": "manage_online_orders",
    "manage_notifications": "manage_notifications",
    "manage_loyalty_program": "manage_loyalty_program",
    "manage_licenses_invoices": "manage_licenses_invoices",
    "manage_allergens": "manage_allergens",
    "manage_price_tags": "manage_price_tags",
    "manage_reservations": "manage_reservations",
    "manage_drivers": "manage_drivers",
    "view_inventory_cost_analysis": "view_inventory_cost_analysis",
    "view_inventory_movement": "view_inventory_movement",
    "view_inventory_levels": "view_inventory_levels",
    "view_inventory_operations": "view_inventory_operations",
    "view_other_reports": "view_other_reports",
    "view_sales_reports": "view_sales_reports",
    "view_cost_adjustment_history": "view_cost_adjustment_history",
    "view_foodics_pay_reports": "view_foodics_pay_reports",
    "view_menu_cost_reports": "view_menu_cost_reports",
    "view_inventory_item_cost": "view_inventory_item_cost",
    "view_user_activity_log": "view_user_activity_log",
    "view_general_summary": "view_general_summary",
    "view_branch_summary": "view_branch_summary",
    "view_inventory_summary": "view_inventory_summary",
    "view_call_center_summary": "view_call_center_summary",
    "view_kitchen_summary": "view_kitchen_summary",
    "access_main_page": "access_main_page",
    "access_device_management": "access_device_management",
    "view_reports": "view_reports",
    "assign_as_waiter": "assign_as_waiter",
    "add_open_fees": "add_open_fees",
    "add_open_price_products": "add_open_price_products",
    "apply_predefined_discounts": "apply_predefined_discounts",
    "apply_open_discounts": "apply_open_discounts",
    "edit_kitchen_sent_products": "edit_kitchen_sent_products",
    "merge_orders": "merge_orders",
    "open_cash_drawer": "open_cash_drawer",
    "end_day": "end_day",
    "print_check": "print_check",
    "print_invoice": "print_invoice",
    "return_order": "return_order",
    "split_order": "split_order",
    "view_closed_orders": "view_closed_orders",
    "cancel_orders_products": "cancel_orders_products",
    "add_order_payments": "add_order_payments",
    "edit_other_user_open_orders": "edit_other_user_open_orders",
    "change_table_owner": "change_table_owner",
    "register_user_fingerprints": "register_user_fingerprints",
    "send_to_kitchen_before_payment": "send_to_kitchen_before_payment",
    "reprint_in_kitchen": "reprint_in_kitchen",
    "edit_table_layout": "edit_table_layout",
    "close_shifts_with_active_orders": "close_shifts_with_active_orders",
    "pay_orders_without_closing": "pay_orders_without_closing",
    "manage_product_availability": "manage_product_availability",
    "activate_future_orders": "activate_future_orders",
    "assign_as_driver": "assign_as_driver",
    "perform_cash_check": "perform_cash_check",
    "manage_roles": "manage_roles",
    "read_roles": "read_roles",
    "manage_inventory_spot": "manage_inventory_spot",
    "read_inventory_spot": "read_inventory_spot",
    "manage_count_sheet": "manage_count_sheet",
    "read_count_sheet": "read_count_sheet",
    "manage_transfer": "manage_transfer",
    "read_transfer": "read_transfer",
    "manage_transfer_order": "manage_transfer_order",
    "read_transfer_order": "read_transfer_order",
    "manage_charges": "manage_charges",
    "read_charges": "read_charges",
    "manage_kitchen_flow": "manage_kitchen_flow",
    "read_kitchen_flow": "read_kitchen_flow",
    "manage_receipts": "manage_receipts",
    "read_receipts": "read_receipts",
    "manage_call_center": "manage_call_center",
    "read_call_center": "read_call_center"
};

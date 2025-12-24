import {
    pgTable,
    uuid,
    varchar,
    text,
    integer,
    timestamp,
    pgEnum,
    boolean,
    numeric,
} from "drizzle-orm/pg-core";

// 1. Core Enums
export const roleEnum = pgEnum("role", ["ADMIN", "VENDOR"]);

export const vendorStatusEnum = pgEnum("vendor_status", [
    "ACTIVE",
    "PAUSED",
    "PENDING",
]);

export const orderStatusEnum = pgEnum("order_status", [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "DELAYED",
]);

export const productStatusEnum = pgEnum("product_status", [
    "IN_STOCK",
    "LOW_STOCK",
    "OUT_OF_STOCK",
]);

// 2. Users Table (Clerk-Backed)
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: roleEnum("role").notNull(),
    vendorId: uuid("vendor_id"), // nullable for admins
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Vendors Table
export const vendors = pgTable("vendors", {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorName: varchar("vendor_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    status: vendorStatusEnum("status").default("PENDING").notNull(),
    fulfillmentRate: numeric("fulfillment_rate", { precision: 5, scale: 2 })
        .default("0.00")
        .notNull(),
    totalOrders: integer("total_orders").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Products Table
export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorId: uuid("vendor_id")
        .notNull()
        .references(() => vendors.id),
    name: varchar("name", { length: 255 }).notNull(),
    sku: varchar("sku", { length: 100 }).notNull().unique(),
    priceINR: numeric("price_inr", { precision: 10, scale: 2 }).notNull(),
    stock: integer("stock").notNull(),
    status: productStatusEnum("status").default("IN_STOCK").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Orders Table
export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderCode: varchar("order_code", { length: 50 }).notNull().unique(),
    vendorId: uuid("vendor_id")
        .notNull()
        .references(() => vendors.id),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    customerCity: varchar("customer_city", { length: 100 }),
    customerState: varchar("customer_state", { length: 100 }),
    totalAmountINR: numeric("total_amount_inr", {
        precision: 12,
        scale: 2,
    }).notNull(),
    status: orderStatusEnum("status").default("PENDING").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 6. Order Items Table
export const orderItems = pgTable("order_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id),
    productName: varchar("product_name", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
    priceINR: numeric("price_inr", { precision: 10, scale: 2 }).notNull(),
});

// 7. Shipments Table
export const shipments = pgTable("shipments", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id),
    courier: varchar("courier", { length: 100 }),
    trackingId: varchar("tracking_id", { length: 100 }),
    estimatedDelivery: timestamp("estimated_delivery"),
    status: varchar("status", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. Analytics Snapshots
export const analyticsSnapshots = pgTable("analytics_snapshots", {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorId: uuid("vendor_id")
        .notNull()
        .references(() => vendors.id),
    date: timestamp("date").notNull(),
    totalOrders: integer("total_orders").notNull(),
    revenueINR: numeric("revenue_inr", { precision: 12, scale: 2 }).notNull(),
    fulfillmentRate: numeric("fulfillment_rate", {
        precision: 5,
        scale: 2,
    }).notNull(),
});

// 9. Activity Logs
export const activityLogs = pgTable("activity_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    type: varchar("type", { length: 50 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 10. Vendor Settings
export const vendorSettings = pgTable("vendor_settings", {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorId: uuid("vendor_id")
        .notNull()
        .references(() => vendors.id)
        .unique(),
    autoAcceptOrders: boolean("auto_accept_orders").default(false).notNull(),
    notificationsEnabled: boolean("notifications_enabled").default(true).notNull(),
    defaultCourier: varchar("default_courier", { length: 100 }),
});

// 11. Order Status History
export const orderStatusHistory = pgTable("order_status_history", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id),
    fromStatus: orderStatusEnum("from_status"),
    toStatus: orderStatusEnum("to_status").notNull(),
    changedAt: timestamp("changed_at").defaultNow().notNull(),
});

// 12. AI Chat Logs
export const aiChatLogs = pgTable("ai_chat_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),
    role: varchar("role", { length: 50 }).notNull(),
    response: text("response"),
    pageContext: text("page_context"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 13. AI Action Logs
export const aiActionLogs = pgTable("ai_action_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    adminId: uuid("admin_id")
        .notNull()
        .references(() => users.id),
    actionType: varchar("action_type", { length: 100 }).notNull(),
    targetId: varchar("target_id", { length: 255 }), // Can be orderId, productId, etc.
    confirmed: boolean("confirmed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

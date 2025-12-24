import { Order, KPI, OrderStatusCount } from "@/types";
import axios from "axios";

export const VendorService = {
    getDashboardData: async (vendorId?: string) => {
        const res = await axios.get("/api/vendor/dashboard", {
            params: { vendorId }
        });
        return res.data;
    },

    getKPIs: async (vendorId?: string): Promise<KPI[]> => {
        const data = await VendorService.getDashboardData(vendorId);
        return data.kpis;
    },

    getOrderStatusCounts: async (vendorId?: string): Promise<OrderStatusCount[]> => {
        const data = await VendorService.getDashboardData(vendorId);
        return data.statusCounts;
    },

    getRecentOrders: async (vendorId?: string): Promise<Order[]> => {
        const data = await VendorService.getDashboardData(vendorId);
        return data.orders;
    },

    getAllOrders: async (vendorId?: string): Promise<Order[]> => {
        const res = await axios.get("/api/vendor/orders/all", {
            params: { vendorId }
        });
        return res.data;
    }
};

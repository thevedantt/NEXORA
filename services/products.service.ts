import { Product } from "@/types";
import axios from "axios";

export const ProductsService = {
    getAllProducts: async (vendorId?: string): Promise<Product[]> => {
        const res = await axios.get("/api/vendor/products/all", {
            params: { vendorId }
        });
        return res.data;
    },

    getLowStockCount: async (vendorId?: string): Promise<number> => {
        const products = await ProductsService.getAllProducts(vendorId);
        return products.filter(p => p.status === "Low Stock" || p.stock < 10).length;
    }
};

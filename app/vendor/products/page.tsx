"use client";

import React, { useEffect, useState } from "react";
import { ProductsService } from "@/services/products.service";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { ProductsTable } from "./_components/products-table";
import { ProductFormDialog } from "./_components/product-form-dialog";
import { EmptyState } from "./_components/empty-state";
import ProductsLoading from "./loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function VendorProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [lowStockCount, setLowStockCount] = useState(0);

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, count] = await Promise.all([
                    ProductsService.getAllProducts(),
                    ProductsService.getLowStockCount()
                ]);
                setProducts(productsData);
                setLowStockCount(count);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddProduct = () => {
        setProductToEdit(null);
        setIsDialogOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setProductToEdit(product);
        setIsDialogOpen(true);
    };

    if (loading) return <ProductsLoading />;

    return (
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
            {/* 1. Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground text-sm">Manage your inventory and product listings</p>
                </div>
                <Button onClick={handleAddProduct} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            {/* 4. Stock Awareness Section */}
            {lowStockCount > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 flex items-center gap-3 text-sm text-yellow-700 dark:text-yellow-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">{lowStockCount} products are running low on stock. Check inventory.</span>
                </div>
            )}

            {/* 2. Products Table or Empty State */}
            {products.length === 0 ? (
                <EmptyState onAdd={handleAddProduct} />
            ) : (
                <ProductsTable
                    products={products}
                    isLoading={loading}
                    onEdit={handleEditProduct}
                />
            )}

            {/* 3. Add / Edit Dialog */}
            <ProductFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                productToEdit={productToEdit}
            />
        </div>
    );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

/**
 * Product Catalog & Management Page
 * [${packet.jiraIssueId}] ${packet.jiraIssueTitle}
 * 
 * Acceptance Criteria Fulfilled:
 * - Product catalog list with search and category filtering
 * - Stock status indicators (In Stock, Low Stock, Out of Stock)
 * - Add product modal dialog with real-time state updates
 * - Pricing, SKU, stock count, and action buttons
 * - Fully responsive layout with light & dark theme compatibility
 */

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: "Electronics" | "Apparel" | "Accessories" | "Office" | "Industrial";
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  rating: number;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  { id: "prod-1", sku: "SKU-PROD-101", name: "Pro Wireless ANC Headphones", category: "Electronics", price: 199.99, stock: 45, status: "In Stock", rating: 4.8 },
  { id: "prod-2", sku: "SKU-PROD-102", name: "Ultra HD 4K Webcam 60FPS", category: "Electronics", price: 129.50, stock: 18, status: "In Stock", rating: 4.6 },
  { id: "prod-3", sku: "SKU-PROD-103", name: "Ergonomic Mechanical Keyboard", category: "Accessories", price: 149.00, stock: 4, status: "Low Stock", rating: 4.9 },
  { id: "prod-4", sku: "SKU-PROD-104", name: "Premium Leather Desk Mat", category: "Office", price: 39.99, stock: 82, status: "In Stock", rating: 4.7 },
  { id: "prod-5", sku: "SKU-PROD-105", name: "USB-C Magnetic Charging Stand", category: "Accessories", price: 49.99, stock: 0, status: "Out of Stock", rating: 4.4 },
  { id: "prod-6", sku: "SKU-PROD-106", name: "Breathable Tech Hoodie (L)", category: "Apparel", price: 68.00, stock: 24, status: "In Stock", rating: 4.5 },
  { id: "prod-7", sku: "SKU-PROD-107", name: "Smart Sensor Office Thermometer", category: "Industrial", price: 89.90, stock: 2, status: "Low Stock", rating: 4.2 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<ProductItem["category"]>("Electronics");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalCatalogValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) return;
    const stockNum = parseInt(newStock, 10) || 0;
    const priceNum = parseFloat(newPrice) || 0;
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      sku: `SKU-PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: newName.trim(),
      category: newCategory,
      price: priceNum,
      stock: stockNum,
      status: stockNum === 0 ? "Out of Stock" : stockNum <= 5 ? "Low Stock" : "In Stock",
      rating: 5.0,
    };
    setProducts([newProduct, ...products]);
    setNewName("");
    setNewPrice("");
    setNewStock("");
    setIsModalOpen(false);
  };

  const categories = ["All", "Electronics", "Accessories", "Office", "Apparel", "Industrial"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
              [${packet.jiraIssueId}] Product Catalog
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
            Products & Merchandise
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your product inventory, pricing, catalog categories and stock levels.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-medium text-white shadow-sm transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Products</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{totalProducts}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">In Stock</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{inStockCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Out of Stock</p>
          <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">{outOfStockCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Catalog Value</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
            $${totalCatalogValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No products matched your search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{prod.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{prod.sku}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-white">
                      ${prod.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={prod.stock === 0 ? "text-red-500 font-semibold" : ""}>{prod.stock}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          prod.status === "In Stock"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : prod.status === "Low Stock"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                        }`}
                      >
                        {prod.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          const add = prompt(`Add stock for "${prod.name}":`, "10");
                          if (!add || isNaN(Number(add))) return;
                          setProducts((prev) =>
                            prev.map((p) =>
                              p.id === prod.id
                                ? { ...p, stock: p.stock + Number(add), status: "In Stock" }
                                : p
                            )
                          );
                        }}
                        className="text-emerald-600 hover:text-emerald-500 font-medium text-xs mr-3"
                      >
                        Restock
                      </button>
                      <button
                        type="button"
                        onClick={() => setProducts((prev) => prev.filter((p) => p.id !== prod.id))}
                        className="text-red-600 hover:text-red-500 font-medium text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Add New Product</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Product Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Mechanical Keyboard"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Office">Office</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="99.99"
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    placeholder="25"
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

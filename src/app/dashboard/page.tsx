"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

/**
 * Static Inventory & Asset Management Dashboard
 * [TEST-14] Add product page
 * 
 * Acceptance Criteria Fulfilled:
 * - Summary KPI metric cards: Total Products, Total Valuation, Low Stock, Out of Stock
 * - Real-time client-side search and category filtering
 * - Data table with SKU, item name, category, stock level, price, status badge, and actions
 * - Stock status indicators: In Stock (green), Low Stock (amber), Out of Stock (red)
 * - Fully responsive static dashboard with light & dark theme compatibility
 */

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: "Electronics" | "Office" | "Industrial" | "Accessories" | "Networking";
  quantity: number;
  reorderPoint: number;
  unitPrice: number;
  location: string;
  lastUpdated: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "item-1",
    sku: "SKU-EL-1042",
    name: "Ultra-Wide 34\" 4K IPS Monitor",
    category: "Electronics",
    quantity: 28,
    reorderPoint: 10,
    unitPrice: 549.99,
    location: "Aisle 3, Bin B-12",
    lastUpdated: "Today, 11:30 AM",
  },
  {
    id: "item-2",
    sku: "SKU-EL-2091",
    name: "Ergonomic Mechanical Keyboard (RGB)",
    category: "Electronics",
    quantity: 142,
    reorderPoint: 25,
    unitPrice: 129.50,
    location: "Aisle 2, Bin A-04",
    lastUpdated: "Yesterday",
  },
  {
    id: "item-3",
    sku: "SKU-OF-3301",
    name: "Executive Ergonomic Mesh Chair",
    category: "Office",
    quantity: 6,
    reorderPoint: 10,
    unitPrice: 389.00,
    location: "Warehouse Bay 4",
    lastUpdated: "2 days ago",
  },
  {
    id: "item-4",
    sku: "SKU-AC-4019",
    name: "USB-C Multiport Thunderbolt 4 Dock",
    category: "Accessories",
    quantity: 4,
    reorderPoint: 15,
    unitPrice: 199.99,
    location: "Aisle 1, Bin C-01",
    lastUpdated: "Today, 09:15 AM",
  },
  {
    id: "item-5",
    sku: "SKU-IN-5120",
    name: "Wireless Industrial 2D Barcode Scanner",
    category: "Industrial",
    quantity: 0,
    reorderPoint: 8,
    unitPrice: 245.00,
    location: "Aisle 5, Bin D-08",
    lastUpdated: "3 days ago",
  },
  {
    id: "item-6",
    sku: "SKU-NW-6014",
    name: "Managed 24-Port Gigabit PoE Switch",
    category: "Networking",
    quantity: 19,
    reorderPoint: 12,
    unitPrice: 420.00,
    location: "Server Room Rack 2",
    lastUpdated: "Oct 24, 2026",
  },
  {
    id: "item-7",
    sku: "SKU-AC-7890",
    name: "Heavy-Duty Dual Monitor Desk Mount",
    category: "Accessories",
    quantity: 64,
    reorderPoint: 20,
    unitPrice: 79.99,
    location: "Aisle 2, Bin B-09",
    lastUpdated: "Oct 22, 2026",
  },
  {
    id: "item-8",
    sku: "SKU-OF-8911",
    name: "Thermal Shipping Label Printer (4x6)",
    category: "Office",
    quantity: 0,
    reorderPoint: 5,
    unitPrice: 175.00,
    location: "Shipping Station 1",
    lastUpdated: "Oct 19, 2026",
  },
];

export default function InventoryDashboardPage() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalValuation = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [items]
  );
  const lowStockCount = useMemo(
    () => items.filter((item) => item.quantity > 0 && item.quantity <= item.reorderPoint).length,
    [items]
  );
  const outOfStockCount = useMemo(
    () => items.filter((item) => item.quantity === 0).length,
    [items]
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const status =
        item.quantity === 0
          ? "Out of Stock"
          : item.quantity <= item.reorderPoint
          ? "Low Stock"
          : "In Stock";

      const matchesStatus =
        selectedStatus === "All" || status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, selectedStatus]);

  const categories = ["All", "Electronics", "Office", "Industrial", "Accessories", "Networking"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200">
              TEST-14
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Inventory Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
            Inventory Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time static inventory monitoring, stock valuations, and warehouse catalog
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => alert("Exporting inventory catalog to CSV...")}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => {
              const name = prompt("Enter product name:");
              if (!name) return;
              const newItem: InventoryItem = {
                id: `item-${Date.now()}`,
                sku: `SKU-MAN-${Math.floor(1000 + Math.random() * 9000)}`,
                name,
                category: "Accessories",
                quantity: 25,
                reorderPoint: 10,
                unitPrice: 49.99,
                location: "Receiving Dock",
                lastUpdated: "Just now",
              };
              setItems((prev) => [newItem, ...prev]);
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-medium text-white transition shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Products / SKUs</span>
            <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{items.length}</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">({totalItems} in stock)</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Across {categories.length - 1} department categories</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Stock Value</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${totalValuation.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Cumulative warehouse asset value</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Low Stock Alerts</span>
            <div className="h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{lowStockCount}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">items below reorder point</span>
          </div>
          <p className="mt-1 text-[11px] text-amber-600/80 dark:text-amber-400/80">Reordering recommended</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Out of Stock</span>
            <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">{outOfStockCount}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">SKUs zero stock</span>
          </div>
          <p className="mt-1 text-[11px] text-red-600/80 dark:text-red-400/80">Backordered / Critical</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by SKU, name, or storage location..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-2.5 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-slate-400 mr-1">Categories:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat
                  ? "rounded-md px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white transition shadow-sm"
                  : "rounded-md px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">SKU / Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">In Stock Qty</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Total Value</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No inventory products matched your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const status =
                    item.quantity === 0
                      ? { label: "Out of Stock", class: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900/50" }
                      : item.quantity <= item.reorderPoint
                      ? { label: "Low Stock", class: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/50" }
                      : { label: "In Stock", class: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900/50" };

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{item.name}</div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{item.sku}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        <span className="inline-block rounded px-2 py-0.5 text-[11px] bg-slate-100 dark:bg-slate-800 font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{item.location}</td>
                      <td className="py-3 px-4 text-right font-semibold">
                        <span className={item.quantity === 0 ? "text-red-600 dark:text-red-400" : ""}>
                          {item.quantity}
                        </span>
                        <div className="text-[10px] text-slate-400 font-normal">Reorder: {item.reorderPoint}</div>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-700 dark:text-slate-200">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-900 dark:text-white">
                        ${(item.quantity * item.unitPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${status.class}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            const add = prompt(`Add stock quantity for "${item.name}":`, "20");
                            if (!add || isNaN(Number(add))) return;
                            setItems((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + Number(add), lastUpdated: "Just now" } : i))
                            );
                          }}
                          className="rounded px-2 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition"
                        >
                          Restock
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-3.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> inventory items
          </div>
          <div>Static Inventory Dashboard • FlowForge Engine</div>
        </div>
      </div>
    </div>
  );
}

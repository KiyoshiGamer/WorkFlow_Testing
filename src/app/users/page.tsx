"use client";

import React, { useState, useMemo } from "react";

/**
 * User & Team Directory Page
 * [${packet.jiraIssueId}] ${packet.jiraIssueTitle}
 */

interface UserMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Developer" | "Designer" | "Product Manager";
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
}

const INITIAL_USERS: UserMember[] = [
  { id: "u-1", name: "Kirby Panasan", email: "kirby@flowforge.dev", role: "Admin", status: "Active", lastActive: "Just now" },
  { id: "u-2", name: "Alex Rivera", email: "alex.r@flowforge.dev", role: "Developer", status: "Active", lastActive: "15m ago" },
  { id: "u-3", name: "Samantha Cole", email: "sam@flowforge.dev", role: "Designer", status: "Active", lastActive: "2 hours ago" },
  { id: "u-4", name: "David Zhang", email: "david.z@flowforge.dev", role: "Product Manager", status: "Active", lastActive: "Yesterday" },
  { id: "u-5", name: "Emily Watson", email: "emily.w@flowforge.dev", role: "Developer", status: "Invited", lastActive: "Never" },
];

export default function UsersManagementPage() {
  const [users, setUsers] = useState<UserMember[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200">
            [${packet.jiraIssueId}] Users & Team
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
            Team Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage team members, roles, permissions, and directory access.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search team members by name or email..."
          className="w-full sm:w-80 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
        />
        <div className="flex items-center gap-1.5">
          {["All", "Admin", "Developer", "Designer", "Product Manager"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                roleFilter === r ? "bg-purple-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Member</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900 dark:text-white">{u.name}</div>
                  <div className="text-[10px] text-slate-400">{u.email}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      u.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-slate-500">{u.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

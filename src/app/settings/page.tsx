"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("FlowForge Workspace");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [themeMode, setThemeMode] = useState("dark");
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure application workspace settings and personal preferences.
        </p>
      </div>

      <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
        {saved && (
          <div className="p-3 text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 rounded-lg">
            Settings saved successfully!
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Workspace Name
          </label>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-xs text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Appearance Theme
          </label>
          <select
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-xs text-slate-900 dark:text-white"
          >
            <option value="dark">Dark Theme (Default)</option>
            <option value="light">Light Theme</option>
            <option value="system">System Preference</option>
          </select>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="email-alerts"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="email-alerts" className="text-xs text-slate-700 dark:text-slate-300 select-none">
            Receive automated deployment and Jira transition alerts via email
          </label>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

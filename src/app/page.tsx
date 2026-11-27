"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * User Login Interface Page
 * [TEST-12] Display the sidebar navigation across the app
 * 
 * Acceptance Criteria Fulfilled:
 * - Display email and password fields
 * - Include a login button with active loading state
 * - Display validation messages for empty fields
 * - Show appropriate error messages for failed login attempts
 * - Integrate with the Login API (/api/auth/login)
 * - Fully responsive card layout with light & dark theme support
 */

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Validation & feedback state
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        setApiError(data.error || "Authentication failed. Please verify your credentials.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      if (data.token) {
        try {
          localStorage.setItem("flowforge.auth_token", data.token);
        } catch {}
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: any) {
      setApiError(err?.message || "A network error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-black/50 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter your credentials to access your FlowForge workspace
          </p>
        </div>

        {/* Global Error Banner */}
        {apiError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/40 p-3.5 text-xs text-red-700 dark:text-red-300 transition-all"
          >
            <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        {/* Success Banner */}
        {isSuccess && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/40 p-3.5 text-xs text-emerald-700 dark:text-emerald-300"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Authentication successful! Redirecting to dashboard...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading || isSuccess}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="you@company.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={
                fieldErrors.email
                  ? "w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors outline-none focus:ring-2 border-red-500 bg-red-50/20 text-red-900 dark:text-red-100 focus:ring-red-500/20"
                  : "w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors outline-none focus:ring-2 border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
              }
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-xs text-red-600 dark:text-red-400 font-medium">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading || isSuccess}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••"
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
              className={
                fieldErrors.password
                  ? "w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors outline-none focus:ring-2 border-red-500 bg-red-50/20 text-red-900 dark:text-red-100 focus:ring-red-500/20"
                  : "w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors outline-none focus:ring-2 border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-blue-500/20"
              }
            />
            {fieldErrors.password && (
              <p id="password-error" className="text-xs text-red-600 dark:text-red-400 font-medium">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700"
            />
            <label htmlFor="remember" className="text-xs text-slate-600 dark:text-slate-300 select-none">
              Remember this device for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2.5 text-sm transition shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Signing in...</span>
              </>
            ) : isSuccess ? (
              <span>Success! Redirecting...</span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

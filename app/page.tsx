"use client";

import * as React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 p-6">
      <main className="flex flex-col items-center space-y-6 text-center animate-in fade-in zoom-in duration-700">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Welcome to Nexora
        </h1>
        <p className="max-w-2xl text-xl font-medium opacity-90 sm:text-2xl">
          Intelligent Marketplace Operations Platform
        </p>
      </main>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
        <a
          href="/vendor"
          className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Enter Vendor Panel
        </a>
        <a
          href="/admin"
          className="rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-secondary-foreground shadow hover:bg-secondary/90 transition-colors"
        >
          Enter Admin Panel
        </a>
      </div>
    </div>
  );
}

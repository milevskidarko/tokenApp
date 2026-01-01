"use client";
import React from 'react';

const Main = ({ children }: { children: React.ReactNode }) => (
  <main className="flex-1 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div className="animate-in fade-in duration-500">
      {children}
    </div>
  </main>
);

export default Main;
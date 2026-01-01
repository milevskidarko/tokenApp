import React from 'react';

const Main = ({ children }: { children: React.ReactNode }) => (
  <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
    {children}
  </main>
);

export default Main;

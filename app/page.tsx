// page.tsx
"use client";

import OnchainProviders from './OnchainProviders';
import Home from './Home';

export default function Page() {
  return (
    <OnchainProviders>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.png" type="image/x-icon" />
      <Home />
    </OnchainProviders>
  );
}

// page.tsx
"use client";

import OnchainProviders from "./OnchainProviders";
import Home from "./Home";

export default function Page() {
  return (
    <OnchainProviders>
      <Home />
    </OnchainProviders>
  );
}

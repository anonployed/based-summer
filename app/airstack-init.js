// airstack-init.js
import { init } from "@airstack/airstack-react";

const apiKey = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;

if (!apiKey) {
  throw new Error("No API key provided for Airstack.");
}

init(apiKey);

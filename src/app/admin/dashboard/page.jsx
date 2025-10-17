"use client";

import { Suspense } from "react";
import Dashboard from "./Dashboard";
 
export default function Page() {
  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <Dashboard />
    </Suspense>
  );
}

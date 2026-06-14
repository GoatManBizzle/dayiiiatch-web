"use client";

import { useEffect } from "react";

import { applyCommittedProductionTheme } from "@/lib/production-theme";

export default function ProductionThemeLoader() {
  useEffect(() => {
    applyCommittedProductionTheme();
  }, []);

  return null;
}

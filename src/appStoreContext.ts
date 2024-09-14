"use client";

import { createContext } from "react";
import { AppStoreApi } from "@/useAppStore";

export const AppStoreContext = createContext<AppStoreApi | null>(null);

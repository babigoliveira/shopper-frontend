"use client";

import Home from "@/pages/Home";
import { AppStoreContext } from "@/appStoreContext";
import { useRef } from "react";
import { createAppStore } from "@/useAppStore";

export default function HomePage() {
  const store = useRef(createAppStore()).current;

  return (
    <AppStoreContext.Provider value={store}>
      <Home />
    </AppStoreContext.Provider>
  );
}

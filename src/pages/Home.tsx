import React from "react";

import CreateMeasureModal from "@/components/CreateMeasureModal/CreateMeasureModal";
import Listing from "@/components/Listing/Listing";
import FilterForm from "@/components/FilterForm/FilterForm";

// @ts-ignore
function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

export default function Home() {
  return (
    <SafeHydrate>
      <FilterForm />
      <Listing />
      <CreateMeasureModal />
    </SafeHydrate>
  );
}

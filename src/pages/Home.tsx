import CreateMeasureModal from "@/components/CreateMeasureModal/CreateMeasureModal";
import Listing from "@/components/Listing/Listing";
import React, { useContext } from "react";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import FilterForm from "@/components/FilterForm/FilterForm";

export default function Home() {
  const store = useContext(AppStoreContext);

  const { filteredMeasures } = useStore(store!);

  return (
    <div>
      <FilterForm />
      {filteredMeasures && <Listing measures={filteredMeasures} />}
      <CreateMeasureModal />
    </div>
  );
}

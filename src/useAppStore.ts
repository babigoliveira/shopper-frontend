"use client";

import { createStore } from "zustand";
import { devtools } from "zustand/middleware";
import { MeasureType } from "@/components/CreateMeasure/CreateMeasure";
import merge from "lodash.merge";
import { Reading } from "@/apis/shopperApi";

export interface State {
  measurePicture: string | null;
  measureType: MeasureType | null;
  username: string | null;
  loading: boolean;
  measureValue: null | number;
  measureUuid: null | string;
  filteredMeasures: Reading[] | null;
}

export interface Actions {
  update: (updates: Partial<State>) => void;
}

type ApplicationStore = State & Actions;

const INITIAL_STATE = {
  measurePicture: null,
  measureType: null,
  username: null,
  loading: false,
  measureValue: null,
  measureUuid: null,
  filteredMeasures: null,
} as const satisfies State;

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const createAppStore = (initialState?: Partial<State>) =>
  createStore<ApplicationStore>()(
    devtools((set, get) => ({
      ...INITIAL_STATE,
      ...initialState,
      update: (updates: Partial<State>) => set(merge({ ...get() }, updates)),
    })),
  );

"use client";

import { createStore } from "zustand";
import { devtools } from "zustand/middleware";

export interface State {}

export interface Actions {}

type ApplicationStore = State & Actions;

const INITIAL_STATE = {} as const satisfies State;

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const createAppStore = (initialState?: Partial<State>) =>
  createStore<ApplicationStore>()(
    devtools((set, get) => ({
      ...INITIAL_STATE,
      ...initialState,
    })),
  );

export const pick =
  (...keys: Array<keyof ApplicationStore>) =>
  <ReturnType extends Pick<ApplicationStore, keyof ApplicationStore>>(
    state: ApplicationStore,
  ): ReturnType => {
    const picked = keys.reduce(
      (picked, key) => ({ ...picked, [key]: state[key] }),
      {} as ReturnType,
    );
    return picked;
  };

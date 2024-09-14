import { Breakpoint, queries } from "@/hooks/useBreakpoint";

/**
 * https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 * */
export const mockBreakpoint = (breakpoint: Breakpoint) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === queries[breakpoint],
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "^/tailwind.config";
import { useMediaQuery } from "usehooks-ts";

const twConfig = resolveConfig(tailwindConfig);
const screens = twConfig.theme.screens;

const xsBreakpointNumber = +screens.sm.replace(/\D/g, "") - 1;

export const breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;

export type Breakpoint = (typeof breakpoints)[number];

export type Breakpoints = {
  [key in Breakpoint]: boolean;
};

const defaultBreakpoints: Readonly<Breakpoints> = breakpoints.reduce(
  (breakpoints, breakpoint) => ({
    ...breakpoints,
    [breakpoint]: false,
  }),
  {} as Breakpoints,
);

export const queries = {
  xs: `(max-width: ${xsBreakpointNumber}px)`,
  sm: `(min-width: ${screens.sm})`,
  md: `(min-width: ${screens.md})`,
  lg: `(min-width: ${screens.lg})`,
  xl: `(min-width: ${screens.xl})`,
  xxl: `(min-width: ${screens["2xl"]})`,
};

export const useXs = (defaultValue = false) =>
  useMediaQuery(queries.xs, { defaultValue });

export const useSm = (defaultValue = false) =>
  useMediaQuery(queries.sm, { defaultValue });

export const useMd = (defaultValue = false) =>
  useMediaQuery(queries.md, { defaultValue });

export const useLg = (defaultValue = false) =>
  useMediaQuery(queries.lg, { defaultValue });

export const useXl = (defaultValue = false) =>
  useMediaQuery(queries.xl, { defaultValue });

export const useXxl = (defaultValue = false) =>
  useMediaQuery(queries.xxl, { defaultValue });

export const useBreakpoints = (defaults = defaultBreakpoints): Breakpoints => {
  const xs = useXs(defaults.xs);
  const sm = useSm(defaults.sm);
  const md = useMd(defaults.md);
  const lg = useLg(defaults.lg);
  const xl = useXl(defaults.xl);
  const xxl = useXxl(defaults.xxl);

  return { xs, sm, md, lg, xl, xxl };
};

export default useBreakpoints;

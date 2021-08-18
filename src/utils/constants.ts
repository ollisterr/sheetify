export const BREAKPOINTS = {
  xsm: 400,
  sm: 700,
  md: 900,
  lg: 1200,
};

export const device = {
  sm: `(max-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px, max-width: ${BREAKPOINTS.md}px)`,
  mdDown: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px, max-width: ${BREAKPOINTS.lg}px)`,
};
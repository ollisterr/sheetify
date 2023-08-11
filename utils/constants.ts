export const BREAKPOINTS = {
  xsm: 400,
  sm: 650,
  md: 750,
  lg: 1100,
};

export const device = {
  sm: `(max-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px)`,
  mdDown: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px, max-width: ${BREAKPOINTS.lg}px)`,
};

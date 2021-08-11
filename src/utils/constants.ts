export const BREAKPOINTS = {
  xsm: 400,
  sm: 700,
  md: 900,
  lg: 1200,
};

export const device = (size: keyof typeof BREAKPOINTS) => {
  return `(max-width: ${BREAKPOINTS[size]}px)`;
};
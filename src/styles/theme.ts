const theme = {
  rem: (px: number) => `${px / 16}rem`,
  colors: {
    black: "#333",
    grey: "#555",
    lightgrey: "#aaa",
  },
  padding: {
    small: "0.5rem",
    default: "1rem",
    medium: "1.5rem",
    large: "2rem",
  },
  borderRadius: {
    small: "0.25rem",
    default: "0.75rem",
    large: "1.25rem",
    pill: "999px",
  },
  spacing: {
    none: "0rem",
    xxsmall: "0.125rem",
    xsmall: "0.25rem",
    small: "0.5rem",
    default: "1rem",
    medium: "1.5rem",
    large: "2rem",
    xlarge: "2.5rem",
    xxlarge: "3rem",
    xxxlarge: "6.5rem",
  },
};

export type Theme = typeof theme;

export type Color = keyof Theme["colors"];

export type Spacing = keyof Theme["spacing"];

export default theme;
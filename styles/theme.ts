import { css } from 'styled-components';

const scaleSize = <T extends number>(size: T, scale: number = 1) =>
  `${size * scale}rem` as `${T}rem`;

const colors = {
  black: '#333',
  grey: '#555',
  lightgrey: '#aaa',
  whitesmoke: '#ddd',
};

const theme = (scale: number = 1, readMode: boolean = false) =>
  ({
    readMode,
    px: (px: number) => `${(px / 16) * scale}rem`,
    rem: (rem: number) => `${rem * scale}rem`,
    absolutePx: (px: number) => `${px}px`,
    absoluteRem: (rem: number) => `${rem * 16}px`,
    colors,
    padding: {
      small: scaleSize(0.5, scale),
      default: scaleSize(1, scale),
      medium: scaleSize(1.5, scale),
      large: scaleSize(2, scale),
    },
    borderRadius: {
      small: scaleSize(0.25, scale),
      default: scaleSize(0.75, scale),
      large: scaleSize(1.25, scale),
      pill: '999px',
    },
    spacing: {
      none: scaleSize(0, scale),
      xxsmall: scaleSize(0.125, scale),
      xsmall: scaleSize(0.25, scale),
      small: scaleSize(0.5, scale),
      default: scaleSize(1, scale),
      medium: scaleSize(1.5, scale),
      large: scaleSize(2, scale),
      xlarge: scaleSize(2.5, scale),
      xxlarge: scaleSize(3, scale),
      xxxlarge: scaleSize(6.5, scale),
    },
    focus: css`
      &:focus {
        box-shadow: 0 0 0 3px ${colors.black};
      }
    `,
  }) as const;

export type Theme = ReturnType<typeof theme>;

export type Color = keyof Theme['colors'];

export type Spacing = keyof Theme['spacing'];

export default theme;

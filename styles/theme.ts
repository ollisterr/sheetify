import { css } from 'styled-components';

const scaleSize = <T extends number>(size: T, scale: number = 1) =>
  `${size * scale}rem` as `${T}rem`;

const colors = {
  black: '#333',
  grey: '#555',
  lightgrey: '#aaa',
  whitesmoke: '#ddd',
};

const spacing = {
  none: 0,
  xxsmall: 0.125,
  xsmall: 0.25,
  small: 0.5,
  default: 1,
  medium: 1.5,
  large: 2,
  xlarge: 2.5,
  xxlarge: 3,
  xxxlarge: 6.5,
} as const;

console.log(spacing);

const absolutePx = (px: number) => `${px}px`;
const absoluteRem = <T extends number>(rem: T) => `${rem * 16}px` as `${T}rem`;

const theme = (scale: number = 1, readMode: boolean = false) =>
  ({
    readMode,
    px: (px: number) => `${(px / 16) * scale}rem`,
    rem: (rem: number) => `${rem * scale}rem`,
    absolutePx,
    absoluteRem,
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
      absolute: {
        none: absoluteRem(spacing.none),
        xxsmall: absoluteRem(spacing.xxsmall),
        xsmall: absoluteRem(spacing.xsmall),
        small: absoluteRem(spacing.small),
        default: absoluteRem(spacing.default),
        medium: absoluteRem(spacing.medium),
        large: absoluteRem(spacing.large),
        xlarge: absoluteRem(spacing.xlarge),
        xxlarge: absoluteRem(spacing.xxlarge),
        xxxlarge: absoluteRem(spacing.xxxlarge),
      } satisfies Record<Spacing, string>,
      none: scaleSize(spacing.none, scale),
      xxsmall: scaleSize(spacing.xxsmall, scale),
      xsmall: scaleSize(spacing.xsmall, scale),
      small: scaleSize(spacing.small, scale),
      default: scaleSize(spacing.default, scale),
      medium: scaleSize(spacing.medium, scale),
      large: scaleSize(spacing.large, scale),
      xlarge: scaleSize(spacing.xlarge, scale),
      xxlarge: scaleSize(spacing.xxlarge, scale),
      xxxlarge: scaleSize(spacing.xxxlarge, scale),
    },
    focus: css`
      &:focus {
        box-shadow: 0 0 0 3px ${colors.black};
      }
    `,
  }) as const;

export type Theme = ReturnType<typeof theme>;

export type Color = keyof Theme['colors'];

export type Spacing = keyof typeof spacing;

export default theme;

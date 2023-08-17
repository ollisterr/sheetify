import styled from 'styled-components';
import { device } from '../utils/constants';
import { Spacing } from './theme';

export const Page = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: ${(p) => p.theme.absoluteRem(1)};

  > * {
    width: 100%;
    max-width: ${(p) => p.theme.absolutePx(1000)};
  }
`;

export const PageWrapper = styled(Page)`
  padding: ${(p) => p.theme.absoluteRem(1)};
  padding-right: ${(p) => p.theme.absoluteRem(3.5)}; // for fitting add bar icon

  @media ${device.sm} {
    padding: ${(p) => p.theme.absoluteRem(0.8)};
    padding-right: ${(p) => p.theme.absoluteRem(1.1)};
  }
`;

export const Button = styled.button<{ $align?: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.absolute.default};
  opacity: 0.5;
  transition: opacity 500ms;
  padding: ${(p) => p.theme.spacing.absolute.small};
  font-size: ${(p) => p.theme.absoluteRem(1)};
  border-radius: ${(p) => p.theme.absolutePx(4)};

  ${(p) => p.$align && `margin-${p.$align}: auto;`}

  &:hover {
    opacity: 1;
  }

  ${(p) => p.theme.focus}
`;

export const IconButton = styled(Button)`
  justify-content: center;
  padding: 0;
  flex: 0;
  font-size: ${(p) => p.theme.absoluteRem(1.2)};
  min-height: ${(p) => p.theme.absoluteRem(1.8)};
  max-height: ${(p) => p.theme.absoluteRem(1.8)};
  max-width: ${(p) => p.theme.absoluteRem(1.8)};
  min-width: ${(p) => p.theme.absoluteRem(1.8)};
  border-radius: 999px;
`;

export const Row = styled.div<{ $align?: 'left' | 'right'; $gap?: Spacing }>`
  flex-shrink: 1;
  display: flex;
  gap: ${(p) => p.theme.spacing.absolute[p.$gap ?? 'small']};
  width: 100%;
  align-items: center;

  ${(p) => p.$align && `margin-${p.$align}: auto;`}

  @media ${device.sm} {
    gap: ${(p) => p.theme.spacing.xsmall};
  }
`;

export const Subtitle = styled.h3`
  flex-shrink: 1;
  font-size: ${(p) => p.theme.absoluteRem(1.1)};
  color: ${(p) => p.theme.colors.grey};
  margin: 0;
  font-weight: 400;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

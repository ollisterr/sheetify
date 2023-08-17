import styled from 'styled-components';
import { device } from '../utils/constants';

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
  gap: ${(p) => p.theme.spacing.default};
  opacity: 0.5;
  padding: ${(p) => p.theme.spacing.small};
  transition: opacity 500ms;
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
  font-size: ${(p) => p.theme.absoluteRem(1.2)};
  height: ${(p) => p.theme.absoluteRem(1.8)};
  width: ${(p) => p.theme.absoluteRem(1.8)};
  border-radius: 999px;
`;

export const Row = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.small};
  width: 100%;
  align-items: center;
`;

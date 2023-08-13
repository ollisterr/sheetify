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

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.default};
  opacity: 0.5;
  padding: 0;
  transition: opacity 500ms;
  font-size: ${(p) => p.theme.absoluteRem(1.2)};

  &:hover {
    opacity: 1;
  }
`;

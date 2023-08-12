import styled from 'styled-components';
import { device } from '../utils/constants';

export const Page = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;

  > * {
    width: 100%;
    max-width: 1000px;
  }
`;

export const PageWrapper = styled(Page)`
  padding: 1rem;
  padding-right: 3.5rem; // for fitting add bar icon

  @media ${device.sm} {
    padding: 0.8rem;
    padding-right: 1.1rem;
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

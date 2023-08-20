'use client';

import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import theme from 'styles/theme';
import { useGlobalState } from './GlobalStateProvider';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { zoom, readMode } = useGlobalState();

  return (
    <StyledThemeProvider theme={theme(zoom, readMode)}>
      <div style={{ fontSize: zoom * 16 }}>{children}</div>
    </StyledThemeProvider>
  );
};

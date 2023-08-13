import Image from 'next/image';
import { ReactNode } from 'react';
import { styled } from 'styled-components';

import { PageWrapper } from 'styles';

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <PageWrapper>
      {children}

      <Trademark>
        Made with{' '}
        <Logo
          width={72}
          height={35}
          alt="Logo"
          src="/assets/sheetify-logo.svg"
        />
      </Trademark>
    </PageWrapper>
  );
};

const Trademark = styled.p`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-top: ${(p) => p.theme.absoluteRem(5)};
  padding-bottom: ${(p) => p.theme.absoluteRem(3)};
  font-size: ${(p) => p.theme.absoluteRem(0.8)};
  text-align: center;
`;

const Logo = styled(Image)`
  display: inline-block;
  width: ${(p) => p.theme.absoluteRem(4.5)};
  margin-left: ${(p) => p.theme.absoluteRem(0.8)};
`;

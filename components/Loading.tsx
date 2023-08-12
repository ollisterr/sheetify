import styled, { keyframes } from 'styled-components';
import { KeyIcon } from './icons';

export const Loading = () => {
  return (
    <Wrapper>
      <AnimationWrapper>
        {[0, 1, 2, 3, 4].map((x) => (
          <Stripe delay={x} key={x} />
        ))}

        <NoteKey>
          <KeyIcon style={{ height: '80%' }} />
        </NoteKey>
      </AnimationWrapper>

      <span>Loading...</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.default};
  max-width: none !important;
  background-color: #fff;
  z-index: 100;
  overflow: hidden;
  color: ${(p) => p.theme.colors.grey};
`;

const AnimationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.default};
  width: 100%;
  max-width: 10rem;
  max-height: 15rem;
  padding: 1rem;
`;

const animation = keyframes`
  0% { background-position: -100% 0%; }
  100% { background-position: 200% 0%; }
`;

const Stripe = styled.div<{ delay: number }>`
  width: 100%;
  height: ${(p) => p.theme.px(8)};
  border-radius: 999px;
  background: linear-gradient(
    to left,
    transparent,
    ${(p) => p.theme.colors.whitesmoke},
    transparent
  );
  background-repeat: no-repeat;
  animation-name: ${animation};
  background-size: 300% 100%;
  background-position: 200% 0%;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0, 0.3, 1, 0.71);
  animation-delay: ${(p) => p.delay * 0.1}s;
  animation-iteration-count: infinite;
`;

const NoteKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  mix-blend-mode: color-burn;
`;

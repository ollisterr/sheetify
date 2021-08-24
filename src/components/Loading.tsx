import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {

  return (
    <Wrapper>
      <AnimationWrapper>
        {[0, 1, 2, 3, 4].map(x => <Stripe delay={x} key={x} />)}
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
  gap: ${p => p.theme.spacing.default};
  max-width: none !important;
  background-color: #fff;
  z-index: 100;
  overflow: hidden;
  color: ${p => p.theme.colors.grey};
`;

const AnimationWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 10rem;
  padding: 1rem;
`;

const animation = keyframes`
  0% { background-position: -100% 0%; }
  100% { background-position: 200% 0%; }
`;

const Stripe = styled.div<{ delay: number }>`
  height: ${p => p.theme.rem(2)};
  margin: 1rem 0;
  border-radius: 999px;
  background: linear-gradient(to left, 
    transparent,
    ${p => p.theme.colors.whitesmoke},
    transparent
  );
  background-repeat: no-repeat;
  animation-name: ${animation};
  background-size: 300% 100%;
  background-position: 200% 0%;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-delay: ${p => p.delay * 0.1}s;
  animation-iteration-count: infinite;
`;


export default Loading;
import styled from "styled-components";

export const Page = styled.main`
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

import React from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { sheet } from "../store";
import { saveTxt } from "../utils/txt.utils";

const ControlBar = observer(({ printPDF }: { printPDF?: () => void }) => (
  <ControlBarWrapper>
    <AddSection onClick={() => sheet.addSection()}>
      <FontAwesomeIcon icon={faPlus} />

      Add Section
    </AddSection>

    <Button onClick={() => saveTxt(sheet.sections)}>
      Save .txt
    </Button>

    <Button onClick={printPDF}>
      Save .pdf
    </Button>
  </ControlBarWrapper>
));

const ControlBarWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  gap: ${p => p.theme.spacing.small};
  width: 100%;
  padding: 0.4rem;
  border-radius: 5px;
  border: dotted 2px ${p => p.theme.colors.lightgrey};
  margin-top: ${p => p.theme.spacing.xxxlarge};
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${p => p.theme.spacing.default};
  padding: 0.2rem 2rem;
  border-radius: 5px;
  font-size: 2rem;
  font-family: inherit;
  color: white;
  text-align: center;
  background-color: ${p => p.theme.colors.lightgrey};
  transition: color 0.15s, background-color 0.1s;

  &:hover, &:focus {
    background-color: ${p => p.theme.colors.grey};
  }
`;

const AddSection = styled(Button)`
  background-color: transparent;
  color: lightgrey;
  
  &:hover {
    background-color: transparent;
    color: ${p => p.theme.colors.grey};
  }
`;


export default ControlBar;
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

import { saveTxt } from '../utils/txt.utils';
import { device } from '../utils/constants';
import { useSheet } from '../store/SheetProvider';

interface Props {
  saveSheet: () => void;
  printPDF?: () => void;
}

export const ControlBar = observer(({ printPDF, saveSheet }: Props) => {
  const sheet = useSheet();

  return (
    <ControlBarWrapper>
      <AddSection onClick={() => sheet.addSection()}>
        <FaPlus /> Add Section
      </AddSection>

      <SaveWrapper>
        <Button onClick={saveSheet}>Save & Share</Button>

        <Button onClick={() => saveTxt(sheet)}>Save .txt</Button>

        <Button onClick={printPDF}>Save .pdf</Button>
      </SaveWrapper>
    </ControlBarWrapper>
  );
});

const ControlBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  width: 100%;
  padding: ${(p) => p.theme.spacing.medium} 0;
  margin-top: ${(p) => p.theme.spacing.xlarge};
`;

const SaveWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  gap: ${(p) => p.theme.spacing.small};
  width: 100vw;
  padding: 0.4rem 2vw;
  // border-top: solid 1px ${(p) => p.theme.colors.lightgrey};
  box-shadow: 0 -0.5rem 1rem rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media ${device.sm} {
    gap: ${(p) => p.theme.spacing.xsmall};
    padding: 0.4rem;
  }
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(p) => p.theme.spacing.default};
  padding: 0.4rem 1rem;
  border-radius: 5px;
  font-size: 2rem;
  font-family: inherit;
  color: white;
  line-height: 1;
  text-align: center;
  background-color: ${(p) => p.theme.colors.lightgrey};
  transition:
    color 0.15s,
    background-color 0.1s;

  &:hover,
  &:focus {
    background-color: ${(p) => p.theme.colors.grey};
  }

  @media ${device.md} {
    font-size: 1.8rem;
  }

  @media ${device.sm} {
    font-size: 1rem;
  }
`;

const AddSection = styled(Button)`
  background-color: transparent;
  color: lightgrey;

  &:hover {
    background-color: transparent;
    color: ${(p) => p.theme.colors.grey};
  }

  &:focus {
    background-color: ${(p) => p.theme.colors.whitesmoke};
    color: ${(p) => p.theme.colors.grey};
  }
`;

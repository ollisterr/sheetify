import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaChevronLeft, FaTrash } from 'react-icons/fa';
import { styled } from 'styled-components';

import { Loading } from '@components';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useSetlist } from '@store/SheetProvider';
import { api } from '@utils/api.utils';

import { IconButton, PageWrapper } from 'styles';

const NewSetlistPage = observer(() => {
  const router = useRouter();

  const setlist = useSetlist();
  const [unfetchedSheets, setUnfetchedSheets] = useState<string[]>([]);

  const [sheetLink, setSheetLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;

  const isEditing = !!router.query.setlistId;

  const onSubmit = () => {
    const routeParams = sheetLink.split('/');
    const sheetId = routeParams[routeParams.length - 1];

    // early exit if we couldn't parse sheet ID or if it's already included in the list
    if (!sheetId || setlist?.sheets.some((x) => x.id === sheetId)) {
      return setSheetLink('');
    }

    if (!isEditing) setIsLoading(true);

    // add to list
    setUnfetchedSheets((sheets) => [...sheets, sheetId]);

    if (setlist) {
      setlist.add(sheetId).then(() => {
        setSheetLink('');
        // remove from fetch list
        setUnfetchedSheets((sheets) => sheets.filter((x) => x !== sheetId));
      });
    } else {
      api
        .addToSetlist(sheetId)
        .then((res) => router.replace(`/setlist/${res}`))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <PageWrapper>
      {isEditing && (
        <Link href={`/setlist/${setlist?.id}`}>
          <IconButton>
            <FaChevronLeft />
          </IconButton>
        </Link>
      )}

      <Wrapper>
        <h3>{isEditing ? 'Edit' : 'Create new'} setlist</h3>

        {[...(setlist?.sheets ?? []), ...unfetchedSheets].map((sheet) =>
          typeof sheet === 'string' ? (
            <Row key={sheet}>
              <SheetTitle>{sheet}</SheetTitle>

              <LoadingSpinner />
            </Row>
          ) : (
            <Row key={sheet.id}>
              <SheetTitle>{sheet.title}</SheetTitle>

              <IconButton onClick={() => setlist?.remove(sheet.id)}>
                <FaTrash />
              </IconButton>
            </Row>
          ),
        )}

        <Row>
          <Input
            value={sheetLink}
            onChange={(e) => setSheetLink(e.target.value)}
            placeholder="Sheet link"
          />

          <Button onClick={onSubmit}>Add</Button>
        </Row>
      </Wrapper>
    </PageWrapper>
  );
});

const Row = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.small};
  width: 100%;

  &:first-child {
    flex: 1 !important;
  }
`;

const SheetTitle = styled.label`
  flex: 1;
  font-size: ${(p) => p.theme.absoluteRem(1.4)};
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.medium};
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: ${(p) => p.theme.absoluteRem(32)};
`;

const Input = styled.input`
  border: solid 2px ${(p) => p.theme.colors.grey};
  padding: ${(p) => p.theme.absoluteRem(0.5)} ${(p) => p.theme.absoluteRem(1)};
  border-radius: 4px;
  text-align: center;
  font-size: ${(p) => p.theme.absoluteRem(1.2)};
`;

const Button = styled.button`
  padding: ${(p) => p.theme.absoluteRem(0.5)} ${(p) => p.theme.absoluteRem(1)};
  background-color: ${(p) => p.theme.colors.whitesmoke};
  border-radius: 4px;
  font-size: ${(p) => p.theme.absoluteRem(1.2)};
`;

export default NewSetlistPage;

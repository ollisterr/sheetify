'use client';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronLeft, FaTrash } from 'react-icons/fa';
import { styled } from 'styled-components';

import { Loading } from '@components';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useSetlist } from '@store/SheetProvider';
import { api } from '@utils/api.utils';

import { IconButton, PageWrapper, Row } from 'styles';
import { SortableItemOrderFn, SortableList } from '@components/SortableList';

export const EditSetlist = observer(() => {
  const router = useRouter();

  const setlist = useSetlist();
  const [unfetchedSheets, setUnfetchedSheets] = useState<string[]>([]);

  const [sheetLink, setSheetLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;

  const isEditing = !!setlist;

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
      api.setlist
        .create({ title: '', sheets: [sheetId] })
        .then((res) => router.replace(`/setlist/${res}`))
        .finally(() => setIsLoading(false));
    }
  };

  const sortSetlist = (orderFn: SortableItemOrderFn) => {
    if (!setlist) return;

    const orderedSheets = orderFn(setlist.sheets);
    setlist.setSheets(orderedSheets);
  };

  return (
    <PageWrapper>
      {isEditing && (
        <Link href={`/setlist/${setlist?.id}`} shallow>
          <IconButton>
            <FaChevronLeft />
          </IconButton>
        </Link>
      )}

      <Wrapper>
        {isEditing ? (
          <SetlistTitleInput
            value={setlist?.title ?? ''}
            onChange={(e) => setlist?.setTitle(e.target.value)}
            placeholder="Untitled setlist"
          />
        ) : (
          <h3>Create new setlist</h3>
        )}

        <SortableList setItems={sortSetlist} disabled={!isEditing}>
          {[...(setlist?.sheets ?? []), ...unfetchedSheets].map((sheet) =>
            typeof sheet === 'string' ? (
              <SetlistRow id={sheet} key={sheet}>
                <SheetTitle>{sheet}</SheetTitle>

                <LoadingSpinner />
              </SetlistRow>
            ) : (
              <SetlistRow key={sheet.id} id={sheet.id}>
                <SheetTitle>{sheet.title}</SheetTitle>

                <IconButton onClick={() => setlist?.remove(sheet.id)}>
                  <FaTrash />
                </IconButton>
              </SetlistRow>
            ),
          )}
        </SortableList>

        <SetlistRow>
          <Input
            value={sheetLink ?? ''}
            onChange={(e) => setSheetLink(e.target.value)}
            placeholder="Sheet link"
          />

          <Button onClick={onSubmit}>Add</Button>
        </SetlistRow>
      </Wrapper>
    </PageWrapper>
  );
});

const SetlistRow = styled(Row)`
  width: 100%;
  padding: ${(p) => p.theme.spacing.absolute.small} 0;

  &:first-child {
    flex: 1 !important;
  }
`;

const SheetTitle = styled.label`
  flex: 1;
  font-size: ${(p) => p.theme.absoluteRem(1.4)};
`;

const SetlistTitleInput = styled.input`
  width: 100%;
  font-size: ${(p) => p.theme.absoluteRem(1.4)};
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.absolute.medium};
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: ${(p) => p.theme.absoluteRem(32)};
`;

const Input = styled.input`
  border: solid 2px ${(p) => p.theme.colors.grey};
  padding: ${(p) =>
    `${p.theme.spacing.absolute.small} ${p.theme.spacing.absolute.default}`};
  border-radius: 4px;
  text-align: center;
  font-size: ${(p) => p.theme.absoluteRem(1.2)};
`;

const Button = styled.button`
  padding: ${(p) =>
    `${p.theme.spacing.absolute.small} ${p.theme.spacing.absolute.default}`};
  background-color: ${(p) => p.theme.colors.whitesmoke};
  border-radius: ${(p) => p.theme.absolutePx(4)};
  font-size: ${(p) => p.theme.absoluteRem(1.2)};
`;

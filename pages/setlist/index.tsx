import { Loading } from '@components';
import { api } from '@utils/api.utils';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled } from 'styled-components';
import { PageWrapper } from 'styles';

const NewSetlistPage = () => {
  const router = useRouter();

  const [sheetLink, setSheetLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    const routeParams = sheetLink.split('/');
    const sheetId = routeParams[routeParams.length - 1];

    if (!sheetId) return;

    setIsLoading(true);

    api
      .addToSetlist(sheetId)
      .then((res) => router.replace(`/setlist/${res.data}`))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <Loading />;

  return (
    <PageWrapper>
      <Wrapper>
        <h3>Create new setlist</h3>

        <Input
          value={sheetLink}
          onChange={(e) => setSheetLink(e.target.value)}
          placeholder="Sheet link"
        />

        <Button onClick={onSubmit}>Create setlist</Button>
      </Wrapper>
    </PageWrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.medium};
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Input = styled.input`
  max-width: ${(p) => p.theme.absoluteRem(24)};
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

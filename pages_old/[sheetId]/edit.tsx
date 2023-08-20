export { default } from '.';

import {
  SheetPageServerSideProps,
  getServerSideProps as getSheetPageServerSideProps,
} from '.';

import { isServerSideProps } from '@utils/common.utils';

export const getServerSideProps: SheetPageServerSideProps = async (...args) => {
  const sheetPageProps = await getSheetPageServerSideProps(...args);

  if (isServerSideProps(sheetPageProps)) {
    sheetPageProps.props.readMode = false;
  }

  return sheetPageProps;
};

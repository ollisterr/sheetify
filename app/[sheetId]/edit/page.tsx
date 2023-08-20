export * from '../page';

import { SheetRouteParams } from 'types';
import SheetPage from '../page';

export default (props: SheetRouteParams) => (
  <SheetPage {...props} readMode={false} />
);

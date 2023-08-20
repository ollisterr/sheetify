import { SectionModule } from '../store/SectionModule';

export type TimeSignature = [number, number];

export type Repeat = [boolean, boolean];

export type SheetType = SectionModule[];

export type RouteParams<T extends object = {}> = { params: T };

export interface PageProps {
  readMode?: boolean;
}

export type SetlistRouteParams = RouteParams<{ setlistId: string }> & PageProps;
export type SheetRouteParams = RouteParams<{
  sheetId: string;
}> &
  PageProps;

export type AppPageProps = SetlistRouteParams & SheetRouteParams;

import { SectionModule } from '../store/SectionModule';

export type TimeSignature = [number, number];

export type Repeat = [boolean, boolean];

export type SheetType = SectionModule[];

export type RouteParams<T extends object = {}> = { params: T };

export type SetlistRouteParams = RouteParams<{ setlistId: string }>;
export type SheetRouteParams = RouteParams<{ sheetId: string }>;

export type AppPageProps = SetlistRouteParams & SheetRouteParams;

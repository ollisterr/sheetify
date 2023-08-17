import { makeAutoObservable, runInAction } from 'mobx';
import { SheetModule, SheetProperties } from './SheetModule';
import { api } from '@utils/api.utils';

export interface SetlistProperties {
  id: string;
  title: string;
  tempo: number;
  sheets: SheetProperties[];
}

export class SetlistModule {
  id = '';
  title = '';
  sheets: SheetModule[] = [];
  activeSheet = 0;

  constructor(props: SetlistProperties) {
    makeAutoObservable(this);
    this.read(props);
  }

  read({ id, title, sheets }: SetlistProperties) {
    this.id = id;
    this.title = title;
    this.activeSheet = 0;
    this.sheets = sheets.map((sheet) => new SheetModule(sheet));
  }

  get nextSheet() {
    const nextIndex = this.activeSheet + 1;
    const nextSheet = this.sheets[nextIndex];

    if (!nextSheet) return undefined;

    return {
      title: nextSheet.title,
      onClick: () => runInAction(() => (this.activeSheet = nextIndex)),
    };
  }

  get previousSheet() {
    const prevIndex = this.activeSheet - 1;
    const prevSheet = this.sheets[prevIndex];

    if (!prevSheet) return undefined;

    return {
      title: prevSheet.title,
      onClick: () => runInAction(() => (this.activeSheet = prevIndex)),
    };
  }

  get sheet() {
    return this.sheets[this.activeSheet ?? 0];
  }

  async add(sheetId: string) {
    // early exit if the sheet is already added
    if (this.sheets.some((x) => x.id === sheetId)) return;

    try {
      // add to setlist and fetch sheet data in parallel
      const [_, sheetData] = await Promise.all([
        api.addToSetlist(sheetId, this.id),
        api.load(sheetId),
      ]);
      this.sheets.push(new SheetModule(sheetData));
    } catch {
      console.error('Invalid sheet ID');
    }
  }

  async remove(sheetId: string) {
    const origSheets = [...this.sheets];
    // optimistically remove sheet from setlist
    this.sheets = this.sheets.filter((x) => x.id !== sheetId);

    try {
      await api.removeFromSetlist(sheetId, this.id);
      console.log('Removed sheet from setlist');
    } catch {
      console.error('Removing sheet failed');
      // revert sheet list
      this.sheets = origSheets;
    }
  }

  setSheets(sheets: SheetModule[]) {
    this.sheets = sheets;
  }
}

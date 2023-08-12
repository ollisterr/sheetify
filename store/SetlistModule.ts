import { makeAutoObservable, runInAction } from 'mobx';
import { SheetModule, SheetProperties } from './SheetModule';

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
}

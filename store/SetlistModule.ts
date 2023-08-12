import { makeAutoObservable } from 'mobx';
import { SheetModule } from './SheetModule';

export class SetlistModule {
  id = '';
  sheets: SheetModule[] = [];
  activeSheet: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

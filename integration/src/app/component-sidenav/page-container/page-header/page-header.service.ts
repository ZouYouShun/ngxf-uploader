import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PageHeaderService {

  public titleChanged = new Subject<string>();

  constructor() { }

  setTitle(val: string) {
    this.titleChanged.next(val);
  }

}

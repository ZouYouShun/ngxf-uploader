import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavbarService {

  public navbarChanged = new Subject<boolean | 'T'>();

  constructor() { }

  open() {
    this.navbarChanged.next(true);
  }

  close() {
    this.navbarChanged.next(false);
  }

  toggle() {
    this.navbarChanged.next('T');
  }
}

import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core';

export abstract class BaseComponent implements OnDestroy {
  protected _destroy$ = new Subject<any>();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}

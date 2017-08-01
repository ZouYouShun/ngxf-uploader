import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core';

export abstract class AutoDestory implements OnDestroy {
  protected _destroy$ = new Subject<any>();

  ngOnDestroy(): void {
    // console.log('a subscribe destroy!');
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}

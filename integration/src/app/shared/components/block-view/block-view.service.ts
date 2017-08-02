import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class BlockViewService {

    constructor() { }

    private blockViewObject: { isShow: boolean, title?: string };
    public datachanged = new Subject<{ isShow: boolean, title?: string }>();

    block(title: string = 'loading') {
        this.blockViewObject = { isShow: true, title: title };
        this.datachanged.next(this.blockViewObject);
    }

    unblock() {
        this.blockViewObject.isShow = false;
        this.datachanged.next(this.blockViewObject);
    }

}

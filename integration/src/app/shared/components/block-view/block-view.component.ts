import { BlockViewService } from './block-view.service';
import { Component, OnInit, HostBinding } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { popup } from '@shared/animation/animation';
@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.css'],
  animations: [
    popup(150, 300)
  ]
})
export class BlockViewComponent implements OnInit {

  constructor(private _blockViewService: BlockViewService) { }

  public blockViewObject: { isShow: boolean, title?: string }
  = { isShow: false, title: 'Loading' };

  ngOnInit() {
    // never destory so do not unsubscript
    this._blockViewService.datachanged
      .subscribe(
      (data) => {
        this.blockViewObject = data;
      });
  }

}

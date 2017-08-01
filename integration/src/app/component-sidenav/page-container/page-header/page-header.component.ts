import { Component, OnInit } from '@angular/core';
import { PageHeaderService } from './page-header.service';
import { AutoDestory } from '@shared/base/auto.destory';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent extends AutoDestory implements OnInit {

  public title = 'Component';
  constructor(private _ps: PageHeaderService) {
    super();
  }

  ngOnInit() {
    this._ps.titleChanged
      .takeUntil(this._destroy$)
      .subscribe((val: string) => {
        this.title = val;
      });
  }

}

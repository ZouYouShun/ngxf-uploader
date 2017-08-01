import { Component, OnInit } from '@angular/core';
import { PageHeaderService } from './page-header.service';
import { BaseComponent } from '@shared/base/base.component';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent extends BaseComponent implements OnInit {

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

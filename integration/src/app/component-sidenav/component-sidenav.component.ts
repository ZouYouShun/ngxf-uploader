import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { MdSidenav } from '@angular/material';
import { AutoDestory } from '@shared/base/auto.destory';

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.component.html',
  styleUrls: ['./component-sidenav.component.scss']
})
export class ComponentSidenavComponent extends AutoDestory implements OnInit {
  @ViewChild('sidenav') side: MdSidenav;
  // public mode = 'push';

  constructor(private _ns: NavbarService) { super(); }

  ngOnInit() {
    this._ns.navbarChanged
      .takeUntil(this._destroy$)
      .subscribe(
      (r: boolean | 'T') => {
        if (r === 'T') {
          return this.side.toggle();
        }
        this.side.toggle(r);
      }
      );
  }

}

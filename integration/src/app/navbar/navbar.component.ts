import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { NavbarService } from './navbar.service';
import { AutoDestory } from '@shared/base/auto.destory';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends AutoDestory implements OnInit {
  @HostBinding('class') class = 'mat-elevation-z6';
  private showToggle = false;

  constructor(
    private _route: Router,
    private _aRoute: ActivatedRoute,
    private _ns: NavbarService) { super(); }

  ngOnInit() {
    this._route.events
      .filter((t) => {
        return (t instanceof NavigationEnd);
      })
      .map((u: NavigationEnd) => {
        return u.urlAfterRedirects;
      })
      .takeUntil(this._destroy$)
      .subscribe((url: string) => {
        // console.log(url.indexOf('upload'));
        if (url.indexOf('upload') > -1) {
          return this.showToggle = true;
        }
        return this.showToggle = false;
      });
  }
  toggleMenu() {
    this._ns.toggle();
  }
}

import { Component, OnInit, HostBinding } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @HostBinding('class') class = 'mat-elevation-z6';

  constructor(private _ns: NavbarService) { }

  ngOnInit() {
  }
  toggleMenu() {
    this._ns.toggle();
  }
}

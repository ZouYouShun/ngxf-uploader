import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.component.html',
  styleUrls: ['./component-sidenav.component.scss']
})
export class ComponentSidenavComponent implements OnInit {
  @ViewChild('sidenav') side: MdSidenav;

  constructor(private _ns: NavbarService) { }

  ngOnInit() {
    console.log(this.side);
    this._ns.navbarChanged.subscribe(
      (r: boolean | 'T') => {
        if (r === 'T') {
          return this.side.toggle();
        }
        this.side.toggle(r);
      }
    );
  }

}

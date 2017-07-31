import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {
  @HostBinding('class') class = 'pad';

  constructor() { }

  ngOnInit() {
  }

}

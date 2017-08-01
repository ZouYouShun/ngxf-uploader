import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-guide-container',
  templateUrl: './guide-container.component.html',
  styleUrls: ['./guide-container.component.scss']
})
export class GuideContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    Observable.fromEvent(this.searchInput.nativeElement, 'input')
      .debounceTime(300)
      .map((e: any) => {
        console.log(e.target.value);
        return e.target;
      })
      .subscribe((value) => {
        // console.log(value);
      });
  }

}

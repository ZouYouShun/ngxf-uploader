import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uploader-container',
  templateUrl: './uploader-container.component.html',
  styleUrls: ['./uploader-container.component.scss']
})
export class UploaderContainerComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    console.log(this._activatedRoute.snapshot.data['menuList']);
  }


}

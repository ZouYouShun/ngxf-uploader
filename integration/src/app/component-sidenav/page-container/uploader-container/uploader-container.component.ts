import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader-container',
  templateUrl: './uploader-container.component.html',
  styleUrls: ['./uploader-container.component.scss']
})
export class UploaderContainerComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  constructor() { }

  ngOnInit() {
  }

}

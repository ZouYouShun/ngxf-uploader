import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'GitHub',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/github-circle-white-transparent.svg'));
  }

  ngOnInit() {
  }
}

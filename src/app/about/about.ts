import { Component } from '@angular/core';
import { BackButtonComponent } from "../back-button/back-button";

@Component({
  selector: 'blog-about',
  imports: [BackButtonComponent],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {}

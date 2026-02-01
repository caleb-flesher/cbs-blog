import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {}

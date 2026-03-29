import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  templateUrl: './back-button.html',
  styleUrl: './back-button.css'
})
export class BackButtonComponent {
  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/home']); // replace with your fallback route
    }
  }
}
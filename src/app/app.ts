import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, NavBar],
  template: `
    <blog-nav-bar></blog-nav-bar>

    <div class="page">
      <router-outlet />
    </div>
  `,
  styles: `
    :host {
      display: block;
      margin: 0;
      padding: 0;
    }

    .page {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
  `,
})
export class App {}

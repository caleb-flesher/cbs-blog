import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';
import { SocialFooter } from './social-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, SocialFooter],
  template: `
    <blog-nav-bar></blog-nav-bar>

    <div class="page">
      <router-outlet />
    </div>

    <social-footer></social-footer>
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

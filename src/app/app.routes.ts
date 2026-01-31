import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found/page-not-found';
import { About } from './about/about';
import { BikeBuilds } from './bike-builds/bike-builds';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: About },
  { path: 'builds', component: BikeBuilds },

  // Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFound },
];

import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found/page-not-found';
import { About } from './about/about';
import { BikeBuilds } from './bike-builds/bike-builds';
import { HomePage } from './home-page/home-page';
import { Blog } from './blog/blog';
import BlogPost from './pages/blog/[slug].page';
import BuildPost from './pages/bike-builds/[slug].page';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'blog', component: Blog },
  { path: 'blog/:slug', component: BlogPost },
  { path: 'bike-builds', component: BikeBuilds },
    { path: 'bike-builds/:slug', component: BuildPost },
  { path: 'about', component: About },

  // Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFound },
];

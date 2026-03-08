import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../post-attributes';
import BuildAttributes from '../build-attributes';

@Component({
  selector: 'home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private readonly posts = injectContentFiles<PostAttributes>()
    .filter(post => post.filename.includes('/blog/'))
    .filter(post => !post.filename.split('/').pop()!.startsWith('DRAFT'))
    .sort((a, b) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
    );

  private readonly builds = injectContentFiles<BuildAttributes>()
    .filter(build => build.filename.includes('/bike-builds/'))
    .filter(build => !build.filename.split('/').pop()!.startsWith('DRAFT'))
    .sort((a, b) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
    );

  readonly latestPost = this.posts[0];
  readonly latestBikeBuild = this.builds[0];
}
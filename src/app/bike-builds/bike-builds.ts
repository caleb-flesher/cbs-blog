import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import BuildAttributes from '../build-attributes';

@Component({
  selector: 'blog-builds',
  imports: [RouterLink],
  // templateUrl: './bike-builds.html',
  template: `
    <h1>Bike Builds</h1>

    @for (build of builds; track build.attributes.slug) {
    <a [routerLink]="['/bike-builds', build.attributes.slug]">
      <h2 class="build__title">{{ build.attributes.title }}</h2>
      <p class="build__desc">{{ build.attributes.description }}</p>
      @if (build.attributes.coverImage) {
        <picture class="build__cover">
          <source [srcset]="build.attributes.coverImage + '?width=600&format=webp'" type="image/webp">
          <img [src]="build.attributes.coverImage + '?width=600'" alt="{{ build.attributes.title }} cover image">
        </picture>
      }
    </a>
    }
  `,
  // styleUrl: './bike-builds.css',
  styles: `
    a { display: block; margin-bottom: 1.5rem; text-align: left; }
    .build__title, .build__desc { margin: 0; }
  `,
})
export class BikeBuilds {
  readonly builds = injectContentFiles<BuildAttributes>()
  .filter(build => build.filename.includes('/bike-builds/'))
  .filter(build =>
    !build.filename.split('/').pop()!.startsWith('DRAFT')
  );
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import BuildAttributes from '../../build-attributes';

@Component({
  selector: 'app-bike-builds',
  imports: [RouterLink],
  template: `
    <h1>Bike Builds</h1>
    @for (build of builds; track build.attributes.slug) {
      <a [routerLink]="['/bike-builds/', build.attributes.slug]">
        <div class="build__card">
          @if (build.attributes.coverImage) {
            <img class="build__image" [src]="build.attributes.coverImage" />
          }
          <div class="build__info">
            <h2 class="build__title">{{ build.attributes.title }}</h2>
            <p class="build__desc">{{ build.attributes.description }}</p>
          </div>
        </div>
      </a>
    }
  `,
  styles: `
    a {
      text-decoration: none;
      display: block;
      margin-bottom: 2rem;
    }

    .build__card {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }

    .build__image {
      width: 150px;
      height: 100px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .build__info {
      display: flex;
      flex-direction: column;
    }

    .build__title,
    .build__desc {
      margin: 0;
    }
  `,
})
export default class BikeBuilds {
  readonly builds = injectContentFiles<BuildAttributes>(
    (contentFile) => contentFile.filename.includes('/bike-builds/')
  );
}
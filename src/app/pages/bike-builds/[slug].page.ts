import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { BackButtonComponent } from '../../back-button/back-button';
import { CarouselComponent } from '../../carousel/carousel';
import BuildAttributes from '../../build-attributes';

@Component({
  selector: 'app-bike-build',
  imports: [AsyncPipe, MarkdownComponent, BackButtonComponent, CarouselComponent],
  template: `
    <app-back-button />
    @if (build$ | async; as build) {
      <article>
        <h1>{{ build.attributes.title }}</h1>
        <app-carousel [images]="build.attributes.images || []" />
        <analog-markdown [content]="build.content" />
      </article>
    }
  `,
  styles: `
    article {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }
  `,
})
export default class Blogbuild {
  readonly build$ = injectContent<BuildAttributes>({
    param: 'slug',
    subdirectory: 'bike-builds',
  });
  constructor(private location: Location) {}
}
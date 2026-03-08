import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import BuildAttributes from '../../build-attributes';

@Component({
  selector: 'app-bike-build',
  imports: [AsyncPipe, MarkdownComponent],
  template: `
  @if (build$ | async; as build) {
    <article>
      @if (build.attributes.coverImage) {
        <img class="build__image" [src]="build.attributes.coverImage" />
      }
      <analog-markdown [content]="build.content" />
    </article>
  }
  `,
  styles: `
    .build__image {
      max-height: 40vh;
    }
  `,
})
export default class Blogbuild {
  readonly build$ = injectContent<BuildAttributes>({
    param: 'slug',
    subdirectory: 'bike-builds',
  });
}

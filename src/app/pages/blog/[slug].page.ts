import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { BackButtonComponent } from "../../back-button/back-button";

@Component({
  selector: 'app-blog-post',
  imports: [AsyncPipe, MarkdownComponent, BackButtonComponent],
  template: `
  <app-back-button />

  @if (post$ | async; as post) {
    <article>
      @if (post.attributes.coverImage) {
        <img class="post__image" [src]="post.attributes.coverImage" />
      }
      <analog-markdown [content]="post.content" />
    </article>
  }
  `,
  styles: `
    .post__image {
      max-height: 40vh;
    }
  `,
})
export default class BlogPost {
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'blog',
  });

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}

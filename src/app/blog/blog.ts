import { Component } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../post-attributes';

@Component({
  selector: 'blog-blog',
  imports: [RouterLink, BackButtonComponent],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
})
export class Blog {
  readonly posts = injectContentFiles<PostAttributes>()
    .filter(post => post.filename.includes('/blog/'))
    .filter(post => !post.filename.split('/').pop()!.startsWith('DRAFT'));
}
import { Component } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import BuildAttributes from '../build-attributes';

@Component({
  selector: 'blog-builds',
  imports: [RouterLink, BackButtonComponent],
  templateUrl: './bike-builds.html',
  styleUrls: ['./bike-builds.css'],
})
export class BikeBuilds {
  readonly builds = injectContentFiles<BuildAttributes>()
    .filter(build => build.filename.includes('/bike-builds/'))
    .filter(build => !build.filename.split('/').pop()!.startsWith('DRAFT'));

  get sortedBuilds() {
    return this.builds.slice().sort((a, b) =>
      new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
    );
  }
}
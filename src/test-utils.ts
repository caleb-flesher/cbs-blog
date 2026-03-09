import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideRouter } from '@angular/router';
import { EnvironmentProviders, Provider } from '@angular/core';

export function getCommonTestProviders(): (Provider | EnvironmentProviders)[] {
  return [
    provideRouter([]),
    provideHttpClient(withFetch()),
    provideContent(withMarkdownRenderer()),  // 👈 remove withPrismHighlighter
  ];
}
import { TestBed } from '@angular/core/testing';
import { getCommonTestProviders } from '../test-utils';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: getCommonTestProviders(),
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
    fixture.destroy();
  });
});
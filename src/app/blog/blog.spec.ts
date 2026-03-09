import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getCommonTestProviders } from '../../test-utils';
import { Blog } from './blog';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog],
      providers: getCommonTestProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});
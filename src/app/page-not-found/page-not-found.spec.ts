import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getCommonTestProviders } from '../../test-utils';
import { PageNotFound } from './page-not-found';

describe('PageNotFound', () => {
  let component: PageNotFound;
  let fixture: ComponentFixture<PageNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFound],
      providers: getCommonTestProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFound);
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
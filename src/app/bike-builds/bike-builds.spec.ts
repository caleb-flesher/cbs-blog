import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getCommonTestProviders } from '../../test-utils';
import { BikeBuilds } from './bike-builds';

describe('BikeBuilds', () => {
  let component: BikeBuilds;
  let fixture: ComponentFixture<BikeBuilds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeBuilds],
      providers: getCommonTestProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(BikeBuilds);
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
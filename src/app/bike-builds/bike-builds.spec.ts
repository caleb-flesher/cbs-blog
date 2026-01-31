import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeBuilds } from './bike-builds';

describe('BikeBuilds', () => {
  let component: BikeBuilds;
  let fixture: ComponentFixture<BikeBuilds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeBuilds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeBuilds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

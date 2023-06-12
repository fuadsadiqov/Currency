import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuityStreamingComponent } from './acuity-streaming.component';

describe('AcuityStreamingComponent', () => {
  let component: AcuityStreamingComponent;
  let fixture: ComponentFixture<AcuityStreamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcuityStreamingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcuityStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

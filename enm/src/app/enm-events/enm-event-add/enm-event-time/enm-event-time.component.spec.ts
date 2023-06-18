import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventTimeComponent } from './enm-event-time.component';

describe('EnmEventTimeComponent', () => {
  let component: EnmEventTimeComponent;
  let fixture: ComponentFixture<EnmEventTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmEventTimeComponent]
    });
    fixture = TestBed.createComponent(EnmEventTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

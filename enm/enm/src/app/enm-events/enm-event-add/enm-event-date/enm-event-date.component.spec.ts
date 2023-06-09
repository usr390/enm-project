import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventDateComponent } from './enm-event-date.component';

describe('EnmEventDateComponent', () => {
  let component: EnmEventDateComponent;
  let fixture: ComponentFixture<EnmEventDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmEventDateComponent]
    });
    fixture = TestBed.createComponent(EnmEventDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

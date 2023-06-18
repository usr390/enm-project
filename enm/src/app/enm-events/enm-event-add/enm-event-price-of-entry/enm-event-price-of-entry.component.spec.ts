import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventPriceOfEntryComponent } from './enm-event-price-of-entry.component';

describe('EnmEventPriceOfEntryComponent', () => {
  let component: EnmEventPriceOfEntryComponent;
  let fixture: ComponentFixture<EnmEventPriceOfEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmEventPriceOfEntryComponent]
    });
    fixture = TestBed.createComponent(EnmEventPriceOfEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

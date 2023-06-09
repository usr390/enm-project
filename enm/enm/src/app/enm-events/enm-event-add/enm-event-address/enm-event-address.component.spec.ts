import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventAddressComponent } from './enm-event-address.component';

describe('EnmEventAddressComponent', () => {
  let component: EnmEventAddressComponent;
  let fixture: ComponentFixture<EnmEventAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmEventAddressComponent]
    });
    fixture = TestBed.createComponent(EnmEventAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

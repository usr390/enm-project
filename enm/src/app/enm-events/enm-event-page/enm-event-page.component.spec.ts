import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnmEventPageComponent } from './enm-event-page.component';
import { EnmEventService } from './../../core/services/enm-event.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('EnmEventPageComponent', () => {
  let component: EnmEventPageComponent;
  let fixture: ComponentFixture<EnmEventPageComponent>;
  let mockEnmEventService: jasmine.SpyObj<EnmEventService>;
  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(async () => {
    mockEnmEventService = jasmine.createSpyObj('EnmEventService', ['']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ EnmEventPageComponent ],
      providers: [
        { provide: EnmEventService, useValue: mockEnmEventService },
        { provide: Store, useValue: mockStore },

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

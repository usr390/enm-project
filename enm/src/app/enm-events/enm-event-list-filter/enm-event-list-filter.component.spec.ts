import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { EnmEventListFilterComponent } from './enm-event-list-filter.component';
import { EnmEventService } from './../../core/services/enm-event.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('EnmEventListFilterComponent', () => {
  let component: EnmEventListFilterComponent;
  let fixture: ComponentFixture<EnmEventListFilterComponent>;
  let mockEnmEventService: jasmine.SpyObj<EnmEventService>;

  const mockStore = { 
    select: jasmine.createSpy().and.returnValue(of(null)),
    dispatch: jasmine.createSpy(), 
  };

  beforeEach(async () => {
    mockEnmEventService = jasmine.createSpyObj('EnmEventService', ['']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ EnmEventListFilterComponent ],
      providers: [
        { provide: EnmEventService, useValue: mockEnmEventService },
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

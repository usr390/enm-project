import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { EnmEventListFilterComponent } from './enm-event-list-filter.component';
import { EnmEventService } from '../../core/services/enm-event.service';


describe('EnmEventListFilterComponent', () => {
  let component: EnmEventListFilterComponent;
  let fixture: ComponentFixture<EnmEventListFilterComponent>;
  let mockEnmEventService: jasmine.SpyObj<EnmEventService>;

  beforeEach(async () => {
    mockEnmEventService = jasmine.createSpyObj('EnmEventService', ['']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ EnmEventListFilterComponent ],
      providers: [{ provide: EnmEventService, useValue: mockEnmEventService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnmEventListComponent } from './enm-event-list.component';
import { EnmEventService } from '../../core/services/enm-event.service';
import { EnmEventModule } from '../enm-events.module';


describe('EnmEventListComponent', () => {
  let component: EnmEventListComponent;
  let fixture: ComponentFixture<EnmEventListComponent>;
  let mockEnmEventService: jasmine.SpyObj<EnmEventService>;

  beforeEach(async () => {
    mockEnmEventService = jasmine.createSpyObj('EnmEventService', ['']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EnmEventModule],
      declarations: [ EnmEventListComponent, EnmEventListComponent ],
      providers: [{ provide: EnmEventService, useValue: mockEnmEventService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnmEventListToolbarComponent } from './enm-event-list-toolbar.component';
import { EnmEventListFilterComponent } from '../enm-event-list-filter/enm-event-list-filter.component';
import { EnmEventModule } from '../enm-events.module';

describe('EnmEventListToolbarComponent', () => {
  let component: EnmEventListToolbarComponent;
  let fixture: ComponentFixture<EnmEventListToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EnmEventModule, HttpClientTestingModule ],
      declarations: [ EnmEventListToolbarComponent, EnmEventListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnmEventListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

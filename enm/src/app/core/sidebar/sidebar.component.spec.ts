import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { LogInService } from '../services/login.service';
import { CoreModule } from '../core.module';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockLogInService: jasmine.SpyObj<LogInService>;

  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockLogInService = jasmine.createSpyObj('LogInService', ['']);
    TestBed.configureTestingModule({
      imports: [ CoreModule ],
      declarations: [ SidebarComponent ],
      providers: [{ provide: Store, useValue: mockStore }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

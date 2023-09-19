import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LogInComponent } from './login.component';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

describe('LoginComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockLoginService = jasmine.createSpyObj('LoginService', ['']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ LogInComponent ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: MessageService, useValue: mockMessageService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockLoginService = jasmine.createSpyObj('LoginService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ LoginComponent ],
      providers: [{ provide: Store, useValue: mockStore }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

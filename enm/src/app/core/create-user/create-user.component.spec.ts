import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreateUserComponent } from './create-user.component';
import { CreateUserService } from '../services/create-user.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let mockCreateUserService: jasmine.SpyObj<CreateUserService>;

  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockCreateUserService = jasmine.createSpyObj('CreateUserService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CreateUserComponent ],
      providers: [
        { provide: Store, useValue: mockStore },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

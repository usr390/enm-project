import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { LoginService } from '../services/login.service';
import { CoreModule } from '../core.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    mockLoginService = jasmine.createSpyObj('LoginService', ['']);
    TestBed.configureTestingModule({
      imports: [ CoreModule ],
      declarations: [ SidebarComponent ],
      providers: [ LoginService ]
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

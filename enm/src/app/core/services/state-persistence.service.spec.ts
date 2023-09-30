import { TestBed } from '@angular/core/testing';

import { StatePersistenceService } from './state-persistence.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from 'src/app/state/auth/auth.reducer';

describe('TestPersistenceService', () => {
  let service: StatePersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({ auth: authReducer }),
      ],
    });
    service = TestBed.inject(StatePersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

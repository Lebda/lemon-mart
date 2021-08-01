import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { autoSpyObj } from 'angular-unit-test-helper';

import { UiService } from '../common/ui.service';
import { InMemoryAuthService } from './auth.inmemory.service';

describe('InMemoryAuthService', () => {
  let service: InMemoryAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InMemoryAuthService,
        { provide: UiService, useValue: autoSpyObj(UiService) },
      ],
    });
    service = TestBed.inject(InMemoryAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

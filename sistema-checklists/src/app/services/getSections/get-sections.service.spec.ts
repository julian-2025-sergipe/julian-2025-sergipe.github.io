import { TestBed } from '@angular/core/testing';

import { GetSectionsService } from './get-sections.service';

describe('GetSectionsService', () => {
  let service: GetSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { D0ApiService } from './d0-api.service';

describe('D0ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D0ApiService]
    });
  });

  it('should be created', inject([D0ApiService], (service: D0ApiService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { WritterService } from './writter.service';

describe('WritterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WritterService]
    });
  });

  it('should be created', inject([WritterService], (service: WritterService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { AvolaService } from './avola-angular.service';

describe('AvolaAngularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvolaService]
    });
  });

  it('should be created', inject([AvolaService], (service: AvolaService) => {
    expect(service).toBeTruthy();
  }));
});

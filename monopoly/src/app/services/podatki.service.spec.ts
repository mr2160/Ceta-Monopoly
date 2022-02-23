import { TestBed } from '@angular/core/testing';

import { PosestiPodatkiService } from './podatki.service';

describe('PosestiPodatkiService', () => {
  let service: PosestiPodatkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosestiPodatkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

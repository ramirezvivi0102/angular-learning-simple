import { TestBed } from '@angular/core/testing';

import { ColoresService } from './colors.service';

describe('ColorsService', () => {
  let service: ColoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

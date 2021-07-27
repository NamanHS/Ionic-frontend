import { TestBed } from '@angular/core/testing';

import { MarksheetsService } from './marksheets.service';

describe('MarksheetsService', () => {
  let service: MarksheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarksheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

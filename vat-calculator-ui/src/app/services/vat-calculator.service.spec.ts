import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VatCalculatorService } from './vat-calculator.service';
import { AppConfig } from '../config/app.config';
import { VatCalculatorDto } from '../models/dto/vat-calculator-dto';

describe('VatCalculatorService', () => {
  let service: VatCalculatorService;
  let httpMock: HttpTestingController;
  let mockConfig: AppConfig = new AppConfig();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VatCalculatorService, { provide: AppConfig, useValue: mockConfig }]
    });
    service = TestBed.inject(VatCalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call API to calculate VAT', () => {
    const dummyDto: VatCalculatorDto = { net: 10, gross: 0, vat: 0, vatRate: 10 };
    service.calculate(dummyDto).subscribe(response => {
      expect(response).toEqual(dummyDto);
    });

    const req = httpMock.expectOne('https://localhost:7228/api/VatCalculator');
    expect(req.request.method).toBe('POST');
    req.flush(dummyDto);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
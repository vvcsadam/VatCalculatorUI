import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VatCalculatorDto } from '../models/dto/vat-calculator-dto';
import { AppConfig } from '../config/app.config';

@Injectable({ providedIn: 'root' })
export class VatCalculatorService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: AppConfig) {
    this.apiUrl = config.apiUrl + "api/VatCalculator";
  }

  calculate(vatCalculatorDto: VatCalculatorDto): Observable<VatCalculatorDto> {
    return this.http.post<VatCalculatorDto>(this.apiUrl, vatCalculatorDto, { headers: { 'Content-Type': 'application/json' } });
  }
}
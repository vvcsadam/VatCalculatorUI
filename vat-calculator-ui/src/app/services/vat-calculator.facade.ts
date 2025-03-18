import { Injectable } from '@angular/core';
import { VatCalculatorService } from './vat-calculator.service';
import { VatCalculatorDto } from '../models/dto/vat-calculator-dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VatCalculatorFacade {

  constructor(private vatCalculatorService: VatCalculatorService) {}

  calculate(vatCalculatorDto: VatCalculatorDto): Observable<VatCalculatorDto> {
    return this.vatCalculatorService.calculate(vatCalculatorDto);
  }
}
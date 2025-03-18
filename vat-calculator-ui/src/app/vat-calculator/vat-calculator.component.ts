import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VatRate } from '../models/enums/vat-rate';
import { VatCalculatorFacade } from '../services/vat-calculator.facade';
import { VatCalculatorDto } from '../models/dto/vat-calculator-dto';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-vat-calculator',
  templateUrl: './vat-calculator.component.html',
  styleUrl: './vat-calculator.component.css'
})
export class VatCalculatorComponent {
  private vatRate = VatRate;
  private numbericRegEx = "^[0-9]+(\\.[0-9]+)?$";

  vatRateKeys = Object.keys(this.vatRate).filter(f => !isNaN(Number(f)));
  vatCalculationForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private vatCalculatorFacade: VatCalculatorFacade) { 
    this.vatCalculationForm = this.fb.group({
      net: new FormControl('', [Validators.pattern(this.numbericRegEx)]),
      gross: new FormControl('', [Validators.pattern(this.numbericRegEx)]),
      vat: new FormControl('', [Validators.pattern(this.numbericRegEx)]),
      vatRate: new FormControl("10", [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.vatCalculationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const vatCalculatorDto: VatCalculatorDto = this.mapFormToModel();

      this.vatCalculatorFacade.calculate(vatCalculatorDto)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe((vatCalculatorDto: VatCalculatorDto) => {
        this.mapModelToForm(vatCalculatorDto);
      });
    }
  }

  hasFormControlError(controlName: string, validation: string): boolean {
    return this.vatCalculationForm.get(controlName)?.hasError(validation) ?? false;
  }

  getVatRateOptionLabel(vatRateKey: string): string {
    return VatRate[Number.parseInt(vatRateKey)];
  }

  private mapFormToModel(): VatCalculatorDto {
    let vatCalculatorDto = this.vatCalculationForm.value as VatCalculatorDto;
    vatCalculatorDto.net = vatCalculatorDto.net ? vatCalculatorDto.net : null;
    vatCalculatorDto.gross = vatCalculatorDto.gross ? vatCalculatorDto.gross : null;
    vatCalculatorDto.vat = vatCalculatorDto.vat ? vatCalculatorDto.vat : null;
    vatCalculatorDto.vatRate = vatCalculatorDto.vatRate ? vatCalculatorDto.vatRate : null;
    return vatCalculatorDto;
  }

  private mapModelToForm(vatCalculatorDto: VatCalculatorDto) {
    this.vatCalculationForm.controls["net"].setValue(vatCalculatorDto.net);
    this.vatCalculationForm.controls["gross"].setValue(vatCalculatorDto.gross);
    this.vatCalculationForm.controls["vat"].setValue(vatCalculatorDto.vat);
    this.vatCalculationForm.controls["vatRate"].setValue(vatCalculatorDto.vatRate?.toString());
  }
}
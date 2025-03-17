import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VatRange } from '../models/enums/vat-range';

@Component({
  selector: 'app-vat-calculator',
  templateUrl: './vat-calculator.component.html',
  styleUrl: './vat-calculator.component.css'
})
export class VatCalculatorComponent implements OnInit {
  vatRange = VatRange;
  vatRangeKeys = Object.keys(this.vatRange).filter(f => !isNaN(Number(f)));

  public vatCalculationForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.vatCalculationForm = new FormGroup({
      net: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      gross: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      vat: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      vatRange: new FormControl(10)
    });
  }

  onSubmit(): void {
    if (this.vatCalculationForm.valid) {
      const formValues = this.vatCalculationForm.value;
    } else {
    }
  }

  hasFormControlError(controlName: string, validation: string): boolean {
    return this.vatCalculationForm.get(controlName)?.hasError(validation) ?? false;
  }

  getVatRangeOptionLabel(rangeKey: string): string {
    return VatRange[Number.parseInt(rangeKey)];
  }
}
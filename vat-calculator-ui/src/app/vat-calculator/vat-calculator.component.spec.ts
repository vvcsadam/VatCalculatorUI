import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VatCalculatorComponent } from '../vat-calculator/vat-calculator.component';
import { VatCalculatorFacade } from '../services/vat-calculator.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { VatCalculatorDto } from '../models/dto/vat-calculator-dto';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


describe('VatCalculatorComponent', () => {
  let component: VatCalculatorComponent;
  let fixture: ComponentFixture<VatCalculatorComponent>;
  let mockFacade: jasmine.SpyObj<VatCalculatorFacade>;

  beforeEach(async () => {
    mockFacade = jasmine.createSpyObj('VatCalculatorFacade', ['calculate']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatProgressSpinnerModule
      ],
      declarations: [VatCalculatorComponent],
      providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        { provide: VatCalculatorFacade, useValue: mockFacade }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when filled correctly', () => {
    component.vatCalculationForm.setValue({ net: '10', gross: '0', vat: '0', vatRate: '20' });
    expect(component.vatCalculationForm.valid).toBeTruthy();
  });

  it('should submit form and update values', () => {
    const mockResponse: VatCalculatorDto = { net: 11, gross: 22, vat: 33, vatRate: 10 };
    mockFacade.calculate.and.returnValue(of(mockResponse));
  
    component.vatCalculationForm.setValue({ net: 11, gross: 1, vat: 1, vatRate: 10 });
    component.onSubmit();
  
    expect(mockFacade.calculate).toHaveBeenCalledWith(jasmine.objectContaining({ net: 11, vatRate: 10 }));
  
    fixture.detectChanges();
  
    expect(Number(component.vatCalculationForm.value.net)).toEqual(11);
    expect(Number(component.vatCalculationForm.value.gross)).toEqual(22);
    expect(Number(component.vatCalculationForm.value.vat)).toEqual(33);
    expect(Number(component.vatCalculationForm.value.vatRate)).toEqual(10);
  });

  it('should not submit if form is invalid', () => {
    component.vatCalculationForm.setValue({ net: '', gross: '', vat: '', vatRate: '' });
    component.onSubmit();
    expect(mockFacade.calculate).not.toHaveBeenCalled();
  });
});

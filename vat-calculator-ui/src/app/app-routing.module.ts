import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { VatCalculatorComponent } from './vat-calculator/vat-calculator.component';

const routes: Routes = [
  { path: 'description', component: TaskDescriptionComponent },
  { path: 'calculator', component: VatCalculatorComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

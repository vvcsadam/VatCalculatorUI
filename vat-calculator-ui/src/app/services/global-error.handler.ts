import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {
  }
  
  handleError(error: any): void {
    if(!error?.error?.error) { return; }

    this.zone.run(() => {
      this.snackBar.open(error.error.error, 'X', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfig {
  public readonly apiUrl = 'https://localhost:7228/';
}
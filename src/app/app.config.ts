import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';

import {routes} from './app.routes';
import CustomAuraPreset from '../CustomAuraPreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes)
    , provideAnimationsAsync()
    , providePrimeNG({
      theme: {
        preset: CustomAuraPreset,
        options: {
          darkModeSelector: false,
        }
      },
      ripple: true
    })
    , provideHttpClient()
  ]
};

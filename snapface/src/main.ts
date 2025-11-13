import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

registerLocaleData(fr.default); // 1 - enregistre dans l'application la langue française;  2 - dans app.config.ts

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

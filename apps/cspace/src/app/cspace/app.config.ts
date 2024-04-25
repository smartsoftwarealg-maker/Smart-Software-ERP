import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
    providers: [
        // provideRouter(routes),
        importProvidersFrom(BrowserModule),
        provideAnimations(),
        provideHttpClient()
    ]
};

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { withEnabledBlockingInitialNavigation, provideRouter, Routes, RouterModule } from '@angular/router';
import { MainPageComponent, ShoppingCartComponent, ShoppingGuard, SalesAcknowledgementComponent, SalesConfirmationComponent } from '@ss/sales/ecommerce';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { UiThemeModule } from '@ss/common/ui-theme';
import { UiErrorHandlerModule } from '@ss/common/ui-error-handler';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { TranslatePipe } from '@ss/common/ui-lang';

const shoppingRoutes: Routes = [
    {path: '', component: MainPageComponent, pathMatch: 'full'},
    {path: 'cart', component: ShoppingCartComponent, canActivate: [ShoppingGuard]},
    {path: 'main-page', component: MainPageComponent},
    {path: 'sales-acknowledgement', component: SalesAcknowledgementComponent},
    {path: 'sales-confirmation', component: SalesConfirmationComponent, canActivate: [ShoppingGuard]},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];



if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(CommonModule, BrowserModule, RouterModule, UiThemeModule, UiErrorHandlerModule, TranslatePipe),
        provideRouter(shoppingRoutes, withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
})
    .catch((err) => console.error(err));

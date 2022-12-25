import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {HeaderPageComponent, MainPageComponent} from '@ss/sales/ecommerce';
import {UiThemeModule} from '@ss/common/ui-theme';
import {UiErrorHandlerModule} from '@ss/common/ui-error-handler';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonUiLangModule} from '@ss/common/ui-lang';

const shoppingRoutes: Routes = [
    {path: '', component: MainPageComponent, pathMatch: 'full'},
    {path: '**', redirectTo: '/app/main-page', pathMatch: 'full'}
];

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(shoppingRoutes, { initialNavigation: 'enabledBlocking' }),
        RouterModule,
        HttpClientModule,
        HeaderPageComponent,
        HttpClientModule,
        UiThemeModule,
        UiErrorHandlerModule,
        BrowserAnimationsModule,
        CommonUiLangModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

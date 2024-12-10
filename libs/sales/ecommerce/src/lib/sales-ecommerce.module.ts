import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { HeaderPageComponent, MainPageComponent} from '@ss/sales/ecommerce';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSelectComponent } from '@ss/common/ui-theme';
import { SalesAdsListComponent } from './sales-ads-list/sales-ads-list.component';
import { SalesAdsDetailComponent } from './sales-ads-detail/sales-ads-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';
import { SalesAcknowledgementComponent } from './sales-acknowledgement/sales-acknowledgement.component';
import { ImageInputComponent } from '@ss/common/ui-image-input';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        BrowserModule,


        ReactiveFormsModule,

        RouterModule,
        DatePickerComponent,

        BrowserAnimationsModule,
        ThemeSelectComponent,
        ImageInputComponent,
        MainPageComponent,
        SalesAdsListComponent,
        SalesAdsDetailComponent,
        ShoppingCartComponent,
        SalesConfirmationComponent,
        SalesAcknowledgementComponent,
        HeaderPageComponent
    ],
    exports: [MainPageComponent],
})
export class SalesEcommerceModule {}

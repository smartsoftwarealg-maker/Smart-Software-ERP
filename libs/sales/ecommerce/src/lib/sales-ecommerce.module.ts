import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { LogisticsUiDocImportModule } from '@ss/logistics/ui-doc-import';
import { HeaderPageComponent, MainPageComponent} from '@ss/sales/ecommerce';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiThemeModule } from '@ss/common/ui-theme';
import { SalesAdsListComponent } from './sales-ads-list/sales-ads-list.component';
import { SalesAdsDetailComponent } from './sales-ads-detail/sales-ads-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';
import { SalesAcknowledgementComponent } from './sales-acknowledgement/sales-acknowledgement.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        BrowserModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiDocImportModule,
        CommonUiImageInputModule,
        BrowserAnimationsModule,
        UiThemeModule,
    ],
    declarations: [
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

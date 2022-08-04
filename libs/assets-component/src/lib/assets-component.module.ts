import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetsDetailComponent} from './assets-detail/assets-detail.component';
import {AssetsListComponent} from './assets-list/assets-list.component';
import {RouterModule} from '@angular/router';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiImageInputModule} from '@ss/common/ui-image-input';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import { AssetCostsListComponent } from './asset-costs-list/asset-costs-list.component';
import { AssetCostsDetailComponent } from './asset-costs-detail/asset-costs-detail.component';
import { AssetRevaluationListComponent } from './asset-revaluation-list/asset-revaluation-list.component';
import { AssetRevaluationDetailComponent } from './asset-revaluation-detail/asset-revaluation-detail.component';
import { AssetBlockingDetailComponent } from './asset-blocking-detail/asset-blocking-detail.component';
import { AssetBlockingListComponent } from './asset-blocking-list/asset-blocking-list.component';
import { AssetCostTypeListComponent } from './asset-cost-type-list/asset-cost-type-list.component';
import { AssetCostTypeDetailComponent } from './asset-cost-type-detail/asset-cost-type-detail.component';
import { AssetRevaluationTypeListComponent } from './asset-revaluation-type-list/asset-revaluation-type-list.component';
import { AssetRevaluationTypeDetailComponent } from './asset-revaluation-type-detail/asset-revaluation-type-detail.component';
import { AssetLocationsListComponent } from './asset-locations-list/asset-locations-list.component';
import { AssetLocationsDetailComponent } from './asset-locations-detail/asset-locations-detail.component';
import { AssetSearchDialogComponent } from './asset-search-dialog/asset-search-dialog.component';
import {CustomAttributesModule} from '@ss/custom-attributes';
import { AssetClassListComponent } from './asset-class-list/asset-class-list.component';
import { AssetClassDetailComponent } from './asset-class-detail/asset-class-detail.component';
import { AssetAppointmentListComponent } from './asset-appointment-list/asset-appointment-list.component';
import { AssetAppointmentDetailComponent } from './asset-appointment-detail/asset-appointment-detail.component';
import { AssetOptionsComponent } from './asset-options/asset-options.component';
import {AssetReceptionsComponent} from './asset-receptions/asset-receptions.component';
import { AssetAppointmentDocListComponent } from './asset-appointment-doc-list/asset-appointment-doc-list.component';
import { AssetAppointmentDocDetailComponent } from './asset-appointment-doc-detail/asset-appointment-doc-detail.component';
import { AssetInventoryDetailComponent } from './asset-inventory-detail/asset-inventory-detail.component';
import { AssetInventoryListComponent } from './asset-inventory-list/asset-inventory-list.component';
import {NgxScannerQrcodeModule} from 'ngx-scanner-qrcode';
import { AssetBlockingTypeListComponent } from './asset-blocking-type-list/asset-blocking-type-list.component';
import { AssetBlockingTypeDetailComponent } from './asset-blocking-type-detail/asset-blocking-type-detail.component';
import { AssetBuildingListComponent } from './asset-building-list/asset-building-list.component';
import { AssetBuildingDetailComponent } from './asset-building-detail/asset-building-detail.component';
import {AppArchiveModule} from '@ss/common/app-archive';
import { AssetReceptionsDetailComponent } from './asset-receptions-detail/asset-receptions-detail.component';
import { OfficeSearchComponent } from './office-search/office-search.component';
import { EndTypesListComponent } from './end-types-list/end-types-list.component';
import { EndTypesDetailComponent } from './end-types-detail/end-types-detail.component';
import { SearchListComponent } from './search-list/search-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        NgxScannerQrcodeModule,
        AppArchiveModule
    ],
    declarations: [
        AssetsDetailComponent,
        AssetsListComponent,
        AssetCostsListComponent,
        AssetCostsDetailComponent,
        AssetRevaluationListComponent,
        AssetRevaluationDetailComponent,
        AssetBlockingDetailComponent,
        AssetBlockingListComponent,
        AssetCostTypeListComponent,
        AssetCostTypeDetailComponent,
        AssetRevaluationTypeListComponent,
        AssetRevaluationTypeDetailComponent,
        AssetLocationsListComponent,
        AssetLocationsDetailComponent,
        AssetSearchDialogComponent,
        AssetClassListComponent,
        AssetClassDetailComponent,
        AssetAppointmentListComponent,
        AssetAppointmentDetailComponent,
        AssetOptionsComponent,
        AssetReceptionsComponent,
        AssetAppointmentDocListComponent,
        AssetAppointmentDocDetailComponent,
        AssetInventoryDetailComponent,
        AssetInventoryListComponent,
        AssetBlockingTypeListComponent,
        AssetBlockingTypeDetailComponent,
        AssetBuildingListComponent,
        AssetBuildingDetailComponent,
        AssetReceptionsDetailComponent,
        OfficeSearchComponent,
        EndTypesListComponent,
        EndTypesDetailComponent,
        SearchListComponent,
    ],
})
export class AssetsComponentModule {
}

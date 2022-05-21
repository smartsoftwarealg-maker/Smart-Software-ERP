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
        AssetSearchDialogComponent
    ],
})
export class AssetsComponentModule {
}

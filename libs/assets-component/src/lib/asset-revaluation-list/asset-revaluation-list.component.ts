import { Component, Input, OnInit } from '@angular/core';
import { AssetCost, AssetRevaluation } from '../assets-api';
import { LanguageService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { AssetCostsService } from '../services/asset-costs.service';
import { SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { of, switchMap } from 'rxjs';
import { AssetRevaluationService } from '../services/asset-revaluation.service';
import { CommonModule } from '@angular/common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-revaluation-list',
    templateUrl: './asset-revaluation-list.component.html',
    styleUrls: ['./asset-revaluation-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        RouterModule,


        PaginationComponent,
        TranslatePipe
    ]

})
export class AssetRevaluationListComponent extends BaseChildEntityListComponent<AssetRevaluation>{
    override displayedColumns = ['typeDescription', 'deprec_year', 'useful_life', 'amount'];

    constructor(public entitySrv: AssetRevaluationService) {
        super(entitySrv, 'AssetRevaluation');
    }
}

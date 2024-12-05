import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { AssetRevaluationTypeService } from '../services/asset-revaluation-type.service';
import { CommonModule } from '@angular/common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-revaluation-type-list',
    templateUrl: './asset-revaluation-type-list.component.html',
    styleUrls: ['./asset-revaluation-type-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        DatePickerComponent,
        RouterModule,


        PaginationComponent
    ]
})
export class AssetRevaluationTypeListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = [
        'description',
        'descriptionAr'
    ];

    constructor(
        public infoSrv: AssetRevaluationTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ASSET_REVALUATION_TYPES');
        this.pagination.pageSize = 15;
    }
}

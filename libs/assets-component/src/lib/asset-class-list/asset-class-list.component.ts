import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AssetClass} from '../assets-api';
import {AssetClassService} from '../services/asset-class.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';



import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';

import { QRCodeModule } from 'angularx-qrcode';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
  selector: 'ss-asset-class-list',
  templateUrl: './asset-class-list.component.html',
  styleUrls: ['./asset-class-list.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,

        QRCodeModule,
        PaginationComponent
    ]})
export class AssetClassListComponent extends BaseEntityListComponent<AssetClass> {

    displayedColumns = [
        'description',
        'depreciationRate',
        'usefulLife'
    ];

    constructor(
        public override entitySrv: AssetClassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_CLASSES');
    }
}

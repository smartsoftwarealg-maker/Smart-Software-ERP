import { Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {AssetBlockingTypeService} from '../services/asset-blocking-type.service';
import { CommonModule } from '@angular/common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { QRCodeModule } from 'angularx-qrcode';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-asset-cost-types-list',
  templateUrl: './asset-blocking-type-list.component.html',
  styleUrls: ['./asset-blocking-type-list.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        DatePickerComponent,
        RouterModule,

        QRCodeModule,
        PaginationComponent
    ]})
export class AssetBlockingTypeListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = [
        'description',
        'descriptionAr',
    ]
    constructor(
        public infoSrv: AssetBlockingTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'ASSET_BLOCKING_TYPES');
        this.pagination.pageSize = 15;
    }
}

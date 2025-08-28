import { Component } from '@angular/core';
import { Vat, VatService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';




import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatSort } from '@angular/material/sort';


@Component({
    selector: 'ss-vat-list',
    templateUrl: './vat-list.component.html',
    standalone: true,
    imports: [
    MaterialModule,
    RouterModule,
    MaterialModule,
    TranslateDirective,
    PaginationComponent,
    MatSort
],
    styleUrls: ['./vat-list.component.scss']
})
export class VatListComponent extends BaseEntityListComponent<Vat> {

    displayedColumns = ['description', 'descriptionAr','value'];

    constructor(
        public vatSrv: VatService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(vatSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_VATS');
    }

}

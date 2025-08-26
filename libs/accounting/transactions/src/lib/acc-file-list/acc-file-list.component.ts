import { Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ACCFile, AccFileService} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";



import { ReactiveFormsModule } from "@angular/forms";


import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
  selector: 'ss-acc-file-list',
  templateUrl: './acc-file-list.component.html',
  styleUrls: ['./acc-file-list.component.scss'],
    standalone: true,
    imports: [
    RouterModule,
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    PaginationComponent
]
})
export class AccFileListComponent extends BaseEntityListComponent<ACCFile> {
    displayedColumns = [
        'description',
        'fileYear',
        'closed'
    ];

    constructor(
        public override entitySrv: AccFileService,
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
            'ACC_FILES');
        this.pagination.pageSize = 15;
    }

}

import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {
    MaterialModule,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Location } from '@ss/master-data/api-article';
import { LocationService } from '@ss/master-data/api-article';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-production-unlocking-lots',
    templateUrl: './unlocking-lots.component.html',
    styleUrl: './unlocking-lots.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
    ],
})
export class UnlockingLotsComponent
    extends BaseEntityListComponent<Location>
    implements OnInit
{
    displayedColumns = ['reference', 'description', 'analysisDate', 'blocked'];

    override ngOnInit() {
        this.addButton.visible = false;
        this.editButton.visible = false;
        this.deleteButton.visible = false;
        this.emailReportButton.visible = false;
        this.excelButton.visible = false;
        super.ngOnInit();
        // this.defReportButton.visible = false;
        // this.viewReportButton.visible = false;
    }

    constructor(
        public override entitySrv: LocationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'STOCK_UNLOCKING_LOTS',
        );
        this.pagination.pageSize = 15;
    }

    block() {
        if (this.selected && this.selectedRow.analysisDate != undefined) {
            this.selectedRow.blockedLot = !this.selectedRow.blockedLot;
            this.entitySrv.update(this.selectedRow).subscribe({
                next: () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                },
                error: (err) => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                },
            });
        }
    }
}

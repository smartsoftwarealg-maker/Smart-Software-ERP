import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Class, ClassService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {PaginationComponent} from "@ss/common/ui-pagination";
import {TranslateDirective} from "@ss/common/ui-lang";

@Component({
    selector: 'ss-class-accounts',
    imports: [
        CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatTable,
        MatHeaderCellDef,
        MatRow,
        PaginationComponent,
        MatRowDef,
        MatHeaderRowDef,
        TranslateDirective,
    ],
    templateUrl: './class-accounts-list.component.html',
    styleUrl: './class-accounts-list.component.scss',
    standalone: true,
})
export class ClassAccountsListComponent extends BaseEntityListComponent<Class> {
    displayedColumns = ['description', 'accountno'];

    constructor(
        public classSrv: ClassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            classSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_CLASSES_ACCOUNTS',
        );
        this.pagination.pageSize = 10;
    }

    override ngOnInit() {
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();
    }

    override processLoadedData(data: Class[]): Observable<Class[]> {
        return this.classSrv.reload(data);
    }
}

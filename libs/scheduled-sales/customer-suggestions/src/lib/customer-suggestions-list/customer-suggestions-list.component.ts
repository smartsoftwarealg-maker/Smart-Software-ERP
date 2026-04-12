import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CustomerSuggestion } from '../customer-suggestion.class';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    LoginService,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { CustomerSuggestionsService } from '../customer-suggestion.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'ss-customer-suggestion-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCell,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatRow,
        MatSort,
        MatSortHeader,
        MatTable,
        PaginationComponent,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        TranslateDirective,
    ],
    templateUrl: './customer-suggestions-list.component.html',
    styleUrl: './customer-suggestions-list.component.scss',
})
export class CustomerSuggestionsListComponent extends BaseEntityListComponent<CustomerSuggestion> {
    private loginSrv = inject(LoginService);

    displayedColumns = ['date', 'suggestionDescription', 'suggestion', 'answer'];

    constructor(
        public override entitySrv: CustomerSuggestionsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
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
            'COMMON_SUGGESTIONS',
        );
        this.pagination.pageSize = 15;
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.deleteButton.visible = this.addButton.visible =
                    (this.loginSrv.appCtx.agentId || 0) > 0;
                if ((this.loginSrv.appCtx.agentId || 0) == 0) {
                    this.displayedColumns.splice(1, 0, 'agentDescription');
                }
            }));
    }

    override selectRow(row: CustomerSuggestion) {
        super.selectRow(row);
        this.editable = this.editable && (row?.answer?.length || 0) == 0;
    }

    override ngOnInit() {
        super.ngOnInit();
    }
}

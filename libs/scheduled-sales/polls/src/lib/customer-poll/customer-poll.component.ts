import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    HttpService,
    LanguageService,
    MaterialModule,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
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
import { CustomerPoll } from '@ss/scheduled-sales/api-scheduled-sales';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatStep, MatStepLabel, MatStepper } from '@angular/material/stepper';
import { MatFormField } from '@angular/material/form-field';
import { CustomerPollService } from '../customer-poll.service';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { map, switchMap, tap } from 'rxjs/operators';
import _default from 'chart.js/dist/core/core.interaction';

@Component({
    selector: 'sch-customer-pools-list',
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
        MatCheckbox,
        MatStep,
        MatFormField,
        MatStepper,
        MatStepLabel,
        MatInput,
        ReactiveFormsModule,
        MatButton,
        MaterialModule,
    ],
    templateUrl: './customer-poll.component.html',
    styleUrl: './customer-poll.component.scss',
})
export class CustomerPollComponent extends BaseEntityListComponent<CustomerPoll> {
    public satisfactionAnswer = [
        'SCH_VERY_SATISFIED',
        'SCH_SATISFIED',
        'SCH_UNSATISFIED',
    ];

    constructor(
        public override entitySrv: CustomerPollService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        public httpSrv: HttpService,
        public langSrv: LanguageService,
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
            'SCH_CUSTOMER_POLLS',
        );
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        this.editButton.visible = false;
        this.defReportButton.visible = false;
        this.refreshButton.visible = false;
        this.excelButton.visible = false;
        this.emailReportButton.visible = false;
        this.viewReportButton.visible = false;
        super.ngOnInit();
    }

    public setLocal(name: string, value: string) {
        localStorage.setItem(name, value);
    }

    public getLocal(name: string) {
        return localStorage.getItem(name);
    }

    public getSatisVal(id: number) {
        return this.data[id].satisfactionAnswer ? this.data[id].satisfactionAnswer : +localStorage.getItem('S'+id);
    }

    public getBoolVal(id: number) {
        return this.data[id].bollAnswer ? this.data[id].bollAnswer : localStorage.getItem('B'+id);
    }

    public getMemoVal(id: number) {
        return this.data[id].memo ? this.data[id].memo : localStorage.getItem('M'+id);
    }

    public save() {
        let val = this.data;
        for (let i = 0; i < this.data.length; i++) {
            if (this.getLocal('S' + i)) {
                val[i].satisfactionAnswer = +this.getLocal('S' + i);
            }
            if (this.getLocal('B' + i)) {
                val[i].bollAnswer = this.getLocal('B' + i);
            }
            if (this.getLocal('B' + i)) {
                val[i].memo = this.getLocal('M' + i);
            }
        }
        this.shellSrv.setLoading(true);
        const obs = this.httpSrv
            .put('/ssales/customer-poll')
            .pipe(map((res: { count: number }) => res['count']));

        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.shellSrv.goBack();
                this.snackBarSrv.showSuccessMessage();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                throw err;
            },
        });
    }

}

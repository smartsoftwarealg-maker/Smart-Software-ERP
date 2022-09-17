import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SnackBarService } from '@ss/common/ui-shell';
import { DECISION_ROUTE_URL, EmployeeDecisionService, Decision } from '@ss/payroll/api-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginationModel, LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'ss-employee-decision-list',
    templateUrl: './employee-decision-list.component.html',
    styleUrls: ['./employee-decision-list.component.scss']
})
export class EmployeeDecisionListComponent implements OnInit, OnDestroy {
    @Input() editable = true;
    @Input()
    set personId(id: number) {
        this.entitySrv.setParentId(id);
    }

    public displayedColumns = [
        'dec_reference',
        'dec_date',
        'application_date',
        'motiveName',
        'application_period',
        'dec_header'
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Decision[] = [];
    public selected = 0;

    constructor(public entitySrv: EmployeeDecisionService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService) {
    }

    ngOnInit() {
        this.pagination.onChange = () => this.refresh();
        this.refresh();
    }

    public refresh() {
        // todo: add access rights
        this.selected = 0;
        return this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(result => {
                this.data = result.body;
                this.data.forEach(p => {
                    p.dec_date = this.langSrv.formatDate(p.dec_date);
                    p.application_date = this.langSrv.formatDate(p.application_date);
                });
                this.pagination.elementCount = result.itemCount;
            });
    }

    public select(id: number): void {
        this.selected = id;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selected && this.selected > 0) {
                        const a = this.data.filter(x => x.id === this.selected)[0];
                        if (a && a.id) {
                            //this.shellSrv.setLoading(true);
                            this.entitySrv.remove(a.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.refresh();
                                    },
                                    error: err => {
                                        this.snackBarSrv.showFailureMessage();
                                        //this.shellSrv.setLoading(false);
                                        throw err;
                                    }
                                });
                        }
                    }
                }
            });
    }

    public edit() {
        this.showDetail(this.selected);
    }

    public showDetail(id: number) {
        this.router.navigate([DECISION_ROUTE_URL, id], { relativeTo: this.route }).then();
    }

    ngOnDestroy() {
    }
}

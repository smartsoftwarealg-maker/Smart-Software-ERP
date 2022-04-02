import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SnackBarService } from '@ss/common/ui-shell';
import { CONTRACTS_ROUTE_URL, EmployeeContractService, Contract } from '@ss/payroll/api-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginationModel, LanguageService } from '@ss/common/api-common';
import { LookupsService } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import { Lookup } from '@ss/logistics/ui-doc-import';

@Component({
    selector: 'ss-employee-contracts',
    templateUrl: './employee-contracts-list.component.html',
    styleUrls: ['./employee-contracts-list.component.scss']
})
export class EmployeeContractListComponent implements OnInit, OnDestroy {
    private _activePersonnel = true;

    @Input()
    set activePersonnel(active: boolean) {
        this._activePersonnel = active;
    }
    get activePersonnel() {
        return this._activePersonnel;
    }

    @Input()
    set personId(id: number) {
        this.entitySrv.setParentId(id);
    }

    public displayedColumns = [
        'number',
        'recordNumber',
        'date',
        'fromdate',
        'todate',
        'valid_date',
        'post',
        'division',
        'department',
        'service',
        'salarygrid', // todo: add lookup
        'salary_rank',
        'basesalary',
        'notes',
        'motive', // todo: add lookup
        'cost_center', // todo: add lookup
        'confirmed',
        'trial_period'
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Contract[] = [];
    public selected = 0;
    public posts: { [id: number]: string; };
    public divisions: { [id: number]: string; };
    public departments: { [id: number]: string; };
    public services: { [id: number]: string; };

    constructor(public entitySrv: EmployeeContractService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public langSrv: LanguageService,
        public lookupsSrv: LookupsService,
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
        this.lookupsSrv.getPosts()
            .pipe(
                tap(posts => this.posts = this.lookupToMap(posts)),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap(list => this.departments = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = this.lookupToMap(list)),
                switchMap(() => this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize))
            )
            .subscribe(result => {
                this.data = result.body;
                this.data.forEach(c => {
                    c.valid_date = this.langSrv.formatDate(c.valid_date);
                    c.fromdate = this.langSrv.formatDate(c.fromdate);
                    c.todate = this.langSrv.formatDate(c.todate);
                    c.date = this.langSrv.formatDate(c.date);
                });
                this.pagination.elementCount = result.itemCount;
            });
    }

    lookupToMap(data: Lookup[]): { [id: number]: string; } {
        return data.reduce(
            (total: { [id: number]: string; }, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
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
        this.router.navigate([CONTRACTS_ROUTE_URL, id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }
}

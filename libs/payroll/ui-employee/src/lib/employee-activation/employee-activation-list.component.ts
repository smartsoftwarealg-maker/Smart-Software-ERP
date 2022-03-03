import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SnackBarService } from '@ss/common/ui-shell';
import { EmployeeActivationService, EmployeeActivation, ACTIVATION_ROUTE_URL } from '@ss/payroll/api-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService, PaginationModel } from '@ss/common/api-common';
import { LookupsService } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import { Lookup } from '@ss/logistics/ui-doc-import';

@Component({
    selector: 'ss-emp-act-history',
    templateUrl: './employee-activation-list.component.html',
    styleUrls: ['./employee-activation-list.component.scss']
})
export class EmployeeActivationListComponent implements OnInit, OnDestroy {

    @Input()
    set personId(id: number) {
        this.entitySrv.setParentId(id);
    }

    public displayedColumns = [
        'hireDate',
        'employmentType',
        'suspended',
        'suspensionDate',
        'suspensionReason',
        'inConflict'
    ];
    public readonly pagination = PaginationModel.newInstance();
    public data: EmployeeActivation[] = [];
    public selected = 0;
    public employmentTypes: { [id: number]: string; };
    public suspensionReasons: { [id: number]: string; };

    constructor(public entitySrv: EmployeeActivationService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
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
        this.lookupsSrv.getEmploymentTypes()
            .pipe(
                tap((list: Lookup[]) => this.employmentTypes = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getSuspensionReasons()),
                tap((list: Lookup[]) => this.suspensionReasons = this.lookupToMap(list)),
                switchMap(() => this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize))
            )
            .subscribe(result => {
                this.data = result.body;
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
        this.router.navigate([ACTIVATION_ROUTE_URL, id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }
}

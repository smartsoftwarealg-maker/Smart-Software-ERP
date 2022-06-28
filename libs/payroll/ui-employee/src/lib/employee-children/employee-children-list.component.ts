import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SnackBarService } from '@ss/common/ui-shell';
import { CHILDREN_ROUTE_URL, EmployeeChildrenService, Child } from '@ss/payroll/api-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginationModel, LanguageService } from '@ss/common/api-common';
import { LookupsService } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import { Lookup } from '@ss/logistics/ui-doc-import';

@Component({
    selector: 'ss-employee-children',
    templateUrl: './employee-children-list.component.html',
    styleUrls: ['./employee-children-list.component.scss']
})
export class EmployeeChildrenListComponent implements OnInit, OnDestroy {
    private _activePersonnel = true;
    @Input() editable = true;

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
        'name',
        'birthDate',
        'birthPlace'
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Child[] = [];
    public selected = 0;
    public posts: { [id: number]: string; };
    public divisions: { [id: number]: string; };
    public departments: { [id: number]: string; };
    public services: { [id: number]: string; };

    constructor(public entitySrv: EmployeeChildrenService,
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
        this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(result => {
                this.data = result.body;
                this.data.forEach(c => {
                    c.birthDate = this.langSrv.formatDate(c.birthDate);
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
        this.router.navigate([CHILDREN_ROUTE_URL, id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }
}

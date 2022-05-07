import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SnackBarService } from '@ss/common/ui-shell';
import { CAREER_ROUTE_URL, EmployeeCareerService, Career } from '@ss/payroll/api-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginationModel, LanguageService } from '@ss/common/api-common';
import { LookupsService } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import { Lookup } from '@ss/logistics/ui-doc-import';

@Component({
    selector: 'ss-employee-career',
    templateUrl: './employee-career-list.component.html',
    styleUrls: ['./employee-career-list.component.scss']
})
export class EmployeeCareerListComponent implements OnInit, OnDestroy {
    private _activePersonnel = true;
    private _hrMode          = true;

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

    @Input()
    set hrMode(mode: boolean) {
        this._hrMode = mode;
    }

    get hrMode() {
        return this._hrMode;
    }
    public displayedColumns = [
        'from_date',
        'to_date',
        'paymonth',
        'post',
        'division',
        'department',
        'service'
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Career[] = [];
    public selected = 0;
    public posts: { [id: number]: string; };
    public divisions: { [id: number]: string; };
    public departments: { [id: number]: string; };
    public services: { [id: number]: string; };

    constructor(public entitySrv: EmployeeCareerService,
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
                tap((list: Lookup[]) => this.posts = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap((list: Lookup[]) => this.departments = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap((list: Lookup[]) => this.divisions = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getServices()),
                tap((list: Lookup[]) => this.services = this.lookupToMap(list)),
                switchMap(() => this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize))
            )
            .subscribe(result => {
                this.data = result.body;
                this.data.forEach(p => {
                    p.from_date = this.langSrv.formatDate(p.from_date);
                    p.to_date = this.langSrv.formatDate(p.to_date);
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
        this.router.navigate([CAREER_ROUTE_URL, id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }
}

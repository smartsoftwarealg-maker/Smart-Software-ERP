import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {SnackBarService} from '@ss/common/ui-shell';
import {Career, CAREER_ROUTE_URL, EmployeeCareerService} from '@ss/payroll/api-employee';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LanguageService, PaginationModel} from '@ss/common/api-common';
import {LookupsService} from '@ss/common/api-lookup';
import {switchMap, tap} from 'rxjs/operators';
import {Lookup} from '@ss/logistics/ui-doc-import';

@Component({
    selector: 'ss-employee-career',
    templateUrl: './employee-career-list.component.html',
    styleUrls: ['./employee-career-list.component.scss']
})
export class EmployeeCareerListComponent implements OnInit, OnDestroy {
    @Input() editable = true;
    public displayedColumns = [
        'paymonth',
        'post',
        'division',
        'department',
        'service',
        'workshop',
        'gridCategory',
        'profCategory',
        'salary_rank',
        'trial_period'
    ];
    public readonly pagination = PaginationModel.newInstance();
    public data: Career[] = [];
    public selected = 0;
    public posts: { [id: number]: string; };
    public divisions: { [id: number]: string; };
    public departments: { [id: number]: string; };
    public services: { [id: number]: string; };
    public workshops: { [id: number]: string; };

    constructor(public entitySrv: EmployeeCareerService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public langSrv: LanguageService,
                public lookupsSrv: LookupsService,
                public confirmationSrv: ConfirmationDialogService,
                public defReportSrv: DefaultReportService) {
    }

    private _activePersonnel = true;

    get activePersonnel() {
        return this._activePersonnel;
    }

    @Input()
    set activePersonnel(active: boolean) {
        this._activePersonnel = active;
    }

    private _hrMode = true;

    get hrMode() {
        return this._hrMode;
    }

    @Input()
    set hrMode(mode: boolean) {
        this._hrMode = mode;
    }

    @Input()
    set personId(id: number) {
        this.entitySrv.setParentId(id);
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
                switchMap(() => this.lookupsSrv.getWorkshops()),
                tap((list: Lookup[]) => this.workshops = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap((list: Lookup[]) => this.departments = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap((list: Lookup[]) => this.divisions = this.lookupToMap(list)),
                switchMap(() => this.lookupsSrv.getServices()),
                tap((list: Lookup[]) => this.services = this.lookupToMap(list)),
                switchMap(() => this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize))
            )
            .subscribe((result: {body: Career[], itemCount: number} )=> {
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
        this.router.navigate([CAREER_ROUTE_URL, id], {relativeTo: this.route})
            .then();
    }

    ngOnDestroy() {
    }
}

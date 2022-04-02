import {Component, Input, OnInit} from '@angular/core';
import {LanguageService, PaginationModel} from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {TRAINING_ROUTE_URL} from '@ss/payroll/api-employee';
import {EmployeeTrainingService} from '../employee-training.service';
import {Training} from '../employee-training';

@Component({
  selector: 'ss-employee-training-list',
  templateUrl: './employee-training-list.component.html',
  styleUrls: ['./employee-training-list.component.scss']
})
export class EmployeeTrainingListComponent implements OnInit {
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
        'reference',
        'ref_date',
        'motiveName',
        'from_date',
        'to_date',
        'day_count',
        'training',
        'trainer',
        'location',
        'diplomaName',
        'mission_expenses',
        'trn_expenses',
        'extra_expenses',
        'judicialName'
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Training[] = [];
    public selected = 0;

    constructor(public entitySrv: EmployeeTrainingService,
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
                this.data.forEach(p => {
                    p.from_date = this.langSrv.formatDate(p.from_date);
                    p.to_date = this.langSrv.formatDate(p.to_date);
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
        this.router.navigate([TRAINING_ROUTE_URL, id], { relativeTo: this.route })
            .then();
    }

}

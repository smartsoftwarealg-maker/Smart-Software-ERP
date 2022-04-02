import {Component, Input, OnInit} from '@angular/core';
import {LanguageService, PaginationModel} from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Punishment} from '../punishment-api';
import {PunishmentService} from '../punishment.service';
import {PUNISHMENT_ROUTE_URL} from '@ss/payroll/api-employee';

@Component({
  selector: 'ss-punishment-list',
  templateUrl: './punishment-list.component.html',
  styleUrls: ['./punishment-list.component.scss']
})
export class PunishmentListComponent implements OnInit {
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
        'date',
        'sanction',
        'typeName',
        'faultName',
        'memo',
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Punishment[] = [];
    public selected = 0;

    constructor(public entitySrv: PunishmentService,
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
                    p.date = this.langSrv.formatDate(p.date);
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
        this.router.navigate([PUNISHMENT_ROUTE_URL, id], { relativeTo: this.route })
            .then();
    }
}

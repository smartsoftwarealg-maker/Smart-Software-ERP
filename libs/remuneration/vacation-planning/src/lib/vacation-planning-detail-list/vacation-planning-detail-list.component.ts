import {Component, Input, OnInit} from '@angular/core';
import {VacationPlanningDetail} from '../vacation-planning-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {Observable, of, zip} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {VacationPlanningDetailService} from "@ss/remuneration/vacation-planning";

@Component({
  selector: 'ss-vacation-planning-detail-list',
  templateUrl: './vacation-planning-detail-list.component.html',
  styleUrls: ['./vacation-planning-detail-list.component.scss']
})
export class VacationPlanningDetailListComponent implements OnInit {
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.add()
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.edit()
    };

    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.delete()
    };

    parentId: number;
    data: VacationPlanningDetail[];
    selectedId: number;
    selectedRow: VacationPlanningDetail = null;

    private _updated = false;
    readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'description',
        'fromDate',
        'toDate',
        'address',
        'reference'
    ];

    constructor(
        public detailSrv: VacationPlanningDetailService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public activatedRoute: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        this.pagination.pageSize = 5;
        this.pagination.onChange = () => this.loadDetailLines().subscribe(x => this.shellSrv.setLoading(false));
    }

    public loadDetailLines(): Observable<VacationPlanningDetail[]> {
        this.shellSrv.setLoading(true);
        this.detailSrv.setParentId(this.parentId);
        return this.detailSrv
            .getPage(this.pagination, null, null);
    }

    ngOnInit() {
        this.shellSrv.setButtons([this.addButton, this.editButton, this.deleteButton]);
        this.route
            .params
            .pipe(map(p => +p['id']),
                tap(id => this.parentId = id),
                switchMap(id => this.loadDetailLines()))
            .subscribe(res => {
                this.data = res;
                this.shellSrv.setLoading(false);
            });
    }

    select(row: VacationPlanningDetail) {
        this.selectedRow = row;
        this.selectedId = row ? row.id : null;
        this.editButton.disabled = !this.selectedId || this.selectedId < 1;
        this.deleteButton.disabled = this.editButton.disabled;
        console.log('selected', row, this.selectedId);
    }

    add() {
        this.router.navigate(['detail', 0], { relativeTo: this.activatedRoute }).then();
    }

    edit() {
        this.router.navigate(['detail', this.selectedId], { relativeTo: this.activatedRoute }).then();
    }

    public delete(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedId && this.selectedId > 0) {
                        const a = this.data.filter(x => x.id === this.selectedId)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.detailSrv.remove(a.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.data = this.data.filter(e => e.id !== this.selectedId);
                                        this.select(null);
                                        this.shellSrv.setLoading(false);
                                    },
                                    error: err => {
                                        this.snackBarSrv.showFailureMessage();
                                        this.shellSrv.setLoading(false);
                                        throw err;
                                    }
                                });
                        }
                    }
                }
            })
    }
}

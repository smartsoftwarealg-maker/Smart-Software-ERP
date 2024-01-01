import { Directive, inject, OnInit } from "@angular/core";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { BaseEntityService } from "@ss/common/api-base-entity";
import { LoginService, PaginationModel, Right } from "@ss/common/api-common";
import { map, Observable, of } from "rxjs";
import { Sort } from "@angular/material/sort";
import { DefaultReportService } from "@ss/common/ui-default-report-component";

@Directive()
export class BaseChildEntityListComponent<T extends { id: number }> implements OnInit {
    private reportForm = 'WorkPermit';
    private defReportSrv = inject(DefaultReportService);
    protected loginSrv = inject(LoginService);
    protected shellSrv  = inject(ShellService);
    protected confirmationSrv  = inject(ConfirmationDialogService);
    protected snackBarSrv  = inject(SnackBarService);
    protected router  = inject(Router);
    protected route  = inject(ActivatedRoute);

    rights: Right = {read: false, edit: false, write: false, delete: false};
    paginator = PaginationModel.newInstance( );
    selectedId = 0;
    selectedRow: T|null = null;
    data$: Observable<T[]> = of([]);
    emptyData$ = this.data$.pipe(map(res => res.length === 0));
    displayedColumns = ['id'];
    isEditable = false;

    constructor(protected detailSrv: BaseEntityService<T>, protected entity: string) {
        this.paginator.onChange = () => this.refresh();
        this.paginator.pageSize = 5;
    }

    ngOnInit(): void {
        this.refresh();
        const rights = this.shellSrv.getEntityRights(this.entity);
        const isManager = this.loginSrv.appCtx.manager;
        this.rights = rights || {write: isManager, edit: isManager, delete: isManager, read: isManager};
        this.isEditable = rights?.edit || false;
    }

    showDetail(id: number) {
        this.router.navigate(
            [id || 0],
            { relativeTo: this.route}).then();
    }

    edit() {
        if (this.selectedId) {
            this.showDetail(this.selectedId);
        }
    }

    public deleteSelected(): void {
        if (this.selectedId > 0) {
            this.confirmationSrv.confirmDelete()
                .subscribe(b => {
                    if (b) {
                        this.shellSrv.setLoading(true);
                        this.detailSrv
                            .remove(this.selectedId)
                            .subscribe({
                                next: () => {
                                    this.data$ = this.data$.pipe(map(res => res.filter(e => e.id !== this.selectedId)));
                                    this.emptyData$ = this.data$.pipe(map(res => res.length === 0));
                                    this.shellSrv.setLoading(false);
                                    this.snackBarSrv.showSuccessMessage();
                                    this.selectedId = 0;
                                },
                                error: err => {
                                    this.snackBarSrv.showFailureMessage();
                                    this.shellSrv.setLoading(false);
                                    throw err;
                                }
                            });
                    }
                });
        }
    }

    protected refresh() {
        this.data$ = this.detailSrv.getPage(this.paginator);
        this.emptyData$ = this.data$.pipe(map(res => res.length === 0));
    }

    selectRow(row: T) {
        this.selectedRow = row;
        this.selectedId = row?.id;
    }

    select(id: number) {
        this.selectedId = id;
    }

    sort(event: Sort) {
        // console.log(event);
        this.detailSrv.sortColumn = event;
        this.refresh();
    }

    public selectReport() {
        this.defReportSrv
            .open(this.shellSrv.getApp(), this.reportForm)
            .subscribe(resp => {
                if (resp.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    public viewReport() {
        this.defReportSrv
            .viewReport(this.reportForm, this.selectedId)
            .subscribe(res => {
                const fileURL = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
                window.open(fileURL, '_blank');
            });
    }
}

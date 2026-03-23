import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationModel, PaginatorPersistenceService, Right} from '@ss/common/api-common';
import {Directive, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Sort} from '@angular/material/sort';

@Directive()
export class BaseEntityListComponent<T extends { id: number; email?: string }>
implements OnInit, OnDestroy {
    private _editable = true;
    private reportForm: string = null;

    subscriptions: Subscription[] = [];

    constructor(
        public entitySrv: BaseEntityService<T>,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public pagPersistSrv: PaginatorPersistenceService,
        public title: string,
    ) {
        this.pagination.copyModel(pagPersistSrv.get(title));
    }

    //
    public readonly pagination = PaginationModel.newInstance();
    //
    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => {
            this.refresh();
        },
    };
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showDetail(0),
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.edit(),
    };
    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.deleteSelected(),
    };

    public defReportButton: ToolbarButton = {
        icon: 'fas fa-folders',
        label: 'COMMON_DEFAULT_REPORT',
        disabled: false, // always false
        visible: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.selectReport(),
    };

    public viewReportButton: ToolbarButton = {
        icon: 'fas fa-print',
        label: 'COMMON_VIEW_REPORT',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.viewReport(),
    };

    public emailReportButton: ToolbarButton = {
        icon: 'fas fa-at',
        label: 'COMMON_EMAIL_REPORT',
        disabled: true,
        visible: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.emailReport(),
    };

    public excelButton: ToolbarButton = {
        icon: 'fas fa-file-excel',
        label: 'COMMON_EXCEL_EXPORT',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.excel(),
    };
    //
    public filter: string;
    public sortBy: string;
    //
    public data: T[] = [];
    public selectedRow: T = null;

    //

    public ngOnInit() {
        const node = this.shellSrv.getNavNodeByRouter();
        this.reportForm =
            node && node.accessRights != undefined ? node.accessRights : null;
        this.defReportButton.visible = this.reportForm != null;
        this.viewReportButton.visible = this.reportForm != null;

        const NO_RIGHTS: Right = {
            read: false,
            write: false,
            edit: false,
            delete: false,
        };

        const FULL_RIGHTS: Right = {
            read: true,
            write: true,
            edit: true,
            delete: true,
        };

        const rights = !node
            ? NO_RIGHTS
            : !node.customerRights && !node.accessRights
                ? FULL_RIGHTS
                : this.shellSrv.getRights(node) || NO_RIGHTS;

        // this.editButton.visible = rights.edit;
        this.addButton.visible &&= rights?.write ?? false;
        this.deleteButton.visible &&= rights?.delete ?? false;
        this.editButton.icon = rights?.edit
            ? 'fas fa-pen'
            : 'fa-solid fa-memo-circle-info';
        this.editButton.label = rights?.edit
            ? 'COMMON_EDIT_SELECTED'
            : 'COMMON_DETAIL';

        this._editable = rights?.edit;

        this.shellSrv.setTitle(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.enableSearch();
        this.shellSrv.setButtons([
            this.refreshButton,
            this.addButton,
            this.editButton,
            this.deleteButton,
            this.viewReportButton,
            this.defReportButton,
            this.excelButton,
            this.emailReportButton,
        ]);
        this.pagination.onChange = () => this.refresh();
        this.filter = this.pagPersistSrv.getSearch(this.title);
        this.shellSrv.searchFormControl.setValue(this.filter);
        // this.refresh();
    }

    public enableSearch(): void {
        this.shellSrv.enableSearch('COMMON_SEARCH', (o) =>
            o.subscribe((f: string) => this.setFilter(f)),
        );
    }

    public setFilter(fltr: string): void {
        this.filter = fltr;
        this.pagination.onChange = () => this.refresh();
        this.refresh();
    }

    /**
     * put other http queries here, like lookups and other things, then tap & store the result manually.
     * returns null if nothing is needed
     */
    public preload(): Observable<T> {
        return of(null);
    }

    protected canShowProcessingStatus(): boolean {
        return true;
    }

    public refresh(callback?: () => void) {
        this.releaseResources();
        this.data = [];
        this.shellSrv.setLoading(this.canShowProcessingStatus());
        (this.preload() || of(null))
            .pipe(switchMap(() => this.getPage()))
            .subscribe({
                next: (data) => {
                    this.finishLoading(data);
                    if (callback) {
                        callback();
                    }
                },
                error: (err) => {
                    this.data = []; // clear everything;
                    this.shellSrv.setLoading(false); // stop the animation
                    throw err;
                },
            });
    }

    // this is created, so we can override the service call whenever we want
    public getPage(): Observable<T[]> {
        return this.entitySrv.getPage(
            this.pagination,
            this.filter,
            this.sortBy,
        );
    }

    public processLoadedData(data: T[]): Observable<T[]> {
        return of(data);
    }

    public finishLoading(data: T[]) {
        this.processLoadedData(data).subscribe((x) => {
            this.data = x;
            this.shellSrv.setLoading(false);
        });
    }

    public ngOnDestroy() {
        this.releaseResources();
        this.shellSrv.reset();
        this.buttonReset();
        this.pagPersistSrv.set(this.title, this.pagination, this.filter);
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    private buttonReset() {
        this.refreshButton.visible = true;
        this.addButton.visible = true;
        this.editButton.visible = true;
        this.deleteButton.visible = true;
        this.viewReportButton.visible = true;
        this.refreshButton.visible = true;
    }

    public releaseResources() {}

    public selectRow(row: T) {
        this.selectedRow = row;
        const id = row ? row.id || 0 : 0;
        this.select(id);
    }

    public select(id: number): void {
        this.selected = id;
        if (id) {
            this.shellSrv.showToolbar(); // The toolbar can disappear when scrolling down
        }
        const itemControlsOn = this.selected != null && this.selected > 0;
        this.editButton.disabled = !itemControlsOn;
        this.deleteButton.disabled = !itemControlsOn;
        this.viewReportButton.disabled = !itemControlsOn;
        this.emailReportButton.disabled =
            !this.selectedRow || !itemControlsOn || !this.selectedRow['email'];
        this.shellSrv.updateShell();
    }

    public edit() {
        if (this.selected) {
            this.showDetail(this.selected);
        }
    }

    public showDetail(id: number): void {
        this.router.navigate([id], { relativeTo: this.route }).then();
    }

    public exit() {
        this.router.navigate(['../..'], { relativeTo: this.route }).then();
    }

    private selectReport() {
        this.defReportSrv
            .open(this.shellSrv.getApp(), this.reportForm)
            .subscribe((resp) => {
                if (resp.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    private viewReport() {
        this.defReportSrv
            .viewReport(this.reportForm, this.selected)
            .subscribe((res) => {
                const fileURL = URL.createObjectURL(
                    new Blob([res], { type: 'application/pdf' }),
                );
                const w = window.open(fileURL, '_blank');
                setTimeout(() => {
                    try {
                        w.document.title = `${this.formReport}_${this.selected}.pdf`;
                    } catch (e: any) {}
                }, 200);
            });
    }

    private emailReport() {
        this.defReportSrv
            .currentCompany()
            .pipe(
                switchMap((comp: any) =>
                    this.defReportSrv.openEmailDlg(
                        comp['email'],
                        this.selectedRow['email'],
                    ),
                ),
                switchMap((res: any) => {
                    if (res && res['from'] && res['to']) {
                        const pwd = res['password'] || '';
                        const subject = res['subject'] || '';
                        const message = res['message'] || '';
                        return this.defReportSrv.emailReport(
                            'exchange',
                            this.selected,
                            this.reportForm,
                            res['from'],
                            res['to'],
                            pwd,
                            subject,
                            message,
                        );
                    }
                    return of([]);
                }),
            )
            .subscribe((res) => {
                if (!res) {
                    this.snackBarSrv.showMessage('COMMON_EMAIL_SENT');
                }
            });
    }

    public excel() {
        this.entitySrv.excel(this.filter).subscribe((blob) => {
            if (blob && blob.size > 100) {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = this.entitySrv.constructor.name + '.xlsx';
                link.click();
                setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
            }
        });
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete().subscribe((b) => {
            if (b) {
                if (this.selected && this.selected > 0) {
                    const a = this.data.filter(
                        (x) => x.id === this.selected,
                    )[0];
                    if (a && a.id) {
                        this.shellSrv.setLoading(true);
                        this.entitySrv.remove(a.id).subscribe({
                            next: () => {
                                this.snackBarSrv.showSuccessMessage();
                                this.refresh();
                            },
                            error: (err) => {
                                this.snackBarSrv.showFailureMessage();
                                this.shellSrv.setLoading(false);
                                throw err;
                            },
                        });
                    }
                }
            }
        });
    }

    sort(event: Sort) {
        this.entitySrv.sortColumn = event;
        this.refresh();
    }

    get editable() {
        return this._editable;
    }

    set editable(b: boolean) {
        this._editable = b;
    }

    get formReport(): string {
        return this.reportForm;
    }

    get selected(): number {
        return this.entitySrv.selectedId();
    }

    set selected(id: number) {
        this.entitySrv.selectedId.set(id);
    }
}

import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationModel, PaginatorPersistenceService, Right} from '@ss/common/api-common';
import {Directive, OnDestroy, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityService} from "@ss/common/api-base-entity";

@Directive()
export class BaseEntityListComponent<T extends { id: number, email?: string }> implements OnInit, OnDestroy {
    private reportForm: string = null;

    constructor(public entitySrv: BaseEntityService<T>,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public pagPersistSrv: PaginatorPersistenceService,
        public title: string) {
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
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => {
            this.refresh();
        }
    };
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showDetail(0)
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
        click: () => this.deleteSelected()
    };

    public defReportButton: ToolbarButton = {
        icon: 'fas fa-folders',
        label: 'COMMON_DEFAULT_REPORT',
        disabled: false, // always false
        visible: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.selectReport()
    };

    public viewReportButton: ToolbarButton = {
        icon: 'fas fa-print',
        label: 'COMMON_VIEW_REPORT',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.viewReport()
    };

    public emailReportButton: ToolbarButton = {
        icon: 'fas fa-at',
        label: 'COMMON_EMAIL_REPORT',
        disabled: true,
        visible: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.emailReport()
    };
    //
    public filter: string;
    public sortBy: string;
    //
    public data: T[] = [];
    public selected = 0;
    public selectedRow: T = null;

    //

    public ngOnInit() {
        const node = this.shellSrv.getNavNodeByRouter(this.router);
        this.reportForm = node && node.accessRights != undefined? node.accessRights : null;
        this.defReportButton.visible = this.reportForm != null;
        this.viewReportButton.visible = this.reportForm != null;

        const rights = !node || !node.accessRights? {
            read: true,
            write: true,
            edit: true,
            delete: true
        } as Right : this.shellSrv.getRights(node.accessRights);

        this.editButton.visible = rights.edit;
        this.addButton.visible = rights.write;
        this.deleteButton.visible = rights.delete;

        this.shellSrv.setTitle(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.enableSearch();
        this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton, this.viewReportButton, this.defReportButton, this.emailReportButton]);
        this.pagination.onChange = () => this.refresh();
        this.refresh();
    }

    public enableSearch(): void {
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe((f: string) => this.setFilter(f)));
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
    public preload(): Observable<any> {
        return null;
    }

    public refresh(callback?: () => void) {
        this.releaseResources();
        this.data = [];
        this.shellSrv.setLoading(true);
        this.select(0);
        const a = this.preload();
        const b = this.getPage();
        const c: Observable<T[]> = a == null
            ? b
            : a.pipe(switchMap(() => b));
        c.subscribe({
                next:
                    data => {
                        this.finishLoading(data);
                        if (callback) {
                            callback();
                        }
                    },
                error: err => {
                    this.data = []; // clear everything;
                    this.shellSrv.setLoading(false); // stop the animation
                    throw err;
                }
            }
        );
    }

    // this is created so we can override the service call whenever we want
    public getPage() {
        return this.entitySrv.getPage(this.pagination, this.filter, this.sortBy);
    }

    public processLoadedData(data: T[]): Observable<T[]> {
        return of(data);
    }

    public finishLoading(data: T[]) {
        this.processLoadedData(data)
            .subscribe(x => {
                this.data = x;
                this.shellSrv.setLoading(false);
            });
    }

    public ngOnDestroy() {
        this.releaseResources();
        this.shellSrv.reset();
        this.pagPersistSrv.set(this.title, this.pagination);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public releaseResources() {
    }

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
        // to avoid calling up shellUpdate twice, i will replace the next 2 lines with a better code
        // this.shellSrv.setButtonEnabled(this.editButton, itemControlsOn);
        // this.shellSrv.setButtonEnabled(this.deleteButton, itemControlsOn);
        // this removes calling updateShell twice
        this.editButton.disabled = !itemControlsOn;
        this.deleteButton.disabled = !itemControlsOn;
        this.viewReportButton.disabled = !itemControlsOn;
        this.emailReportButton.disabled = !this.selectedRow || !itemControlsOn || !this.selectedRow['email'];
        this.shellSrv.updateShell();
    }

    public edit() {
        if (this.selected) {
            this.showDetail(this.selected);
        }
    }

    public showDetail(id: number): void {
        this.router.navigate([id], { relativeTo: this.route })
            .then();
    }

    private selectReport() {
        this.defReportSrv
            .open(this.shellSrv.getApp(), this.reportForm)
            .subscribe(res => {
                if (typeof res === 'string') {
                    this.defReportSrv
                        .setUserReport(this.reportForm, res)
                        .subscribe(resp => {
                            if (resp.count > 0) {
                                this.snackBarSrv.showSuccessMessage();
                            }
                        })
                }
            });
    }

    private viewReport() {
        this.defReportSrv
            .viewReport(this.reportForm, this.selected)
            .subscribe(res => {
                const fileURL = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
                window.open(fileURL, '_blank');
            });
    }

    private emailReport() {
        this.defReportSrv
            .currentCompany()
            .pipe(switchMap((comp: any) => this.defReportSrv.openEmailDlg(comp['email'], this.selectedRow['email'])),
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
                            message);
                    }
                    return of([]);
                })).subscribe(res => {
                    if (!res) {
                        this.snackBarSrv.showMessage('COMMON_EMAIL_SENT');
                    }
                });
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selected && this.selected > 0) {
                        const a = this.data.filter(x => x.id === this.selected)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.entitySrv.remove(a.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.refresh();
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

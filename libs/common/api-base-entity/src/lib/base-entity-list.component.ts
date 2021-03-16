import { BaseEntityService } from './base-entity.service';
import { ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel } from '@ss/common/ui-pagination';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Directive()
export class BaseEntityListComponent<T extends { id: number }> implements OnInit, OnDestroy {

    constructor(public entitySrv: BaseEntityService<T>,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public title: string) {
    }

    //
    public readonly pagination = PaginationModel.newInstance();
    //
    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: false,
        click: () => {
            this.refresh();
        }
    };
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: false,
        click: () => this.showDetail(0)
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: false,
        click: () => this.edit()
    };
    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: false,
        click: () => this.deleteSelected()
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
        this.shellSrv.setTitle(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe(f => this.setFilter(f)));
        this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton]);
        this.pagination.onChange = () => this.refresh();
        this.refresh();
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
        c.subscribe(
            data => {
                this.finishLoading(data);
                if (callback) {
                    callback();
                }
            },
            err => {
                this.data = []; // clear everything;
                this.shellSrv.setLoading(false); // stop the animation
                throw err;
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
    }

    public releaseResources() {
    }

    public selectRow(row: T) {
        this.selectedRow = row;
        const id = row ? row.id || 0 : 0;
        this.select(id)
    }
    public select(id: number): void {
        if (id === this.selected) {
            this.selected = null;
        } else {
            this.selected = id;
            this.shellSrv.showToolbar(); // The toolbar can disappear when scrolling down
        }
        const itemControlsOn = this.selected != null && this.selected > 0;
        this.shellSrv.setButtonEnabled(this.editButton, itemControlsOn);
        this.shellSrv.setButtonEnabled(this.deleteButton, itemControlsOn);
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

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selected && this.selected > 0) {
                        const a = this.data.filter(x => x.id === this.selected)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.entitySrv.remove(a.id)
                                .subscribe(
                                    () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.refresh();
                                    },
                                    err => {
                                        this.snackBarSrv.showFailureMessage();
                                        this.shellSrv.setLoading(false);
                                        throw err;
                                    }
                                );
                        }
                    }
                }
            })
    }

}

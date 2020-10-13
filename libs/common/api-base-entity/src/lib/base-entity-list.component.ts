import {BaseEntityService} from './base-entity.service';
import {ShellService, ToolbarButton, SnackBarService} from '@ss/common/ui-shell';
import {Router, ActivatedRoute} from '@angular/router';
import {PaginationModel} from '@ss/common/ui-pagination';
import {OnInit, OnDestroy, Directive} from '@angular/core';
import {DETAIL_URL} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Directive()
export class BaseEntityListComponent<T extends { id: number }> implements OnInit, OnDestroy {

    constructor(public entitySrv: BaseEntityService<T>,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public title: string) {
    }

    //
    public readonly pagination = PaginationModel.newInstance();
    //
    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: false,
        click: () => {
            this.refresh();
        }
    };
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: false,
        click: () => this.showDetail(0)
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: false,
        click: () => this.edit()
    };
    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'DEL_SELECTED',
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

    //

    public ngOnInit() {
        this.shellSrv.setTilte(this.title);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.enableSearch('SEARCH', o => o.subscribe(f => this.setFilter(f)));
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

    public refresh() {
        this.releaseResources();
        this.data = [];
        this.shellSrv.setLoading(true);
        this.select(0);
        const a = this.preload();
        const b = this.entitySrv.getPage(
            this.pagination,
            this.filter,
            this.sortBy
        );
        const c: Observable<T[]> = a == null
            ? b
            : a.pipe(switchMap(() => b));
        c.subscribe(
            data => this.finishLoading(data),
            err => {
                this.data = []; // clear everything;
                this.shellSrv.setLoading(false); // stop the animation
                throw err;
            }
        );
    }

    public processLoadedData(data: T[]): T[] {
        return data;
    }

    public finishLoading(data: T[]) {
        this.data = this.processLoadedData(data);
        this.shellSrv.setLoading(false);
    }

    public ngOnDestroy() {
        this.releaseResources();
        this.shellSrv.reset();
    }

    public releaseResources() {
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
        const params = {
            id: id
        };
        this.router.navigate(['../' + DETAIL_URL], {relativeTo: this.route, queryParams: params})
            .then();
    }

    public deleteSelected(): void {
        if (this.selected && this.selected > 0) {
            const a = this.data.filter(a => a.id === this.selected)[0];
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

}

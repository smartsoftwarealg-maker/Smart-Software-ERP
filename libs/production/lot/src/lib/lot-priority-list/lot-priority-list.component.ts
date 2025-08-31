import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    KeepOnToolbar,
    ShellService,
    ToolbarButton,
} from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {
    MaterialModule,
    PaginationModel,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Lot, LotsService } from '@ss/common/api-lookup';
import {
    ArticleAutoCompleteModel,
    ArticleService, Location, LocationService
} from '@ss/master-data/api-article';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-production-priority-list',
    templateUrl: './lot-priority-list.component.html',
    styleUrl: './lot-priority-list.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        PaginationComponent,
        UiAutoCompleteComponent,
    ],
})
export class LotPriorityListComponent implements OnInit, OnDestroy {
    private lotsSrv = inject(LotsService);
    private locationSrv = inject(LocationService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private pagPersistSrv = inject(PaginatorPersistenceService);
    private articleSrv = inject(ArticleService);

    articleLookup = new ArticleAutoCompleteModel(this.articleSrv);
    public refFC = new FormControl('');
    private ref = ''; // this added to make the search happen only when select
    private clickEdit = false;
    public filter: string;
    public sortBy: string;
    public selected = 0;
    public selectedRow: Lot;
    public data: Location[] = [];
    public readonly pagination = PaginationModel.newInstance();

    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => {
            this.refresh();
        },
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.edit(),
    };

    ngOnInit() {
        this.shellSrv.setTitle('PROD_LOT_PRIORITY');
        this.shellSrv.setGoBackPath('..', this.route);
        this.enableSearch();
        this.refFC.setValue(this.lotsSrv.getReference);
        this.ref = this.lotsSrv.getReference;
        this.shellSrv.setButtons([this.refreshButton, this.editButton]);
        this.pagination.pageSize = 15;
        this.pagination.onChange = () => this.refresh();
        this.shellSrv.searchFormControl.setValue(null);
    }

    displayedColumns = [
        'storeName',
        'reference',
        'description',
        'expirationDate',
        'analysisDate',
        'stock',
        'priority',
    ];

    public edit() {
        if (this.selected) {
            this.lotsSrv.setReference(this.ref);
            this.clickEdit = true;
            this.router
                .navigate([this.selected], {
                    relativeTo: this.route,
                    replaceUrl: true,
                })
                .then();
        }
    }

    search(): void {
        if (this.refFC.getRawValue()) {
            this.ref = this.refFC.getRawValue();
            this.refFC.setValue(null);
            this.refresh();
        }
    }

    public refresh() {
        this.data = [];
        this.shellSrv.setLoading(true);
        this.selected = 0;
        this.locationSrv
            .getLots(
                this.ref,
                this.pagination,
                this.filter,
                null,
                null,
                null,
                null,
                this.sortBy,
            )
            .subscribe({
                next: (res) => {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.shellSrv.setLoading(false);
                },
                error: (err) => {
                    this.data = []; // clear everything;
                    this.shellSrv.setLoading(false); // stop the animation
                    throw err;
                },
            });
    }

    public getPage() {
        return this.lotsSrv.getPage(this.pagination, this.filter, this.sortBy);
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

    public selectRow(row: Lot) {
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
        this.shellSrv.updateShell();
    }

    public ngOnDestroy() {
        this.shellSrv.reset();
        this.pagPersistSrv.set('', this.pagination, this.filter);
        if (!this.clickEdit) {
            this.lotsSrv.setReference(null);
        }
    }
}

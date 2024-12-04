import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MaterialModule, PaginationModel } from "@ss/common/api-common";
import { SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { combineLatest, map, of, Subscription, switchMap, zip } from 'rxjs';
import {LTMMatterTest} from '@ltm/ltm-api';
import {LtmMatterTestService} from '@ltm/ltm-api';
import {Sort} from '@angular/material/sort';
import { LtmMatterService } from '@ltm/ltm-api';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-matter-test-list',
    templateUrl: './ltm-matter-test-list.component.html',
    styleUrls: ['./ltm-matter-test-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        TranslateDirective
    ],
})
export class LtmMatterTestListComponent implements OnInit {
    private matterSrv  = inject(LtmMatterService);
    private subscriptions: Subscription | null = null;

    selected: LTMMatterTest = null;
    data: LTMMatterTest[] = [];
    pagination = PaginationModel.newInstance({ pageSize: 10, page: 1, elementCount: 0});

    readonly isEditable = this.matterSrv.editable;
    readonly searchText = new FormControl<string>('');
    selection = signal<number[]>([]);

    displayedColumns = [
        'orderNo',
        'testDescription',
        'periodDescription',
        'minValue',
        'maxValue',
        'selection'
    ];

    constructor(
        private entitySrv: LtmMatterTestService,
        private snackBarSrv: SnackBarService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationSrv: ConfirmationDialogService,
        private destroyRef: DestroyRef) {
        this.pagination.onChange = () => this.refresh();
        destroyRef.onDestroy(() => this.subscriptions?.unsubscribe());
    }

    showDetail(id: number) {
        this.router.navigate(['detail', id], {relativeTo: this.route}).then();
    }

    edit() {
        if (this.selected?.id > 0) {
            this.showDetail(this.selected?.id || 0);
        }
    }

    deleteSelected() {
        const deletion = combineLatest(this.selection().map(id => this.entitySrv.remove(id)))
            .pipe(map(res => res.reduce((a, b) => { return { count: a.count + b.count } })));

        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? deletion : of({count: -1})),
                  switchMap(res => res.count > 0 ? this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize) : of(null)))
            .subscribe(res => {
                if (res && res.itemCount != null) {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.snackBarSrv.showSuccessMessage();
                    this.selection.set([]);
                    this.selected = null;
                }
            });
    }

    select(matter: LTMMatterTest) {
        this.selected = this.entitySrv.getParentId() > 0? matter : null;
    }

    ngOnInit(): void {
        this.refresh();
        this.subscriptions = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged())
            .subscribe(res => this.refresh());
    }

    refresh() {
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize, this.searchText.value || '')
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    sortData(s: Sort) {
        this.entitySrv.sortColumn = s;
        this.refresh();
    }

    addId(id: number) {
        if (this.selection().indexOf(id) < 1) {
            this.selection.update(values => [...values, id]);
        } else {
            this.selection.update(values => [...values.filter(_ => _ !== id)]);
        }
    }

    addAll(event: MatCheckboxChange) {
        this.selection.set(event.checked ? this.data.map(d => d.id) : []);
    }

    isSelected(id: number) {
        return this.selection().indexOf(id) > -1;
    }
}

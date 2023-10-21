import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import {PaginationModel} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { of, Subscription, switchMap } from "rxjs";
import {LTMMatterTest} from '../ltm-api';
import {LtmMatterTestService} from '../services/ltm-matter-test.service';
import {Sort} from '@angular/material/sort';
import { LtmMatterService } from "../services/ltm-matter.service";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
    selector: 'ss-ltm-matter-test-list',
    templateUrl: './ltm-matter-test-list.component.html',
    styleUrls: ['./ltm-matter-test-list.component.scss'],
})
export class LtmMatterTestListComponent implements OnInit, OnDestroy {
    private matterSrv  = inject(LtmMatterService);
    private subscriptions: Subscription | null = null;

    selected: LTMMatterTest = null;
    data: LTMMatterTest[] = [];
    pagination = PaginationModel.newInstance({ pageSize: 10, page: 1, elementCount: 0});

    readonly isEditable = this.matterSrv.editable;
    readonly searchText = new FormControl<string>('');

    displayedColumns = [
        'testDescription',
        'periodDescription',
        'minValue',
        'optValue',
        'maxValue'
    ];

    constructor(
        private entitySrv: LtmMatterTestService,
        private snackBarSrv: SnackBarService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationSrv: ConfirmationDialogService) {
        this.pagination.onChange = () => this.refresh();
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
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
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.entitySrv.remove(this.selected?.id) : of({count: -1})),
                switchMap(res => res.count > 0 ? this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize) : of(null)))
            .subscribe(res => {
                if (res && res.itemCount != null) {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.snackBarSrv.showSuccessMessage();
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
}

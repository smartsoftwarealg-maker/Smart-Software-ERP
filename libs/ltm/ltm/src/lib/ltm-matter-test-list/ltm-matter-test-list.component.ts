import { Component, DestroyRef, inject, OnDestroy, OnInit } from "@angular/core";
import { MaterialModule, PaginationModel } from "@ss/common/api-common";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { of, Subscription, switchMap } from "rxjs";
import {LTMMatterTest} from '../ltm-api';
import {LtmMatterTestService} from '../services/ltm-matter-test.service';
import {Sort} from '@angular/material/sort';
import { LtmMatterService } from "../services/ltm-matter.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";

@Component({
    selector: 'ss-ltm-matter-test-list',
    templateUrl: './ltm-matter-test-list.component.html',
    styleUrls: ['./ltm-matter-test-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
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

    displayedColumns = [
        'orderNo',
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

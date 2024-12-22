import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import {Match, ProcessedCheckService} from '@ss/treasury/api-checks';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {HttpService, PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {BankService} from '@ss/administration/api-bank';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from "../../../../../common/ui-auto-complete/src/lib/auto-complete.component";
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { MatCheckbox } from "@angular/material/checkbox";
import { PaginationComponent } from "../../../../../common/ui-pagination/src/lib/pagination.component";
import { DecimalPipe, DatePipe } from "@angular/common";

@Component({
    selector: 'ss-check-matching-list',
    templateUrl: './check-matching-list.component.html',
    styleUrls: ['./check-matching-list.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        TranslateDirective,
        UiAutoCompleteComponent,
        FormsModule,
        ReactiveFormsModule,
        MatRadioGroup,
        MatRadioButton,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatCheckbox,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DecimalPipe,
        DatePipe,
    ],
})
export class CheckMatchingListComponent implements OnInit, OnDestroy {
    private bankSrv = inject(BankService);
    private filter: string = null;
    bankLookup = new DefaultAutoCompleteModel(this.bankSrv);
    bankCtrl   = new FormControl<number>(0);

    match = true;
    data: Match[] = [];

    pagination = PaginationModel.newInstance();
    displayedColumns = [
        'bank',
        'number',
        'date',
        'amount',
    ];

    constructor(
        private route: ActivatedRoute,
        private shellSrv: ShellService,
        public checkSrv: ProcessedCheckService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public pagPersistSrv: PaginatorPersistenceService) {
        this.pagination.pageSize = 10;
        this.pagination.onChange = () => this.refresh();
    }


    ngOnInit() {
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe((f: string) => this.searchFilter(f)));
        this.refresh();
        this.shellSrv.setGoBackPath('../..', this.route);
    }

    ngOnDestroy() {
        this.shellSrv.disableSearch(false);
    }

    private searchFilter(filter: string) {
        this.filter = filter;
        this.refresh();
    }

    refresh() {
        const obs = this.match?
            this.checkSrv.matched(this.bankCtrl.value, this.pagination.page, this.pagination.pageSize, this.filter):
            this.checkSrv.nonMatched(this.bankCtrl.value, this.pagination.page, this.pagination.pageSize, this.filter);

        obs.subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    toggle(e: any) {
        this.match = !this.match;
        this.refresh();
    }
}

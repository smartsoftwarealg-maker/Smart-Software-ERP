import {Component, OnDestroy, OnInit} from '@angular/core';
import {Match, ProcessedCheckService} from '@ss/treasury/api-checks';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {HttpService, PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {BankService} from '@ss/administration/api-bank';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'ss-check-matching-list',
    templateUrl: './check-matching-list.component.html',
    styleUrls: ['./check-matching-list.component.scss'],
})
export class CheckMatchingListComponent implements OnInit, OnDestroy {
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
        private bankSrv: BankService,
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

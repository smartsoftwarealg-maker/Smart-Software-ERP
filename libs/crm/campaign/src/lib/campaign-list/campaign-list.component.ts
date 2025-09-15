import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel } from '@ss/common/api-common';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { CompaignService } from '../compaign.service';
import { Campaign, STATUS, CTYPES } from '../campaign.api';
import { DatePipe } from '@angular/common';
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'ss-campaign-list',
    templateUrl: 'campaign-list.html',
    styleUrls: ['campaign-list.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DatePipe,
        MatButton,
        TranslatePipe,
    ],
})
export class CampaignListComponent implements OnInit, OnDestroy {
    #entitySrv = inject(CompaignService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);

    pagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 15,
        elementCount: 0,
    });
    selectedRow: Campaign | null = null;
    displayedColumns = [
        'name',
        'cType',
        'status',
        'description',
        'audienceSize',
        'startDate',
        'endDate',
        'owner',
        'budget',
    ];

    data: Campaign[] = [];
    loading = false;

    constructor() {
        this.pagination.onChange = () => this.refresh();
    }

    ngOnInit(): void {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('CRM_CAMPAIGNS');
        this.refresh();
    }

    sort(event: Sort) {
        this.#entitySrv.sortColumn = event;
        this.refresh();
    }

    selectRow(row: Campaign): void {
        this.selectedRow = row;
    }

    private refresh(): void {
        this.loading = true;
        this.#entitySrv.getPage(this.pagination).subscribe((res) => {
            this.data = res;
            this.loading = false;
        });
    }

    edit(campaign: Campaign): void {
        this.showDetail(campaign.id);
    }

    public goBack(): void {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    add() {
        this.showDetail(0);
    }

    search() {
        console.log('Search leads');
    }

    public showDetail(id: number): void {
        this.#router.navigate([id], { relativeTo: this.#route }).then();
    }

    ngOnDestroy() {
        this.#shellSrv.reset();
    }

    getStatus(status: string) {
        return this.STATUS.find((x) => x.value == status).description;
    }

    getCType(type: string) {
        return this.CTYPES.find((x) => x.value == type).description;
    }

    protected readonly CTYPES = CTYPES;
    protected readonly STATUS = STATUS;
}

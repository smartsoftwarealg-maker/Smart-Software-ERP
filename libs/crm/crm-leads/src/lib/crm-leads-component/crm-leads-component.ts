import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRMLeadsService } from '../crm-lead.service';
import { PaginationModel } from '@ss/common/api-common';
import { CRMLead } from '../lead-api';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ss-crm-leads-component',
    imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, PaginationComponent, TranslateDirective, MatSort, MatHeaderCellDef, MatIconButton, MatTooltip, TranslatePipe, MatButton],
    templateUrl: './crm-leads-component.html',
    styleUrl: './crm-leads-component.scss',
})
export class CrmLeadsComponent implements OnInit {
    #entitySrv = inject(CRMLeadsService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);

    pagination = PaginationModel.newInstance({page: 1, pageSize: 15, elementCount: 0})
    selectedRow: CRMLead|null = null;
    displayedColumns = ['btn', 'lastName', 'firstName', 'email', 'phone', 'status', 'createdAt'];
    data: CRMLead[] = [];

    constructor() {
        this.pagination.onChange = () => this.refresh();
    }

    ngOnInit(): void {
        this.refresh();
    }

    sort(event: Sort) {
        this.#entitySrv.sortColumn = event;
        this.refresh();
    }

    selectRow(row: CRMLead): void {
        this.selectedRow = row;
    }

    private refresh(): void {
        this.#entitySrv
            .getPage(this.pagination)
            .subscribe(res => this.data = res);
    }

    edit(lead: CRMLead): void {
        console.log('Edit lead:', lead);
    }

    add() {
        this.showDetail(0);
    }

    search() {
        console.log('Search leads');
    }

    public showDetail(id: number): void {
        this.#router.navigate([id], {relativeTo: this.#route}).then();
    }
}

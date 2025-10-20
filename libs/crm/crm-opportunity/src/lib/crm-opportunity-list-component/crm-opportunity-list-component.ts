import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRMOpportunityService } from '../crm-opportunity.service';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import { CRMOpportunity } from '../crm-opportunity-api';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ShellService } from '@ss/common/ui-shell';
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";

@Component({
    selector: 'ss-crm-opportunity-component',
    imports: [
        CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        PaginationComponent,
        TranslateDirective,
        MatSort,
        MatHeaderCellDef,
        TranslatePipe,
        MatButton,
        MatRadioGroup,
        MatRadioButton,
    ],
    templateUrl: './crm-opportunity-list-component.html',
    styleUrl: './crm-opportunity-list-component.scss',
    standalone: true,
})
export class CrmOpportunityListComponent implements OnInit, OnDestroy {
    #loginSrv = inject(LoginService);
    #entitySrv = inject(CRMOpportunityService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);

    isResponsible = signal(this.#loginSrv.appCtx.responsible);

    pagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 15,
        elementCount: 0,
    });
    selectedRow: CRMOpportunity | null = null;
    displayedColumns = [
        'name',
        'owner',
        'partner',
        'campaign',
        'primaryContact',
        'description',
        'amount',
        'closeDate',
    ];
    data: CRMOpportunity[] = [];
    loading = false;

    constructor() {
        this.pagination.onChange = () => this.refresh();
    }

    ngOnInit(): void {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('CRM_OPPORTUNITIES');
        this.#entitySrv.setParentId(this.#loginSrv.appCtx.id||0);
        this.refresh();
    }

    sort(event: Sort) {
        this.#entitySrv.sortColumn = event;
        this.refresh();
    }

    selectRow(row: CRMOpportunity): void {
        this.selectedRow = row;
    }

    private refresh(): void {
        this.loading = true;
        this.#entitySrv.getPage(this.pagination).subscribe((res) => {
            this.data = res;
            this.loading = false;
        });
    }

    edit(lead: CRMOpportunity): void {
        //    console.log('Edit lead:', lead);
        this.showDetail(lead.id);
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

    onRadioChange(event: MatRadioChange) {
        this.#entitySrv.setParentId(+event.value === 1? this.#loginSrv.appCtx.id : 0);
        this.refresh();
    }
}

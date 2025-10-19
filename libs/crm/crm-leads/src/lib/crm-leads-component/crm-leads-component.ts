import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRMLeadsService } from '../crm-lead.service';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import { CRMLead } from '../lead-api';
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
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import {ShellService} from '@ss/common/ui-shell';
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {sign} from "chart.js/helpers";


@Component({
    selector: 'ss-crm-leads-component',
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
        MatIconButton,
        MatTooltip,
        TranslatePipe,
        MatButton,
        MatRadioGroup,
        MatRadioButton,
    ],
    templateUrl: './crm-leads-component.html',
    styleUrl: './crm-leads-component.scss',
    standalone: true,
})
export class CrmLeadsComponent implements OnInit, OnDestroy {
    #loginSrv = inject(LoginService);
    #entitySrv = inject(CRMLeadsService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);
    isResponsible = signal(false);
    pagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 15,
        elementCount: 0,
    });
    selectedRow: CRMLead | null = null;
    displayedColumns = [
        'description',
        'addressLine1',
        'email',
        'phone',
        'company',
        'jobTitle',
        'createdAt',
        'source',
        'ownerDescription',
        'priority',
        'estimatedValue',
        'status',
        'score',
    ];
    data: CRMLead[] = [];
    loading = false;

    constructor() {
        this.pagination.onChange = () => this.refresh();
        this.#entitySrv.setParentId(0);
    }

    ngOnInit(): void {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('CRM_LEADS');
        this.#entitySrv.setParentId(this.#loginSrv.appCtx.id||0);
        this.isResponsible.set(this.#loginSrv.appCtx.responsible);
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
        this.loading = true;
        this.#entitySrv.getPage(this.pagination).subscribe((res) => {
            this.data = res;
            this.loading = false;
        });
    }

    edit(lead: CRMLead): void {
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

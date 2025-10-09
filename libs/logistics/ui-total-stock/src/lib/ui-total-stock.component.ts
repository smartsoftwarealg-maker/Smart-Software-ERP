import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginService, PaginationModel } from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageService} from '@ss/common/api-common';
import {TotalStockService} from './services/total-stock.service';
import {TotalStock} from './total-stock';
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
    MatRow
} from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-stock-info',
    templateUrl: './ui-total-stock.component.html',
    styleUrls: ['./ui-total-stock.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
})
export class UiTotalStockComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private stockSrv = inject(TotalStockService);
    private loginSrv = inject(LoginService);
    articleReference: string;
    readonly pagination = PaginationModel.newInstance();
    data: TotalStock[] = [];
    displayedColumns = ['reference', 'description', 'stock'];

    ngOnInit(): void {
        this.pagination.onChange = () => this.load();
        this.route.queryParams.subscribe(params => {
            this.articleReference = params['articleReference'];
            this.load();
        });
    }

    load(): void {
        this.stockSrv.load(this.pagination, null, null, this.articleReference)
            .subscribe((x: TotalStock[]) =>  {
                this.data = x;
            });
    }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Source } from '../../../../ui-document-sources/src/lib/document-sources/document-sources.api';
import {
    DocumentSourcesService
} from '../../../../ui-document-sources/src/lib/document-sources/document-sources.service';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@ss/master-data/api-article';
import { LanguageService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { TransactionlineQuantitiesService } from './transactionline-quantities.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Quantities } from './transactionie-quantities-api';

@Component({
    selector: 'ss-ui-transactionline-quantities',
    imports: [CommonModule, MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatSort, MatSortHeader, MatTable, TranslateDirective, MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef],
    templateUrl: './ui-transactionline-quantities.component.html',
    styleUrl: './ui-transactionline-quantities.component.scss',
})
export class UiTransactionlineQuantitiesComponent implements OnInit {
    displayedColumns = signal(['reference', 'description', 'qtyOrdered', 'qtySatisfied', 'qtyInvoiced',   'qtyReturned', 'pPrice']);
    selectedId = signal(0);
    data$: Observable<Quantities[]> = of([]);

    constructor(public sourceSrv: TransactionlineQuantitiesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const detailId = +params['detailId'] || 0;
            this.sourceSrv.setParentId(detailId);
            this.loadTotal();
        });
    }

    loadTotal() {
        this.data$ = this.sourceSrv.getData();
    }


    select(id: number) {
        this.selectedId.set(id);
    }

    sort(event: Sort) {  }
}

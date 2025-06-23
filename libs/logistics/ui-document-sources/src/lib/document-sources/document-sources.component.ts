import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@ss/master-data/api-article';
import { LanguageService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DocumentSourcesService } from './document-sources.service';
import { Observable, of } from 'rxjs';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';

import { Source } from './document-sources.api';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-document-sources',
    standalone: true,
    imports: [CommonModule, MatCell, TranslateDirective, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatSort, MatSortHeader, MatTable, MatHeaderRowDef, MatHeaderCellDef, MatRowDef, MatCellDef],
    templateUrl: './document-sources.component.html',
    styleUrl: './document-sources.component.scss',
})
export class DocumentSourcesComponent implements OnInit {
    displayedColumns = signal(['document', 'number', 'date', 'qtyOrdered', 'qtySatisfied', 'qtyInvoiced', 'qtyReturned']);
    selectedId = signal(0);
    data$: Observable<Source[]> = of([]);

    constructor(public sourceSrv: DocumentSourcesService,
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

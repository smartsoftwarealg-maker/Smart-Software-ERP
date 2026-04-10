import {Component, OnInit,} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService, Article } from '@ss/master-data/api-article';
import { Mark } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { Observable } from 'rxjs';
import {LookupsService, Vat} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

import { ArticleStoreComponent } from '../../../article-store/src/lib/article-store.component';

@Component({
    selector: 'ss-store-assignment',
    styleUrls: ['./article-store-assignment.component.scss'],
    templateUrl: './article-store-assignment.component.html',
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        ArticleStoreComponent,
    ],
})
export class ArticleStoreAssignmentComponent
    extends BaseEntityListComponent<Article>
    implements OnInit
{
    displayedColumns = [
        'reference',
        'description2',
        // 'price',
        // 'vat',
        'mark',
    ];

    marks: { [id: number]: string };
    vats: { [id: number]: number };

    constructor(
        public articleSrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            articleSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'STOCK_STORE_ASSIGNMENT',
        );
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getMarks().pipe(
            tap((x) => this.onMarksLoaded(x)),
            // switchMap(() => this.lookupsSrv.getVats()),
            // tap(x => this.onVatsLoaded(x))
        );
    }

    onMarksLoaded(data: Mark[]) {
        this.marks = {};
        data.forEach((m) => (this.marks[m.id] = m.description));
    }

    protected preInit(): Observable<any> {
        return super.preInit()
            .pipe(tap(() => {
                this.deleteButton.visible = false;
                this.addButton.visible = false;
                this.editButton.visible = false;
            }));
    }

    // onVatsLoaded(data: Vat[]) {
    //     this.vats = {};
    //     data.forEach(m => this.vats[m.id] = m.value);
    // }
}

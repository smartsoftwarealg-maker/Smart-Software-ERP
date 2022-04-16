import {Component, OnInit,} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService, Article } from '@ss/stock/api-article';
import { Mark } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { Observable } from 'rxjs';
import {LookupsService, Vat} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-article-list',
    styleUrls: ['./article-store-assignment.component.scss'],
    templateUrl: './article-store-assignment.component.html'
})
export class ArticleStoreAssignmentComponent extends BaseEntityListComponent<Article> implements OnInit {

    displayedColumns = [
        'reference',
        'description2',
        // 'price',
        // 'vat',
        'mark',
    ];

    marks: { [id: number]: string; };
    vats: { [id: number]: number; };

    constructor(
        public articleSrv: ArticleService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_STORE_ASSIGNMENT');
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getMarks()
            .pipe(
                tap(x => this.onMarksLoaded(x)),
                // switchMap(() => this.lookupsSrv.getVats()),
                // tap(x => this.onVatsLoaded(x))
            );
    }

    onMarksLoaded(data: Mark[]) {
        this.marks = {};
        data.forEach(m => this.marks[m.id] = m.description);
    }

    ngOnInit() {
        super.ngOnInit();
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        this.editButton.visible = false;
    }

    // onVatsLoaded(data: Vat[]) {
    //     this.vats = {};
    //     data.forEach(m => this.vats[m.id] = m.value);
    // }

}

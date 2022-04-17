import {Component, OnInit,} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService, Article } from '@ss/stock/api-article';
import {Mark, Unit} from '@ss/common/api-lookup';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Observable, of, zip} from 'rxjs';
import {LookupsService, Vat} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ImageModel} from '@ss/common/ui-image-input';
import {HttpService, PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-article-list',
    styleUrls: ['./article-list.component.scss'],
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent extends BaseEntityListComponent<Article> implements OnInit {

    displayedColumns = [
        'image',
        'reference',
        'description2',
        'price',
        'vat',
        'mark',
        'unit'
    ];

    private marks: Mark[];
    private units: Unit[];
    private vats: Vat[];

    constructor(
        public articleSrv: ArticleService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_ARTICLES');
    }

    processLoadedData(data: Article[]): Observable<Article[]> {
        data?.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
            p.markDescrip = this.marks?.find(m => m.id === p.mark)?.description;
            p.unitDescrip = this.units?.find(u => u.id === p.salesUnit)?.description;
            p.vatValue = this.vats.find(u => u.id === p.vat)?.value;
        })
        return of(data);
    }

    ngOnInit() {
        zip(this.lookupsSrv.getMarks(),
            this.lookupsSrv.getUnits(),
            this.lookupsSrv.getVats())
            .subscribe(res => {
                this.marks = res[0];
                this.units = res[1];
                this.vats = res[2];
            });
        super.ngOnInit();
    }
}

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
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'ss-article-list',
    styleUrls: ['./article-list.component.scss'],
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent extends BaseEntityListComponent<Article> implements OnInit {
    filterCtrl = new FormControl<number>(this.entitySrv.getParentId());
    private STOCK_COLS = ['image', 'reference', 'description2', 'markName', 'klassName', 'unit'];
    private SALES_COLS = ['image', 'reference', 'description2', 'markName', 'klassName', 'unit'];
    displayedColumns = this.STOCK_COLS;

    private marks: Mark[] = [];
    private units: Unit[] = [];
    private vats: Vat[] = [];

    constructor(
        public articleSrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_ARTICLES');
    }

    override processLoadedData(data: Article[]): Observable<Article[]> {
        data?.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
            p.markDescrip = this.marks?.find(m => m.id === p.mark)?.description;
            p.unitDescrip = this.units?.find(u => u.id === p.salesUnit)?.description;
            p.vatValue = this.vats.find(u => u.id === p.vat)?.value;
        });
        return of(data);
    }

    override ngOnInit() {
        super.ngOnInit();
        zip(this.lookupsSrv.getMarks(),
            this.lookupsSrv.getUnits(),
            this.lookupsSrv.getVats(),
            this.route.paramMap)
            .subscribe(res => {
                this.marks = res[0];
                this.units = res[1];
                this.vats = res[2];
                this.displayedColumns = res[3].get('price') === 'price1'? this.SALES_COLS : this.STOCK_COLS;
            });
        this.subscriptions.push(
            this.filterCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(id => {
                    this.articleSrv.setParentId(id);
                    this.refresh();
                }));
    }
}

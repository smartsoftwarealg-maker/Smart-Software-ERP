import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticleService, Article } from '@ss/master-data/api-article';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Observable, of} from 'rxjs';
import { ArticleTypeService, LookupsService } from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import { HttpService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-production-article-list',
    styleUrls: ['./production-article-list.component.scss'],
    templateUrl: './production-article-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        RouterModule,
        DocInfoComponent,
        PaginationComponent,
        TranslateDirective,
        ImageInputComponent
    ]
})
export class ProductionArticleListComponent extends BaseEntityListComponent<Article> implements OnInit {
    private typeSrv = inject(ArticleTypeService);
    private STOCK_COLS = ['image', 'reference', 'description2', 'classDescription', 'packagingDescription', 'unitDescription', 'productType'];

    readonly PROD_TYPES  = [
        '',
        'PROD_RM',
        'PROD_SF',
        'PROD_FP'
    ];

    typeMap = new Map<number, string>();
    filterCtrl = new FormControl<number>(this.entitySrv.getParentId());
    displayedColumns = this.STOCK_COLS;


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
            p.typeDescription = this.typeMap.get(p.articleType||0);
        });
        return of(data);
    }

    override ngOnInit() {
        super.ngOnInit();

        this.typeSrv
            .getList(0, 500)
            .subscribe(res => {
                this.typeMap.clear();
                res.body.forEach(t => this.typeMap.set(t.id, t.description));
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

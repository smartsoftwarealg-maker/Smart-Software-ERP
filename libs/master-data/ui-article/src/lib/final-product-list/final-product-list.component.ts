import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Article, BOMTree } from '@ss/master-data/api-article';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { map, Observable, of } from 'rxjs';
import {LookupsService} from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import { HttpService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { CommonModule } from '@angular/common';





import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { FinalProductService } from '@ss/master-data/api-article';
import { BomService } from '../bom.service';
import { CMMSRoutingDetailService } from '@ss/master-data/cmms-routing';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@Component({
    selector: 'ss-product-list',
    styleUrls: ['./final-product-list.component.scss'],
    templateUrl: './final-product-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        TranslateDirective,
        RouterModule,
        PaginationComponent,
        ImageInputComponent,
        TranslatePipe,
        DocInfoComponent
    ]
})
export class FinalProductListComponent extends BaseEntityListComponent<Article> implements OnInit {
    private routingDetailSrv = inject(CMMSRoutingDetailService);
    private bomSrv = inject(BomService);
    private STOCK_COLS = ['image', 'reference', 'description2', 'markDescription', 'laborHours', 'routingValue', 'bomValue'];
    private SALES_COLS = ['image', 'reference', 'description2', 'markDescription', 'laborHours', 'routingValue', 'bomValue'];
    displayedColumns = this.STOCK_COLS;
    filterCtrl = new FormControl<number>(this.entitySrv.getParentId());

    constructor(
        public articleSrv: FinalProductService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_FINAL_PRODUCTS');
    }

    override processLoadedData(data: Article[]): Observable<Article[]> {
        data?.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
            this.bomSrv.setParentId(p.id);
            this.bomSrv
                .treeById()
                .subscribe(tree => p.bomValue = this.getBOMValue(tree));
            if (p.routingId) {
                this.routingDetailSrv.setParentId(p.routingId || 0);
                this.routingDetailSrv
                    .getList(0, 50)
                    .pipe(map(res => res.body))
                    .subscribe(r => {
                        p.laborHours = r.map(e => e.hours * e.teamSize).reduce((a, b) => a + b);
                        p.routingValue = r.map(e => e.hours * e.cost * e.teamSize).reduce((a, b) => a + b);
                    });
            }
        });
        return of(data);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.route
            .paramMap
            .subscribe(res => {
                this.displayedColumns = res.get('price') === 'price1'? this.SALES_COLS : this.STOCK_COLS;
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

    private getBOMValue(tree: BOMTree[]): number {
        return tree.reduce((result, current) => {
            return result +
                   current.bom.qty + current.bom.price +
                   this.getBOMValue(current.children);
        },
        0.0);
    }
}

import {Component} from '@angular/core';
import {
    HttpService,
    LanguageService,
    LoginService,
    PaginatorPersistenceService
} from "@ss/common/api-common";
import {LookupsService, MarkService} from '@ss/common/api-lookup';
import {Article, ArticleService} from '@ss/stock/api-article';
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {debounceTime, distinctUntilChanged, Observable, of, switchMap, tap} from 'rxjs';
import {ImageModel} from '@ss/common/ui-image-input';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {Cart, Cartline} from '@ss/sales/shopping-cart';
import {FoodCartService} from '../food-cart.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ss-food-cart-detail',
  templateUrl: './food-cart-detail.component.html',
  styleUrls: ['./food-cart-detail.component.scss']
})
export class FoodCartDetailComponent extends BaseEntityListComponent<Cartline> {
    searchCtrl = new FormControl<string>('');
    private isHandset: Observable<BreakpointState> = null;
    public cartTotal = 0.0;
    public isSmallScreen = false;
    public searchData: Article[] = [];
    public lastItem: Cartline = null;
    public openOrderExists = false;
    public selectedPartId = 0;

    private LONG = [
        'image',
        'reference',
        'description2',
        'qty',
        'price',
        'total',
        'actions',
    ];


    private SHORT = [
        'description2',
        'qty',
        'price',
    ];
    displayedColumns = this.LONG;

    constructor(
        private cartSrv: FoodCartService,
        public articleSrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public langSrv: LanguageService,
        private loginSrv: LoginService,
        private breakPointObs: BreakpointObserver,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(cartSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LOGISTICS_SHOPPING');
        this.isHandset = this.breakPointObs.observe(['(max-width: 700px)']);
        this.articleSrv.setParentId(3);
    }

    override processLoadedData(data: Cartline[]): Observable<Cartline[]> {
        data.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.partId), false);
        })

        this.openOrderExists = data.length == 0 || data.find(c => !c.validated) != null;

        return this.cartSrv.getTotal()
            .pipe(tap(res => this.cartTotal = res.total),
                  switchMap(res => of(data)));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setButtons([this.refreshButton, this.viewReportButton]);
        this.isHandset.subscribe(state => {
            this.isSmallScreen = state.matches;
            this.displayedColumns =  this.isSmallScreen? this.SHORT : this.LONG;
        });
        this.subscriptions
            .push(
                this.searchCtrl
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged(),
                        switchMap(str => this.articleSrv.getList(0, 50, str))
                    )
                    .subscribe(res => {
                        this.searchData = res.body;
                        this.searchData.forEach(p => {
                            p.imageModel = new ImageModel(this.httpSrv);
                            p.imageModel.readOnly = true;
                            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
                        })
                    }));
        // this.articleSrv
        //     .getList(0, 50, 'pizza')
        //     .subscribe(res => {
        //         this.searchData = res.body;
        //         this.searchData.forEach(p => {
        //             p.imageModel = new ImageModel(this.httpSrv);
        //             p.imageModel.readOnly = true;
        //             p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
        //         })
        //     });
    }

    removeFromCart(item: Cartline) {
        if (item) {
            this.data = this.data.filter(e => e.partId !== item.partId);
            this.selectedPartId = null;
            // this.cartSrv
            //     .removeItem(item)
            //     .subscribe(res => {
            //         if (res.count > 0) {
            //             this.snackBarSrv.showSuccessMessage();
            //             this.data = this.data.filter(e => e.id !== item.id);
            //             this.cartTotal -= item.qty * item.price;
            //         } else {
            //             this.snackBarSrv.showFailureMessage();
            //         }
            //     });
        }
    }

    addToCart(item: Cartline, qty: number) {
        if (item != null && item.qty + qty > 0) {
            item.qty += qty;
            this.updateTotal();
        }
        // if (item != null && item.qty + qty > 0) {
        //     this.cartSrv
        //         .addQty(item, qty)
        //         .subscribe(res => {
        //             if (res.count > 0) {
        //                 this.snackBarSrv.showSuccessMessage();
        //                 this.data.filter(e => e.id !== item.id);
        //                 item.qty += qty;
        //                 this.cartTotal += qty * item.price;
        //             } else {
        //                 this.snackBarSrv.showFailureMessage();
        //             }
        //         });
        // }
    }

    confirm() {
        if (this.data.length > 0) {
            this.confirmationSrv
                .confirm('COMMON_CONFIRMATION', 'SALES_CONFIRM_CART')
                .pipe(switchMap(res => res ? this.cartSrv.confirmLines(this.data) : of({id: 0})))
                .subscribe(res => {
                    if (res.id) {
                        this.data = [];
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
        // if (this.selectedRow) {
        //     this.selectedRow.validated = confirmed;
        //     const cart: Cart = {
        //         id: this.selectedRow.cartId,
        //         centerId: this.loginSrv.appCtx.center,
        //         agentId: this.loginSrv.appCtx.agentId,
        //         shopDate: new Date(),
        //         validated: confirmed,
        //         processed: false,
        //     };
        //     this.cartSrv
        //         .confirm(cart)
        //         .subscribe(res => {
        //             if (res.count > 0) {
        //                 this.snackBarSrv.showSuccessMessage();
        //             } else {
        //                 this.snackBarSrv.showFailureMessage();
        //             }
        //         });
        //     this.displayedColumns = confirmed? this.CONFIRMED_COLS : this.LONG;
        //     this.data
        //         .filter(e => e.cartId === this.selectedRow.cartId)
        //         .forEach(e => e.validated = confirmed);
        //     this.openOrderExists = this.data.length == 0 || this.data.find(c => !c.validated) != null;
        // }
    }

    addArticleToCart(article: Article, qty: number) {
        this.lastItem = {
            id: 0,
            cartId: 0,
            partId: article.id,
            reference: article.reference,
            qty: qty,
            price: article.price1,
            description: article.description2,
            validated: false
        };
        if (this.cartTotal + article.price1 <= 1000000) {
            const existing = this.data.find(e => e.partId === article.id);
            if (existing) {
                existing.qty += qty;
            } else {
                this.data = this.data.concat([this.lastItem]);
                this.pagination.elementCount += 1;
            }
            this.shellSrv.setLoading(false);
            this.updateTotal();
            // this.cartSrv
            //     .addItem(this.lastItem)
            //     .subscribe(res => {
            //         if (res.id > 0) {
            //             this.refresh();
            //             this.snackBarSrv.showSuccessMessage();
            //             this.cartTotal += article.price1;
            //         } else {
            //             this.snackBarSrv.showFailureMessage('COMMON_FAILURE');
            //         }
            //     });
        } else {
            this.snackBarSrv.showFailureMessage('LOGISTICS_AMOUNT_EXCEEDED');
        }
    }


    private updateTotal() {
        this.cartTotal = this.data.map(e => e.price * e.qty).reduce((p, c) => p + c);
    }

    override selectRow(row: Cartline) {
        super.selectRow(row);
        this.selectedPartId = row?.partId;
    }
}

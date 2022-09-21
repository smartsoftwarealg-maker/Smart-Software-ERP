import {Component, Input, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Article} from '@ss/stock/api-article';
import {PaginationModel} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LotsService, Store} from '@ss/common/api-lookup';
import {FormControl, FormGroup} from '@angular/forms';
import {ArticleStore, ArticleStoresService} from '@ss/stock/api-article-store';

interface StoreForm {
    id: FormControl<number>;
    storeId: FormControl<number>,
    referenceId: FormControl<number>,
    reference: FormControl<string|null>,
    stock: FormControl<number>,
    price1: FormControl<number>,
    price2: FormControl<number>,
    price3: FormControl<number>,
    price4: FormControl<number>,
    price5: FormControl<number>,
    blockedLot: FormControl<boolean>

}
@Component({
    selector: 'ss-article-store',
    styleUrls: ['./article-store.component.scss'],
    templateUrl: './article-store.component.html'
})
export class ArticleStoreComponent implements OnInit {

    article_!: Article;

    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.lotsService);
    storeForm: FormGroup<StoreForm> = new FormGroup({
        id: new FormControl(0, {nonNullable: true}),
        storeId: new FormControl(0),
        referenceId: new FormControl(0),
        reference: new FormControl(null),
        stock: new FormControl(0),
        price1: new FormControl<number>(0),
        price2: new FormControl<number>(0),
        price3: new FormControl<number>(0),
        price4: new FormControl<number>(0),
        price5: new FormControl<number>(0),
        blockedLot: new FormControl<boolean>(false)
    });

    //
    public readonly pagination = PaginationModel.newInstance();

    data: ArticleStore[];
    selectedStore: ArticleStore = null;
    displayedColumns = [
        'storeName',
        'stock'
    ];


    constructor(public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleStoreSrv: ArticleStoresService,
                public lotsService: LotsService,
                public confirmationSrv: ConfirmationDialogService) {
        this.pagination.onChange = () => this.loadArticleStore();
    }


    ngOnInit() {
        this.articleStoreSrv.setParentId(this.article_.id);
        this.storeForm.setValue({
            storeId: 0,
            referenceId: this.article_.id,
            reference: this.article_.reference,
            id: 0,
            price1: 0,
            price2: 0,
            price3: 0,
            price4: 0,
            price5: 0,
            stock: 0,
            blockedLot: false
        });
        this.loadArticleStore();
    }

    @Input() set article(article: Article) {
        this.article_ = article;
        this.selectStore(null);
        this.ngOnInit();
    }

    loadArticleStore() {
        this.articleStoreSrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe((x) => {
                this.pagination.elementCount = x.itemCount;
                const ids = x.body.map(_ => _.id);
                this.data = x.body;
        });

    }

    addStore() {
        const value = this.storeForm.getRawValue();
        this.articleStoreSrv.add(value)
            .subscribe({
                next: res => {
                    this.snackBarSrv.showSuccessMessage();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                },
                complete: () => {
                    this.loadArticleStore();
                }
            })
    }

    selectStore(store: ArticleStore) {
        this.selectedStore = store;
        this.storeForm.controls['storeId'].setValue(store?.storeId, { onlySelf: true });
        this.storeForm.get('storeId').setErrors(null);
    }

    removeStore() {
        if (this.selectedStore) {
            console.log('selected', this.selectedStore);
            this.articleStoreSrv
                .remove(this.selectedStore.id)
                .subscribe(res => {
                    this.snackBarSrv.showSuccessMessage();
                    this.data = this.data.filter(e => e.id !== this.selectedStore.id);
                })
        }
    }
}

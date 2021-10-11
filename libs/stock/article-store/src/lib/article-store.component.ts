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

@Component({
    selector: 'ss-article-store',
    styleUrls: ['./article-store.component.scss'],
    templateUrl: './article-store.component.html'
})
export class ArticleStoreComponent implements OnInit {

    article_!: Article;

    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.lotsService);
    lots: { [id: number]: string; };
    storeForm: FormGroup = new FormGroup({
        storeId: new FormControl(),
        referenceId: new FormControl(),
        reference: new FormControl(),
        id: new FormControl()
    });

    //
    public readonly pagination = PaginationModel.newInstance();

    data: ArticleStore[];
    selectedStore: ArticleStore = null;
    displayedColumns = [
        'storeId',
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
            storeId: null,
            referenceId: this.article_.id,
            reference: this.article_.reference,
            id: 0
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
            .getPage(this.pagination)
            .subscribe((x: ArticleStore[]) => {
            const ids = x.map(_ => _.id);
            this.lotsService.getAll(ids).subscribe((s: Store[]) => {
                this.lots = s.reduce(
                    (total: { [id: number]: string; }, currentValue) => {
                        total[currentValue.id] = currentValue.description;
                        return total
                    }, {}
                );
            });
            this.data = x;
        });

    }


    addStore() {
        this.articleStoreSrv.add(this.storeForm.value)
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
            this.articleStoreSrv
                .remove(this.selectedStore.id)
                .subscribe(res => this.snackBarSrv.showSuccessMessage())
            this.data = this.data.filter(e => e.id !== this.selectedStore.id)
        }
    }
}

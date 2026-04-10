import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Article} from '@ss/master-data/api-article';
import { LoginService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LotsService, Lot} from '@ss/common/api-lookup';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleStore, ArticleStoresService } from '@ss/stock/api-article-store';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { OptionService } from '@ss/logistics/ui-options';
import {DecimalPipe} from "@angular/common";
import { of, switchMap } from 'rxjs';

interface StoreForm {
    id: FormControl<number>;
    storeId: FormControl<number>,
    referenceId: FormControl<number>,
    reference: FormControl<string|null>,
    location: FormControl<string|null>,
    locSector: FormControl<string|null>,
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
    templateUrl: './article-store.component.html',
    standalone: true,
    imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, UiAutoCompleteComponent, MatError, MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, TranslatePipe, DecimalPipe]
})
export class ArticleStoreComponent implements OnInit {
    #loginSrv = inject(LoginService);
    #optionsSrv = inject(OptionService);
    #lotsService = inject(LotsService);
    #emptyValue = {
        id: 0,
        storeId: 0,
        referenceId: 0,
        reference: null,
        location: null,
        locSector: null,
        stock: 0,
        price1: 0,
        price2: 0,
        price3: 0,
        price4: 0,
        price5: 0,
        blockedLot: false
    };

    editMode = signal(false);
    usesLots = signal(false);
    article_!: Article;

    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> = new DefaultAutoCompleteModel<Lot>(this.#lotsService);
    storeForm: FormGroup<StoreForm> = new FormGroup({
        id: new FormControl(0, {nonNullable: true}),
        storeId: new FormControl(0),
        referenceId: new FormControl(0),
        reference: new FormControl(null),
        location: new FormControl<string|null>(null),
        locSector: new FormControl<string|null>(null),
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
        'lotNumber',
        'locSector',
        'location',
        'stock'
    ];


    constructor(public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleStoreSrv: ArticleStoresService,
                public confirmationSrv: ConfirmationDialogService) {
        this.pagination.onChange = () => this.loadArticleStore();
    }


    ngOnInit() {
        this.articleStoreSrv.setParentId(this.article_?.id);
        this.storeForm.setValue({
            storeId: 0,
            referenceId: this.article_.id,
            reference: this.article_.reference,
            location: null,
            locSector: null,
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
        this.#optionsSrv
            .get(this.#loginSrv.appCtx.center)
            .subscribe(res => {
                this.usesLots.set(res.usesLots);
                this.displayedColumns = this.displayedColumns.filter(c => res.usesLots || c !== 'storeName');
            });
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
                // const ids = x.body.map(_ => _.id);
                this.data = x.body;
            });

    }

    addStore() {
        this.selectedStore = null;
        this.editStore();
        // const value = this.storeForm.getRawValue();
        // this.articleStoreSrv.add(value)
        //     .subscribe({
        //         next: () => {
        //             this.snackBarSrv.showSuccessMessage();
        //         },
        //         error: err => {
        //             this.snackBarSrv.showFailureMessage();
        //             throw err;
        //         },
        //         complete: () => {
        //             this.loadArticleStore();
        //         }
        //     });
    }

    selectStore(store: ArticleStore) {
        this.selectedStore = store;
        this.storeForm.controls['storeId'].setValue(store?.storeId, { onlySelf: true });
        this.storeForm.get('storeId').setErrors(null);
    }

    removeStore() {
        if (this.selectedStore) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(res => res? this.articleStoreSrv.remove(this.selectedStore.id) : of({count: 0})))
                .subscribe(res => {
                    if (res?.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.data = this.data.filter(
                            (e) => e.id !== this.selectedStore.id,
                        );
                    }
                });
        }
    }

    editStore() {
        this.#emptyValue.referenceId = this.article_?.id;
        this.#emptyValue.reference = this.article_?.reference;
        this.storeForm.reset(this.selectedStore||this.#emptyValue);
        if (this.selectedStore?.id) {
            this.storeForm.get('id').disable();
        } else {
            this.storeForm.get('id').enable();
        }
        this.editMode.set(true);
    }

    saveStore() {
        const value = this.storeForm.getRawValue();
        if (this.selectedStore?.storeId) {
            value.storeId = this.selectedStore.storeId;
        }
        this.articleStoreSrv.save(value)
            .subscribe({
                next: () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.editMode.set(false);
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    this.editMode.set(false);
                    throw err;
                },
                complete: () => {
                    this.loadArticleStore();
                    this.editMode.set(false);
                }
            });
    }

    cancel() {
        this.editMode.set(false);
    }
}

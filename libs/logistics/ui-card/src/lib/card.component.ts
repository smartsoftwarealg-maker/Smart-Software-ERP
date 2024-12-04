import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Card, CardService} from '@ss/logistics/api-card';
import {ArticleService} from '@ss/master-data/api-article';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {Store} from '@ss/common/api-lookup';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {ArticleLotsService} from '@ss/stock/api-article-store';
import {LanguageService} from '@ss/common/api-common';
import { CommonModule } from '@angular/common';


import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-card',
    styleUrls: ['./card.component.scss'],
    templateUrl: './card.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        DatePickerComponent,

        PaginationComponent
    ]

})
export class CardComponent implements OnInit {
    private storeSrv =  inject(ArticleLotsService);

    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeSrv);

    storeForm: UntypedFormGroup = new UntypedFormGroup({
        store: new UntypedFormControl()
    });

    //
    public readonly pagination = PaginationModel.newInstance();


    articleId: number;
    storeId: number;
    articleReference: string;
    useStoreForm = false;
    data: Card[];

    displayedColumns = [
        'document',
        'number',
        'date',
        'qtyIn',
        'qtyOut',
        'stock',
        'price',
        'value'
    ];


    constructor(public cardSrv: CardService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public articleSrv: ArticleService,
                public langServ: LanguageService,
                public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            this.articleId = +x['articleId'];
            this.storeId = +x['articleStoreId'];
            this.articleReference = x['articleReference'];
            this.useStoreForm = !!x['articleUseStoreSearch'];

            if (!this.useStoreForm) {
                this.loadCard();
            } else {
                this.storeSrv.setParentId(this.articleId);
            }

            this.pagination.onChange = () => this.loadCard();

        });


    }


    loadCard() {
        if (this.useStoreForm && this.storeForm.valid) this.storeId = this.storeForm.value.store;
        this.shellSrv.setLoading(false);

        const loadObserver = this.articleId ?
            this.cardSrv.loadByArticleId(this.pagination, this.storeId, this.articleId) :
            this.cardSrv.loadByArticleReference(this.pagination, this.storeId, this.articleReference);


        loadObserver.subscribe((x: Card[]) => {
            this.data = x;
            this.shellSrv.setLoading(false);
        });

    }


}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { StockUiArticleStoreModule } from '@ss/stock/article-store';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { Article, ArticleAutoCompleteModel, ArticleService } from '@ss/stock/api-article';
import { FormControl } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ss-reference-correction',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        StockUiArticleStoreModule,
        LogisticsUiDocInfoModule,
        RouterModule,
        CommonUiImageInputModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule
    ],
    templateUrl: './reference-correction.component.html',
    styleUrls: ['./reference-correction.component.css'],
})
export class ReferenceCorrectionComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private snackBar = inject(SnackBarService);
    private confirmSrv = inject(ConfirmationDialogService);
    private articleSrv = inject(ArticleService);

    sourceReference = new FormControl<number>(0);
    destinationReference = new FormControl<number>(0);
    sourceClass = new FormControl<string|null>({ value: null, disabled: true});
    destinationClass = new FormControl<string|null>({ value: null, disabled: true});

    sourceArticle: Article | null = null;
    destinationArticle: Article | null = null;

    sourceLookup = new ArticleAutoCompleteModel(this.articleSrv);
    destinationLookup = new ArticleAutoCompleteModel(this.articleSrv);

    constructor() {
        this.sourceLookup.onObjectSelected = a => { this.sourceArticle = a; this.sourceClass.setValue(a?.klassName); };
        this.destinationLookup.onObjectSelected = a => { this.destinationArticle = a; this.destinationClass.setValue(a?.klassName); };
        this.shellSrv.setGoBackPath('..', this.route);
    }

    ngOnInit(): void {
        this.shellSrv.setTitle('STOCK_REFERENCE_CORRECTION');
    }

    correct() {
        this.confirmSrv
            .confirm('STOCK_REFERENCE_CORRECTION', 'STOCK_CORRECT_REFERENCE')
            .pipe(
                tap(res => this.shellSrv.setLoading(res)),
                switchMap(ans => ans? this.articleSrv.correct(this.sourceArticle.reference, this.destinationArticle.reference) : of({count: 0})))
            .subscribe({
                next: res => {
                    this.shellSrv.setLoading(false);
                    if (res.count) {
                        this.snackBar.showSuccessMessage();
                    } else {
                        this.snackBar.showFailureMessage();
                    }
                    this.reset();
                },
                error: err => {
                    this.shellSrv.setLoading(false);
                    this.reset();
                    throw err;
                }
            });
    }

    private reset() {
        this.destinationArticle = this.destinationArticle = null;
        this.sourceReference.setValue(0);
        this.destinationReference.setValue(0);
        this.sourceClass.setValue(null);
        this.destinationClass.setValue(null);
    }
    disabled() {
        return !(
            this.sourceClass.value !== null &&
            this.sourceArticle !== null &&
            this.sourceClass.value === this.destinationClass.value &&
            this.sourceArticle !== this.destinationArticle);
    }
}

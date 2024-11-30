import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { StockUiArticleStoreModule } from '@ss/stock/article-store';

import { ActivatedRoute, RouterModule } from '@angular/router';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { Article, ArticleAutoCompleteModel, ArticleService } from '@ss/master-data/api-article';
import { FormControl } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-reference-correction',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        StockUiArticleStoreModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent,
        TranslatePipe
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
    oldReference = new FormControl<string|null>(null);
    newReference = new FormControl<string|null>(null);

    sourceArticle: Article | null = null;
    destinationArticle: Article | null = null;

    sourceLookup = new ArticleAutoCompleteModel(this.articleSrv);
    destinationLookup = new ArticleAutoCompleteModel(this.articleSrv);

    constructor() {
        this.sourceLookup.onObjectSelected = a => this.onOldArticle(a);
        this.destinationLookup.onObjectSelected = a => this.onNewArticle(a);
        this.shellSrv.setGoBackPath('..', this.route);
    }

    ngOnInit(): void {
        this.shellSrv.setTitle('STOCK_REFERENCE_CORRECTION');
    }

    private onNewArticle(a: Article) {
        this.destinationArticle = a;
        this.destinationClass.setValue(a?.classDescription);
        this.newReference.setValue(a?.reference);
    }

    private onOldArticle(a: Article) {
        this.sourceArticle = a;
        this.sourceClass.setValue(a?.classDescription);
        this.oldReference.setValue(a?.reference);
    }

    correct() {
        this.confirmSrv
            .confirm('STOCK_REFERENCE_CORRECTION', 'STOCK_REPLACE_REFERENCE')
            .pipe(
                tap(res => this.shellSrv.setLoading(res)),
                switchMap(ans => ans? this.articleSrv.correct(this.sourceArticle.reference, this.newReference.value) : of({count: 0})))
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
            this.sourceArticle !== null &&
            this.newReference.value !== null &&
            this.newReference.value.length > 1 &&
            this.sourceArticle !== this.destinationArticle &&
            (this.sourceClass.value === this.destinationClass.value || this.destinationArticle === null)
        );
    }
}

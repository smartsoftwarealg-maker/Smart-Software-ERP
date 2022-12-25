import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable, of, Subscription, switchMap, tap} from 'rxjs';
import {AppConfigService, HttpService, LanguageService, MaterialModule} from '@ss/common/api-common';
import {ArticleService, AvailableStock} from '@ss/stock/api-article';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {AppArchiveModule, AppArchiveService} from '@ss/common/app-archive';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CommonUiImageInputModule, ImageModel} from '@ss/common/ui-image-input';
import {FormControl} from '@angular/forms';
import {CustomErrorHandlerService} from '@ss/common/ui-error-handler';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'ss-main-page',
    providers: [],
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private httpSrv = inject(HttpService);
    private articleSrv = inject(ArticleService);
    searchControl = new FormControl('');
    articles$: Observable<AvailableStock[]> = null;
    selectedId = 0;

    constructor() {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    ngOnInit(): void {
        this.refresh();
        this.subscriptions.push(
            this.searchControl.valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(filter => {
                this.refresh();
            }));
    }

    select(id: number) {
        this.selectedId = id;
    }

    refresh() {
        this.articles$ =
            this.httpSrv
                .init()
                .pipe(switchMap(_ => this.articleSrv.availableStock(this.searchControl.value)),
                    tap(res => {
                        res.forEach(s => {
                            s.articles.forEach(a => {
                                a.imageModel = new ImageModel(this.httpSrv);
                                a.imageModel.readOnly = true;
                                a.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(a.partId), false);
                            })
                        })
                    }));
    }

}

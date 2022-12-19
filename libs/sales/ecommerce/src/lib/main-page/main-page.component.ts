import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, switchMap} from 'rxjs';
import {HttpService, MaterialModule} from '@ss/common/api-common';
import {Article, ArticleService, AvailableStock} from '@ss/stock/api-article';
import {CommonUiAutoCompleteModule, DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AppArchiveModule, AppArchiveService} from '@ss/common/app-archive';

@Component({
    selector: 'ss-main-page',
    standalone: true,
    imports: [CommonModule, MaterialModule, CommonUiAutoCompleteModule, AppArchiveModule],
    providers: [ArticleService, AppArchiveService, HttpService],
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    private dac: DefaultAutoCompleteModel<Article> = null;
    private articleSrv = inject(ArticleService);
    articles$: Observable<AvailableStock[]> = null;
    selectedId = 0;

    constructor() {}

    ngOnInit(): void {
        this.articles$ = this.articleSrv
            .init()
            .pipe(switchMap(_ => this.articleSrv.availableStock()));
    }

    select(id: number) {
        this.selectedId = id;
    }
}

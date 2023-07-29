import { Component, OnInit } from '@angular/core';
import {ProjectArticle} from '../contract-api.class';
import {ActivatedRoute, Router} from '@angular/router';
import {map, of, switchMap} from 'rxjs';
import {ContractArticleService} from '../contract-article.service';
import {PaginationModel} from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-contract-article-list',
    templateUrl: './contract-article-list.component.html',
    styleUrls: ['./contract-article-list.component.scss'],
})
export class ContractArticleListComponent implements OnInit {
    selected: ProjectArticle | null = null;
    articles: ProjectArticle[] = [];
    pagination = PaginationModel.newInstance();
    displayedColumns = ['reference', 'description', 'qty', 'price', 'vat'];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private snackBar: SnackBarService,
                private confirmationSrv: ConfirmationDialogService,
                private articleSrv: ContractArticleService) {
        this.pagination.onChange = () => this.refresh();
    }

    ngOnInit(): void {
        this.route
            .parent
            .parent
            .params
            .pipe(map(params => +params['id'] | 0),
                  switchMap(id => {
                      this.articleSrv.setParentId(id);
                      return this.articleSrv.getList(0, 5);
                  }))
            .subscribe(res => {
                this.articles = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    showDetail(id: number) {
        this.router.navigate([this.router.url, id]).then();
    }

    edit() {
        this.showDetail(this.selected?.id);
    }

    deleteSelected() {
        if (this.selected && this.selected.id) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(res => res? this.articleSrv.remove(this.selected.id): of({count: -1})))
                .subscribe(res => {
                    if (res.count > 0) {
                        this.snackBar.showSuccessMessage();
                        this.articles = this.articles.filter(e => e.id !== this.selected.id)
                    }
                });
        }
    }

    select(a: ProjectArticle) {
        this.selected = a;
    }

    private refresh() {
        return this.articleSrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.articles = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }
}

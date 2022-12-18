import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { FoyerArticlesService } from './foyer-articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../common/snack-bar.service';
import { Food, FoyerArticle } from '../hotel-api';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { Observable } from 'rxjs';
import { LanguageService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { deepCopy } from '../../smart-lib/common/util';
import { HttpService } from '../../smart-lib/common/http.service';

const foyerArticlesUrl = '/hotels/foyerArticles';

@Component({
    selector: 'app-foyer-articles-list',
    templateUrl: './foyer-articles-list.component.html',
    styleUrls: ['./foyer-articles-list.component.scss']
})
// tslint:disable-next-line:max-line-length
export class FoyerArticlesListComponent extends AbstractEntityList<FoyerArticle, BackendDataSource<FoyerArticle>> implements OnInit, OnDestroy {

    public displayedColumns = ['reference', 'description2', 'price', 'vat', 'accountno'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public override router: Router,
        public activatedRoute: ActivatedRoute,
        public foyerSrv: FoyerArticlesService) {
        // entity: null
        super(new BackendDataSource(httpSrv, foyerArticlesUrl), userSrv.getRights(null), snackBarSrv, foyerSrv.pagination);
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showEditForm(): void {
        this.edit(deepCopy(this.data.filter(v => v.id === this.selectedId)[0]));
    }

    showAddForm(): void {
        this.edit(null);
    }

    edit(v: Food): void {
        this.foyerSrv.activeEntity = v;
        this.router.navigate([(v || { id: 0 }).id], { relativeTo: this.activatedRoute });
    }

    protected loadMoreData(): Observable<any> {
        return this.foyerSrv.load();
    }

}

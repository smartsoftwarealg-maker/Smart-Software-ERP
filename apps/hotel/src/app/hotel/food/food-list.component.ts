import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { SnackBarService } from '../../common/snack-bar.service';
import { FoodService } from './food.service';
import { Observable } from 'rxjs';
import { Food } from '../hotel-api';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';
import { deepCopy } from '../../smart-lib/common/util';
import { ListToolbarComponent } from '../../common/list-toolbar/list-toolbar.component';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../common/pagination/pagination.component';

const foodUrl = '/hotels/food';

@Component({
    selector: 'app-food',
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class FoodListComponent extends AbstractEntityList<Food, BackendDataSource<Food>> implements OnInit, OnDestroy {

    public displayedColumns = ['reference', 'description2', 'foodType', 'price', 'vat', 'accountno'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public foodSrv: FoodService) {
        // entity: null
        super(new BackendDataSource(httpSrv, foodUrl), userSrv.getRights(null), snackBarSrv, foodSrv.pagination);
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
        this.foodSrv.activeEntity = v;
        this.router.navigate([(v || { id: 0 }).id], { relativeTo: this.activatedRoute }).then();
    }

    protected loadMoreData(): Observable<any> {
        return this.foodSrv.load();
    }
}

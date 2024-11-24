import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodType } from '../hotel-api';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { FoodCategoriesDetailComponent } from './food-categories-detail.component';
import { PaginationModel, PaginationComponent } from '../../common/pagination/pagination.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

const foodTypesUrl = '/articles/foodTypes';

@Component({
    selector: 'app-food-categories-list',
    templateUrl: './food-categories-list.component.html',
    styleUrls: ['./food-categories-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class FoodCategoriesListComponent extends AbstractEntityList<FoodType, BackendDataSource<FoodType>> implements OnInit, OnDestroy {

    displayedColumns = ['description'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public matDialog: MatDialog) {
        // entity: null
        super(new BackendDataSource(httpSrv, foodTypesUrl), userSrv.getRights(null), snackBarSrv, PaginationModel.newInstance());
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showEditForm(): void {
        if (this.selectedId && this.accessRight.edit) {
            this.edit(deepCopy(this.data.filter(v => v.id === this.selectedId)[0]));
        }
    }

    showAddForm(): void {
        if (this.accessRight.create) {
            this.edit({ id: 0, description: null });
        }
    }

    edit(x: FoodType): void {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '400px';
        config.maxWidth = '100%';
        config.data = {
            record: x,
            saveFn: this.saveFn
        };
        this.matDialog.open(FoodCategoriesDetailComponent, config);
    }
}

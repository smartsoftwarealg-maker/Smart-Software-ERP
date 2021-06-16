import {Component, OnDestroy, OnInit} from '@angular/core';
import {FoodType} from '../hotel-api';
import {AbstractEntityList} from '../../common/base-classes/abstract-entity-list';
import {BackendDataSource} from '../../common/base-classes/backend-data-source';
import {SnackBarService} from '../../common/snack-bar.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {HttpService, UserService, LanguageService, deepCopy} from 'smart-shared';
import {FoodCategoriesDetailComponent} from './food-categories-detail.component';
import {PaginationModel} from '../../common/pagination/pagination.component';

const foodTypesUrl = '/articles/foodTypes';

@Component({
    selector: 'app-food-categories-list',
    templateUrl: './food-categories-list.component.html',
    styleUrls: ['./food-categories-list.component.scss']
})
export class FoodCategoriesListComponent extends AbstractEntityList<FoodType, BackendDataSource<FoodType>> implements OnInit, OnDestroy {

    displayedColumns = ['description'];

    constructor(public httpSrv: HttpService,
                public userSrv: UserService,
                public langSrv: LanguageService,
                public snackBarSrv: SnackBarService,
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
            this.edit({id: 0, description: null});
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

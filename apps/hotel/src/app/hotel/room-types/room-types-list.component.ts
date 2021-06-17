import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomType} from '../hotel-api';
import {AbstractEntityList} from '../../common/base-classes/abstract-entity-list';
import {BackendDataSource} from '../../common/base-classes/backend-data-source';
import {SnackBarService} from '../../common/snack-bar.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {HttpService, UserService, LanguageService, deepCopy} from 'smart-shared';
import {RoomTypesDetailComponent} from './room-types-detail.component';
import {PaginationModel} from '../../common/pagination/pagination.component';

const roomTypesUrl = '/hotels/roomTypes';

@Component({
    selector: 'app-room-types-list',
    templateUrl: './room-types-list.component.html',
    styleUrls: ['./room-types-list.component.scss']
})
export class RoomTypesListComponent extends AbstractEntityList<RoomType, BackendDataSource<RoomType>> implements OnInit, OnDestroy {

    displayedColumns = ['description'];

    constructor(public httpSrv: HttpService,
                public userSrv: UserService,
                public langSrv: LanguageService,
                public snackBarSrv: SnackBarService,
                public matDialog: MatDialog) {
        // entity: null
        super(new BackendDataSource(httpSrv, roomTypesUrl), userSrv.getRights(null), snackBarSrv, PaginationModel.newInstance());
    }

    ngOnInit(): void {
        this.refresh();
    }

    showEditForm(): void {
        if (this.selectedId && this.accessRight.edit) {
            this.edit(deepCopy(this.data.filter(v => v.id === this.selectedId)[0]));
        }
    }

    showAddForm(): void {
        if (this.accessRight.create) {
            this.edit({id: 0, description: null, adultCapacity: null, childCapacity: null});
        }
    }

    edit(x: RoomType): void {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '500px';
        config.maxWidth = '100%';
        config.data = {
            record: x,
            saveFn: this.saveFn
        };
        this.matDialog.open(RoomTypesDetailComponent, config);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}

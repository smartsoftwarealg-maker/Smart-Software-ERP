import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomOption} from '../hotel-api';
import {AbstractEntityList} from '../../common/base-classes/abstract-entity-list';
import {BackendDataSource} from '../../common/base-classes/backend-data-source';
import {SnackBarService} from '../../common/snack-bar.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {HttpService, UserService, LanguageService, deepCopy} from 'smart-shared';
import {RoomOptionsDetailComponent} from './room-options-detail.component';
import {PaginationModel} from '@ss/common/ui-pagination';

const roomOptionsUrl = '/hotels/roomOptions';

@Component({
    selector: 'app-room-options-list',
    templateUrl: './room-options-list.component.html',
    styleUrls: ['./room-options-list.component.scss']
})
export class RoomOptionsListComponent extends AbstractEntityList<RoomOption, BackendDataSource<RoomOption>> implements OnInit, OnDestroy {

    displayedColumns = ['description'];

    constructor(public httpSrv: HttpService,
                public userSrv: UserService,
                public langSrv: LanguageService,
                public snackBarSrv: SnackBarService,
                public matDialog: MatDialog) {
        // entity: null
        super(new BackendDataSource(httpSrv, roomOptionsUrl), userSrv.getRights(null), snackBarSrv, PaginationModel.newInstance());
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

    edit(x: RoomOption): void {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '400px';
        config.maxWidth = '100%';
        config.data = {
            record: x,
            saveFn: this.saveFn
        };
        this.matDialog.open(RoomOptionsDetailComponent, config);
    }
}

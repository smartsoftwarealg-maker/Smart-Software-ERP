import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomType } from '../hotel-api';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { RoomTypesDetailComponent } from './room-types-detail.component';
import { PaginationModel, PaginationComponent } from '../../common/pagination/pagination.component';
import { LanguageService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { deepCopy } from '../../smart-lib/common/util';
import { HttpService } from '../../smart-lib/common/http.service';
import { ListToolbarComponent } from '../../common/list-toolbar/list-toolbar.component';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';

const roomTypesUrl = '/hotels/roomTypes';

@Component({
    selector: 'app-room-types-list',
    templateUrl: './room-types-list.component.html',
    styleUrls: ['./room-types-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class RoomTypesListComponent extends AbstractEntityList<RoomType, BackendDataSource<RoomType>> implements OnInit, OnDestroy {

    displayedColumns = ['description'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
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
            this.edit({ id: 0, description: null, adultCapacity: null, childCapacity: null });
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

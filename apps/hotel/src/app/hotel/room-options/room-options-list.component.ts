import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomOption } from '../hotel-api';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { RoomOptionsDetailComponent } from './room-options-detail.component';
import { PaginationModel, PaginationComponent } from '../../common/pagination/pagination.component';
import { deepCopy } from '../../smart-lib/common/util';
import { LanguageService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpService } from '../../smart-lib/common/http.service';
import { ListToolbarComponent } from '../../common/list-toolbar/list-toolbar.component';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';

const roomOptionsUrl = '/hotels/roomOptions';

@Component({
    selector: 'app-room-options-list',
    templateUrl: './room-options-list.component.html',
    styleUrls: ['./room-options-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class RoomOptionsListComponent extends AbstractEntityList<RoomOption, BackendDataSource<RoomOption>> implements OnInit, OnDestroy {

    displayedColumns = ['description'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
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
            this.edit({ id: 0, description: null });
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

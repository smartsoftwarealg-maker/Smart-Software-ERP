import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { Room } from '../hotel-api';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { Observable } from 'rxjs';
import { RoomsService } from './rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../smart-lib/components/login/user.service';
import { deepCopy } from '../../smart-lib/common/util';
import { HttpService } from '../../smart-lib/common/http.service';
import { LanguageService } from '@ss/common/api-common';
import { ListToolbarComponent } from '../../common/list-toolbar/list-toolbar.component';
import { NgIf, NgFor } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatChip } from '@angular/material/chips';
import { PaginationComponent } from '../../common/pagination/pagination.component';

const roomsUrl = '/hotels/rooms';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms-list.component.html',
    styleUrls: ['./rooms-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, NgFor, MatChip, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class RoomsListComponent extends AbstractEntityList<Room, BackendDataSource<Room>> implements OnInit, OnDestroy {

    displayedColumns = ['number', 'roomType', 'bedCount', 'state', 'options'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public roomsSrv: RoomsService,
        public router: Router,
        public activatedRoute: ActivatedRoute) {
        // entity: null
        super(new BackendDataSource(httpSrv, roomsUrl), userSrv.getRights(null), snackBarSrv, roomsSrv.pagination);
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected loadMoreData(): Observable<any> {
        return this.roomsSrv.load();
    }

    showEditForm(): void {
        if (this.selectedId && this.accessRight.edit) {
            this.edit(deepCopy(this.data.filter(v => v.id === this.selectedId)[0]));
        }
    }

    showAddForm(): void {
        if (this.accessRight.create) {
            this.edit(null);
        }
    }

    edit(v: Room): void {
        this.roomsSrv.activeEntity = v;
        this.router.navigate([(v || { id: 0 }).id], { relativeTo: this.activatedRoute }).then();
    }

    getRoomType(r: Room): string {
        if (!r) {
            return null;
        }
        return this.roomsSrv.roomTypes[r.roomType];
    }

    getRoomState(r: Room): string {
        if (!r) {
            return null;
        }
        return this.roomsSrv.roomStates[r.state];
    }

    public save(obj: Room, callback?: (approved: boolean) => void): void {
        obj.centerId = this.userSrv.context.center;
        super.save(obj, callback);
    }
}

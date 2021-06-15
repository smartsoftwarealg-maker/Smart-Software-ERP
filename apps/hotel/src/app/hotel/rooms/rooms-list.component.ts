import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractEntityList} from '../../common/base-classes/abstract-entity-list';
import {Room} from '../hotel-api';
import {BackendDataSource} from '../../common/base-classes/backend-data-source';
import {SnackBarService} from '../../common/snack-bar.service';
import {Observable} from 'rxjs';
import {RoomsService} from './rooms.service';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { LanguageService } from '@ss/common/ui-lang';
import { deepCopy } from '../../smart-lib/common/util';

const roomsUrl = '/hotels/rooms';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms-list.component.html',
    styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent extends AbstractEntityList<Room, BackendDataSource<Room>> implements OnInit, OnDestroy {

    displayedColumns = ['number', 'roomType', 'bedCount', 'state', 'options'];

    constructor(public httpSrv: HttpService,
                public userSrv: UserService,
                public langSrv: LanguageService,
                public snackBarSrv: SnackBarService,
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
        this.router.navigate([(v || {id: 0}).id], {relativeTo: this.activatedRoute});
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

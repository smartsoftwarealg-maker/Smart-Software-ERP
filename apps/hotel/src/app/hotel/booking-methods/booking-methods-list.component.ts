import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackBarService } from '../../common/snack-bar.service';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { BookingMethod } from '../hotel-api';
import { BookingMethodsDetailComponent } from './booking-methods-detail.component';
import { PaginationModel } from '../../common/pagination/pagination.component';
import { LanguageService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { deepCopy } from '../../smart-lib/common/util';
import { HttpService } from '../../smart-lib/common/http.service';

const bookingMethodsUrl = '/hotels/bookingTypes';

@Component({
    selector: 'app-booking-methods-list',
    templateUrl: './booking-methods-list.component.html',
    styleUrls: ['./booking-methods-list.component.scss']
})
// tslint:disable-next-line:max-line-length
export class BookingMethodsListComponent extends AbstractEntityList<BookingMethod, BackendDataSource<BookingMethod>> implements OnInit, OnDestroy {

    displayedColumns = ['description', 'confirmed'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public matDialog: MatDialog) {
        // entity: null
        super(new BackendDataSource(httpSrv, bookingMethodsUrl), userSrv.getRights(null), snackBarSrv, PaginationModel.newInstance());
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
            this.edit({ id: 0, description: null, confirmed: false });
        }
    }

    edit(x: BookingMethod): void {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '400px';
        config.maxWidth = '100%';
        config.data = {
            record: x,
            saveFn: this.saveFn
        };
        this.matDialog.open(BookingMethodsDetailComponent, config);
    }

}

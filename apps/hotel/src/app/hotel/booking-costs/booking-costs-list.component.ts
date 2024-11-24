import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackBarService } from '../../common/snack-bar.service';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { ChargingCost, RoomType } from '../hotel-api';
import { PaginationModel, PaginationComponent } from '../../common/pagination/pagination.component';
import { LanguageService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { deepCopy } from '../../smart-lib/common/util';
import { HttpService } from '../../smart-lib/common/http.service';
import { BookingCostDetailComponent } from './booking-costs-detail.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ListToolbarComponent } from '../../common/list-toolbar/list-toolbar.component';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';



const bookingCostsUrl = '/hotels/chargingCosts';
const roomTypesUrl = '/hotels/roomTypes';

@Component({
    selector: 'app-booking-costs',
    templateUrl: './booking-costs-list.component.html',
    styleUrls: ['./booking-costs-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
// tslint:disable-next-line:max-line-length
export class BookingCostListComponent extends AbstractEntityList<ChargingCost, BackendDataSource<ChargingCost>> implements OnInit, OnDestroy {

    displayedColumns = ['description', 'roomType', 'costRate'];
    public roomTypes: { [key: number]: string; };
    public roomTypesArr: RoomType[];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public matDialog: MatDialog) {
        // entity: null
        super(new BackendDataSource(httpSrv, bookingCostsUrl), userSrv.getRights(null), snackBarSrv, PaginationModel.newInstance());
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
            this.edit({ id: 0, description: null, costRate: null, roomType: null, asString: null });
        }
    }

    edit(x: ChargingCost): void {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '400px';
        config.maxWidth = '100%';
        config.data = {
            record: x,
            roomTypes: this.roomTypesArr,
            saveFn: this.saveFn
        };
        this.matDialog.open(BookingCostDetailComponent, config);
    }

    protected loadMoreData(): Observable<any> {
        return this.roomTypes == null
            ? this.httpSrv.getData<RoomType>(roomTypesUrl, 0, 49).pipe(
                tap((types: { body: RoomType[]; itemCount: number; }) => {
                    this.roomTypes = {};
                    this.roomTypesArr = types.body;
                    types.body.forEach(t => this.roomTypes[t.id] = t.description);
                })
            )
            : null;
    }
}

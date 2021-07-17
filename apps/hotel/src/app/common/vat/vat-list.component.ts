import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractEntityList } from '../base-classes/abstract-entity-list';
import { Vat } from './vat-api';
import { UserService } from '../../smart-lib/components/login/user.service';
import { BackendDataSource } from '../base-classes/backend-data-source';
import { SnackBarService } from '../snack-bar.service';
import { VatDetailComponent } from './vat-detail.component';
import { PaginationModel } from '../pagination/pagination.component';
import { LanguageService } from '@ss/common/api-common';
import { deepCopy } from '../../smart-lib/common/util';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpService } from '../../smart-lib/common/http.service';

const vatsUrl = '/articles/vats';

@Component({
    selector: 'app-vat-list',
    templateUrl: './vat-list.component.html',
    styleUrls: ['./vat-list.component.scss']
})
export class VatListComponent extends AbstractEntityList<Vat, BackendDataSource<Vat>> implements OnInit, OnDestroy {

    displayedColumns = ['value'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public snackBarSrv: SnackBarService,
        public matDialog: MatDialog) {
        // entity: null
        super(new BackendDataSource(httpSrv, vatsUrl), userSrv.getRights(null), snackBarSrv, PaginationModel.newInstance());
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
            this.edit({ id: 0, value: null });
        }
    }

    edit(v: Vat): void {
        const config = new MatDialogConfig();
        config.width = '400px';
        config.maxWidth = '100%';
        config.disableClose = true;
        config.data = {
            record: v,
            saveFn: this.saveFn
        };
        this.matDialog.open(VatDetailComponent, config);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}

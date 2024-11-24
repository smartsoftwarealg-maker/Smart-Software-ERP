import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractEntityList } from '../base-classes/abstract-entity-list';
import { UserService } from '../../smart-lib/components/login/user.service';
import { BackendDataSource } from '../base-classes/backend-data-source';
import { SnackBarService } from '../snack-bar.service';
import { deepCopy } from '../../smart-lib/common/util';
import { CostCenter } from './cost-center';
import { CostCenterDetailComponent } from './cost-center-detail.component';
import { PaginationModel, PaginationComponent } from '../pagination/pagination.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LanguageService } from '@ss/common/api-common';
import { HttpService } from '../../smart-lib/common/http.service';
import { ListToolbarComponent } from '../list-toolbar/list-toolbar.component';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';

const costCentersUrl = '/costCenters';

@Component({
    selector: 'app-cost-center-list',
    templateUrl: './cost-center-list.component.html',
    styleUrls: ['./cost-center-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class CostCenterListComponent extends AbstractEntityList<CostCenter, BackendDataSource<CostCenter>> implements OnInit, OnDestroy {

    displayedColumns = ['code', 'description'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public matDialog: MatDialog) {
        // entity: null
        super(new BackendDataSource(httpSrv, costCentersUrl), userSrv.getRights(null), snackBarSrv, PaginationModel.newInstance());
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
            this.edit({ id: 0, code: null, description: null, groupId: null });
        }
    }

    edit(v: CostCenter): void {
        const config = new MatDialogConfig();
        config.width = '400px';
        config.maxWidth = '100%';
        config.disableClose = true;
        config.data = {
            record: v,
            saveFn: this.saveFn
        };
        this.matDialog.open(CostCenterDetailComponent, config);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}

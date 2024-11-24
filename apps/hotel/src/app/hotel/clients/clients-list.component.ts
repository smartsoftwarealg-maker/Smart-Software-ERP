import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from './clients.service';
import { Observable } from 'rxjs';
import { LanguageService } from '@ss/common/api-common';
import { UserService } from '../../smart-lib/components/login/user.service';
import { deepCopy } from '../../smart-lib/common/util';
import { Agent } from '../../smart-lib/common/models';
import { HttpService } from '../../smart-lib/common/http.service';
import { ListToolbarComponent } from '../../common/list-toolbar/list-toolbar.component';
import { NgIf, NgClass } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../common/pagination/pagination.component';

const agentsUrl = '/agents';

@Component({
    selector: 'app-htl-client-list',
    templateUrl: './clients-list.component.html',
    styleUrls: ['./clients-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, NgClass, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class ClientsListComponent extends AbstractEntityList<Agent, BackendDataSource<Agent>> implements OnInit, OnDestroy {

    public displayedColumns = ['code', 'denomination', 'mobile', 'phone-fax', 'address'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public clientSrv: ClientsService) {
        // entity: null
        super(new BackendDataSource(httpSrv, agentsUrl), userSrv.getRights(null), snackBarSrv, clientSrv.pagination);
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    showEditForm(): void {
        this.edit(deepCopy(this.data.filter(v => v.id === this.selectedId)[0]));
    }

    showAddForm(): void {
        this.edit(null);
    }

    edit(v: Agent): void {
        this.clientSrv.setActiveEntity(v);
        this.router.navigate([(v || { id: 0 }).id], { relativeTo: this.activatedRoute }).then();
    }

    protected loadMoreData(): Observable<any> {
        return this.clientSrv.load();
    }

    protected afterLoading() {
        super.afterLoading();
        // console.log(this.data);
    }
}

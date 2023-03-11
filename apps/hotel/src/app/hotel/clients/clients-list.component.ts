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

const agentsUrl = '/agents';

@Component({
    selector: 'app-htl-client-list',
    templateUrl: './clients-list.component.html',
    styleUrls: ['./clients-list.component.scss']
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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClientsService } from '../clients/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../common/snack-bar.service';
import { LanguageService } from '@ss/common/api-common';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { deepCopy } from '../../smart-lib/common/util';
import { Agent } from '../../smart-lib/common/models';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';
import { LoadingState } from '../../common/util';
import { PaymentService } from './payment.service';
import { Payment, paymentsUrl, agentsUrl } from './payment-api';

@Component({
    selector: 'ss-app-payment-list',
    styleUrls: ['./payment-list.component.scss'],
    templateUrl: './payment-list.component.html'
})
export class PaymentListComponent extends AbstractEntityList<Payment, BackendDataSource<Payment>> implements OnInit, OnDestroy {

    public displayedColumns = ['payMethod', 'amount', 'date', 'checkNumb', 'bank'];
    public agentDisplayedColumns = ['code', 'denomination'];

    parentLoadingState = LoadingState.LOADING;
    clientDataSrc: BackendDataSource<Agent>;

    constructor(public httpSrv: HttpService,
                public userSrv: UserService,
                public langSrv: LanguageService,
                public override snackBarSrv: SnackBarService,
                public override router: Router,
                public activatedRoute: ActivatedRoute,
                public clientSrv: ClientsService,
                public paySrv: PaymentService) {
                // entity: null
                super(new BackendDataSource(httpSrv, null), userSrv.getRights('payments'), snackBarSrv, paySrv.pagination);
                this.clientSrv.pagination.onChange = () => this.refreshClients();
                this.clientDataSrc = new BackendDataSource<Agent>(httpSrv, agentsUrl);
    }

    ngOnInit(): void {
        if (this.paySrv.clients == null) {
            this.refreshClients();
        } else {
            this.parentLoadingState = LoadingState.COMPLETE;
            this.refresh();
        }
    }

    refresh() {
        this.dataSrc.setUrl(this.paySrv.parentId ? (agentsUrl + '/' + this.paySrv.parentId + paymentsUrl) : null);
        super.refresh();
    }

    public refreshClients(): void {
        if (!this.accessRight.read) {
            return;
        }
        this.selectedId = 0;
        this.selectParent(0);
        this.parentLoadingState = LoadingState.LOADING;
        this.paySrv.clients = [];
        this.clientDataSrc.refresh(this.clientSrv.pagination.page - 1, this.clientSrv.pagination.pageSize)
            .subscribe(r => {
                this.paySrv.clients = r.data;
                this.clientSrv.pagination.elementCount = r.itemCount;
                this.afterLoading();
                this.parentLoadingState = LoadingState.COMPLETE;
            }, e => {
                this.parentLoadingState = LoadingState.ERROR;
                throw e;
            });
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

    edit(v: Payment): void {
        //this.clientSrv.setActiveEntity(v);
        this.router.navigate([this.paySrv.parentId, (v || { id: 0 }).id], { relativeTo: this.activatedRoute });
    }

    loadMoreData() {
        return this.paySrv.load();
    }

    protected afterLoading() {
        this.data.forEach(pay => pay.date = this.langSrv.formatDate(pay.date));
    }

    public selectParent(id: number): void {
        this.paySrv.parentId = id;
        this.refresh();
    }
}

import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from "@ss/common/api-base-entity";
import {Delivery} from "@ss/sales/api-delivery";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {User, UserService} from "@ss/common/api-users";
import {AgentService} from "@ss/logistics/api-agent";
import {LanguageService} from "@ss/common/ui-lang";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DeliveryCancellationService} from "@ss/sales/api-delivery-cancellation";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

@Component({
    selector: 'ss-delivery-cancellation-list',
    templateUrl: './delivery-cancellation-list.component.html',
    styleUrls: ['./delivery-cancellation-list.component.scss']
})
export class DeliveryCancellationListComponent extends BaseEntityListComponent<Delivery> {
    public dealers: { [id: number]: string; };
    public agents: { [id: number]: string; } = {};

    displayedColumns = [
        'number',
        'date',
        'agent',
        'reference',
        'referenceDocDate',
    ];


    constructor(
        public deliverySrv: DeliveryCancellationService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService) {
        super(deliverySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'SALES_DELIVERY_CANCELLATION');
    }

    processLoadedData(data: Delivery[]): Observable<Delivery[]> {
        return this.agentService.getByIDList(data.map(x => x.agent))
            .pipe(
                tap(x => x.forEach(e => this.agents[e.id] = e.denomination)),
                switchMap(() => {
                    const parsedData = data.map(x => {
                        x.date = this.langServ.formatDate(x.date);
                        x.referenceDocDate = this.langServ.formatDate(x.referenceDocDate);
                        return x;
                    });
                    return super.processLoadedData(parsedData);
                }));
    }

    onDealersLoaded(data: User[]): void {
        this.dealers = {};
        data.forEach(m => this.dealers[m.id] = m.fullName);
    }
}

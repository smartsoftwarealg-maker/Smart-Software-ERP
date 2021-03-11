import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {User, UserService} from "@ss/common/api-users";
import {switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {LanguageService} from "@ss/common/ui-lang";
import {AgentService} from "@ss/logistics/api-agent";
import {Delivery} from "@ss/sales/api-delivery";
import {InvoiceService} from "@ss/sales/api-invoice";

@Component({
    selector: 'ss-delivery-list',
    styleUrls: ['./invoice-list.component.scss'],
    templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent extends BaseEntityListComponent<Delivery> {

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
        public invoiceSrv: InvoiceService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService) {
        super(invoiceSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'SALES_INVOICE');
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

import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {User, UserService} from "@ss/common/api-users";
import {switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {LanguageService} from "@ss/common/ui-lang";
import {Agent, AgentService} from "@ss/logistics/api-agent";
import {Delivery, DeliveryService} from "@ss/sales/api-delivery";

@Component({
    selector: 'ss-delivery-list',
    styleUrls: ['./delivery-list.component.scss'],
    templateUrl: './delivery-list.component.html'
})
export class DeliveryListComponent extends BaseEntityListComponent<Delivery> {


    public dealers: { [id: number]: string; };

    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public deliverySrv: DeliveryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService) {
        super(deliverySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'SALES_DELIVERY');
    }


    processLoadedData(data: Delivery[]): Observable<Delivery[]> {
        return this.usersService.getAll(data.map(x => x.dealer))
            .pipe(tap(x => this.onDealersLoaded(x)))
            .pipe(switchMap(() => {
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

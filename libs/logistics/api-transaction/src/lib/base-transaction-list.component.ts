import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {AgentService} from '@ss/logistics/api-agent';
import {LanguageService, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Observable, of, zip} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {PayMethod} from '@ss/common/api-lookup';
import {Transaction} from './transaction';

export abstract class BaseTransactionListComponent extends BaseEntityListComponent<Transaction> {
    public dealers: { [id: number]: string; }  = {};
    public agents: { [id: number]: string; }   = {};

    protected constructor(
        public listSrv: BaseEntityService<Transaction>,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentServ: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public payMethodSrv: PayMethodService,
        title: string) {
        super(listSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, title);
        this.dealers = {};
    }

    processLoadedData(data: Transaction[]): Observable<Transaction[]> {
        data.forEach(x => {
            x.date = this.langServ.formatDate(x.date);
            x.referenceDocDate = this.langServ.formatDate(x.referenceDocDate);
        });
        const obs = this.payMethodSrv?
            this.payMethodSrv.getAll(data.filter(x => x.payMethod).map((x: any) => x.payMethod)):
            of(<PayMethod[]>[]);
        return zip(this.agentServ.getByIDList(data.filter(x => x.agent).map(x => x.agent)),
            this.userSrv.getAll(data.filter(x => x.dealer).map((x: any) => x.delaer)),
            obs).pipe(
            tap(res => data.forEach(e => {
                e.agentName = res[0].find(a => a.id === e.agent)?.denomination;
                e.dealerName = res[1].find(a => a.id === e.dealer)?.fullName;
                e.payMethodName = res[2].find(a => a.id === e.payMethod)?.description;
            })),
            switchMap(_ => super.processLoadedData(data)));
    }
}

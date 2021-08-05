import {Component} from '@angular/core';
import {AgentDetailComponent} from '../agent-detail.component';
import {Observable, of} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";


@Component({
    selector: 'ss-mini-agent-detail',
    styleUrls: ['./mini-agent-detail.component.scss'],
    templateUrl: './mini-agent-detail.component.html'
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
    public preload(): Observable<any> {
        return this.lookupsSrv
            .getAgentTypes()
            .pipe(
                tap(x => this.agentTypes = x),
                switchMap(() => this.lookupsSrv.getCities()),
                tap(x => this.cities = x),
                switchMap(() => this.lookupsSrv.getCountries()),
                tap(x => this.countries = x),
                // switchMap(() => this.lookupsSrv.getCompanyTypes()),
                // tap(x => this.companyTypes = x),
                switchMap(() => this.lookupsSrv.getCurrencies()),
                tap(x => this.currencies = x),
                switchMap(() => this.lookupsSrv.getPayModes()),
                tap(x => this.payModes = x),
                // switchMap(() => this.lookupsSrv.getActivities()),
                // tap(x => this.activities = x),
                switchMap(() => this.lookupsSrv.getBanks()),
                tap(x => this.banks = x)
            );
    }
}

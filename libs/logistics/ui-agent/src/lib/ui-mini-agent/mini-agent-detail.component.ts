import {Component} from '@angular/core';
import {AgentDetailComponent} from '../agent-detail/agent-detail.component';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Lookup} from '@ss/common/api-lookup';


@Component({
    selector: 'ss-mini-agent-detail',
    styleUrls: ['./mini-agent-detail.component.scss'],
    templateUrl: './mini-agent-detail.component.html'
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
    banks: Lookup[] = [];
    public override preload(): Observable<any> {
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
            );
    }
}

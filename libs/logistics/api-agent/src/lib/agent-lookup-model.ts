import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent} from './agent-api';
import {AgentService} from './agent.service';

export class AgentLookupModel extends DefaultAutoCompleteModel<Agent> {
    constructor(private agentService: AgentService) {
        super(agentService, 'id', 'denomination');
    }

    override toString = (x:any) => x ? (x['customerCode']? x['customerCode'] + ', ' : '') + x[this.descriptionField] : null;
}

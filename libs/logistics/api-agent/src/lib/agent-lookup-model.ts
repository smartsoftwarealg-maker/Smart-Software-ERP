import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentService} from '@ss/logistics/api-agent';

export class AgentLookupModel extends DefaultAutoCompleteModel<Agent> {
    constructor(private agentService: AgentService) {
        super(agentService, 'id', 'denomination');
    }

    toString = x => x ? (x['customerCode']? x['customerCode'] + ', ' : '') + x[this.descriptionField] : null;
}

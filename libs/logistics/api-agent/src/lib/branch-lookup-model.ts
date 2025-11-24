import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { BranchService } from './branch.service';
import {Agent} from '@ss/logistics/api-agent';

export class BranchLookupModel extends DefaultAutoCompleteModel<Agent> {
    constructor(private branchService: BranchService) {
        super(branchService, 'id', 'denomination');
    }

    override toString = (x: Agent) =>
        x ? x[this.descriptionField] : null;
}

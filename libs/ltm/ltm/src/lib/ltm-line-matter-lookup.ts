import { DefaultAutoCompleteModel, Id } from '@ss/common/ui-auto-complete';
import { LtmLineMatterService } from './ltm-line-matter.service';
import { LTMLineMatter } from './ltm-api';
import { of } from 'rxjs';

export class LtmLineMatterLookup extends DefaultAutoCompleteModel<LTMLineMatter> {
    constructor(public override entitySrv: LtmLineMatterService) {
        super(entitySrv, 'matterId', 'description');
    }

    override getById = (id: Id) =>
        typeof id === 'number'? this.entitySrv.getByMatterId(id) : of(null);

}

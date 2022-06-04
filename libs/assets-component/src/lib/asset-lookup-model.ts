import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Asset} from './assets-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

export class AssetLookupModel extends DefaultAutoCompleteModel<Asset> {
    constructor(public service: BaseEntityService<Asset>) {
        super(service);
    }

    override toString = (a: Asset) => a? `${(a.reference + '            ').substring(0, 12)} ${a.description}` : null;
}

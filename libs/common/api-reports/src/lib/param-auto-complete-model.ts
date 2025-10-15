import { DefaultAutoCompleteModel, Id } from '@ss/common/ui-auto-complete';
import { Lookup } from '@ss/common/api-lookup';
import { ReportParamLookupService } from './report-param-lookup.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';


export class ParamAutoCompleteModel extends DefaultAutoCompleteModel<Lookup> {
    constructor(entitySrv: ReportParamLookupService, protected tableName: string) {
        super(entitySrv);
    }

    override getById = (id: Id) => id ? (<ReportParamLookupService>this.entitySrv).getById(+id || 0, this.tableName) : of(null);

    override filter = (filter: string) => (<ReportParamLookupService>this.entitySrv).getValues(filter, this.tableName).pipe(map(x => this.filterLoadedData(x.body)));
}

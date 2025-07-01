import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { BOM } from '@ss/master-data/api-article';
import { BomService } from './bom.service';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

export class BomLookupClass extends DefaultAutoCompleteModel<BOM> {
    #referenceField= '';

    constructor(override entitySrv: BomService) {
        super(entitySrv);
    }

    toString = (x: BOM) => x ? `${x.description}, ${x.version}`?.substring(0, 50) : null;
    filter = (filter: string) => {
        const params = new HttpParams()
            .set('reference', this.#referenceField)
            .set('version', filter);
        return this.entitySrv
            .versions(this.#referenceField, filter)
            .pipe(map(x => this.filterLoadedData(x)));
    }

    set reference(ref: string) {
        this.#referenceField = ref;
    }
}

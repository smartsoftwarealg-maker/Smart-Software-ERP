import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ElementsInfo, ElementsInfoService} from '@ss/remuneration/elementsinfo';

export class ElementInfoLookupModel extends DefaultAutoCompleteModel<ElementsInfo> {
    constructor(private infoSrv: ElementsInfoService) {
        super(infoSrv);
    }
}

import { Injectable } from '@angular/core';
import { DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { Lookup, DepartmentService, DivisionService, ServiceService } from '@ss/common/api-lookup';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class DivisionsAutoCompleteModel extends DefaultAutoCompleteModel<Lookup> {

    constructor(srv: HttpService) {
        super(new DivisionService(srv));
    }
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentAutoCompleteModel extends DefaultAutoCompleteModel<Lookup> {

    constructor(srv: HttpService) {
        super(new DepartmentService(srv));
    }
}

@Injectable({
    providedIn: 'root'
})
export class ServiceAutoCompleteModel extends DefaultAutoCompleteModel<Lookup> {

    constructor(srv: HttpService) {
        super(new ServiceService(srv));
    }
}

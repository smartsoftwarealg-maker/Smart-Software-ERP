import { Injectable } from '@angular/core';
import { DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { Lookup, DepartmentsService, DivisionService, ServicesService } from './internal.services';
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
        super(new DepartmentsService(srv));
    }
}

@Injectable({
    providedIn: 'root'
})
export class ServiceAutoCompleteModel extends DefaultAutoCompleteModel<Lookup> {

    constructor(srv: HttpService) {
        super(new ServicesService(srv));
    }
}
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';

export interface Lookup {
    id: number;
    description: string;
}

export class DivisionService extends BaseEntityService<Lookup> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/lookups/superdepartments');
    }

}

export class DepartmentsService extends BaseEntityService<Lookup> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/lookups/departments');
    }

}

export class ServicesService extends BaseEntityService<Lookup> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/lookups/services');
    }

}

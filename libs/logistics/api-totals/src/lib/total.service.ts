import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Total, TOTAL_URL} from './total-api';
import {BaseEntityService} from '@ss/common/api-base-entity';


@Injectable({
    providedIn: 'root'
})
export class TotalService extends BaseEntityService<Total> {


    constructor(protected httpSrv: HttpService) {
        super(httpSrv, TOTAL_URL);
    }


    setParentsIds(documentId: number, documentURL: string) {
        this.parentId = documentId;
        this.parentUrl = documentURL;
    }

    // the parent url changes
    setParentId(id: number) {
        throw Error("Don't use this to set the parent url use you need to provide the parent url too");
    }

}

import {Injectable} from '@angular/core';
import {Agent} from 'smart-shared';
import {Observable, of} from 'rxjs';
import {PaginationModel} from '../../common/pagination/pagination.component';
import {AutoCompleteModel} from '../../common/auto-complete/auto-complete-model';

@Injectable()
export class ClientsService {

    public pagination = PaginationModel.newInstance();
    private activeEntity: Agent;

    setActiveEntity(a: Agent) {
        this.activeEntity = a;
    }

    getActiveEntity() {
        const e = this.activeEntity;
        this.activeEntity = null;
        return e;
    }

    load(): Observable<any> {
         return of(null);
    }
}

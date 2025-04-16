import { BaseEntityExtendedService, BaseEntityService } from '@ss/common/api-base-entity';
import { Agent } from '@ss/logistics/api-agent';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationModel } from '@ss/common/api-common';

export class BaseAgentClass extends BaseEntityExtendedService<Agent> {
    #_activeOnly = false;

    toggle() {
        this.#_activeOnly = !this.#_activeOnly;
    }
    set  activeOnly(activeOnly: boolean) {
        this.#_activeOnly = activeOnly;
    }
    get activeOnly(): boolean {
        return this.#_activeOnly;
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: Agent[]
    }> {
        return super.getList(page, pageSize, (this.#_activeOnly? (filter?? '') + '__a__' : filter), sortBy, extraPrams);
    }
}

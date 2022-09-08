import { Pipe, PipeTransform } from '@angular/core';
import { AgentService } from './agent.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({ name: 'denomination' })
export class AgentDenominationPipe implements PipeTransform {

    constructor(private agentSrv: AgentService) { }

    transform(id: number): Observable<string> {
        return this.agentSrv.get(id)
            .pipe(
                map(a => a.denomination),
                catchError(() => '')
            );
    }
}

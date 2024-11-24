import { Pipe, PipeTransform } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BankService } from './bank.service';

@Pipe({
    name: 'bankDescription',
    standalone: true
})
export class BankDescriptionPipe implements PipeTransform {

    constructor(private agentSrv: BankService) { }

    transform(id: number): Observable<string> {
        return this.agentSrv.get(id)
            .pipe(
                map(a => a.description),
                catchError(() => '')
            );
    }
}

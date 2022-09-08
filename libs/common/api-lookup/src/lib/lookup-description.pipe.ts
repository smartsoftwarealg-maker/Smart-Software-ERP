import { Pipe, PipeTransform } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/logistics/ui-doc-import';

@Pipe({ name: 'lookup' })
export class LookupDescriptionPipe implements PipeTransform {

    constructor(private httpSrv: HttpService) { }

    transform(id: number, url: string): Observable<string> {
        if (!id) {
            return of(null);
        }
        return this.httpSrv.get<Lookup>(url + '/' + id)
            .pipe(
                map(a => a.description),
                catchError(() => '')
            );
    }
}

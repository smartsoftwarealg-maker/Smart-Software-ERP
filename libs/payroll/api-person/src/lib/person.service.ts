import {Injectable} from '@angular/core';
import {Person, PERSONS_PHOTO_URL, PERSONS_URL} from './person-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class  PersonService extends BaseEntityService<Person> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, PERSONS_URL);
    }

    public loadPhoto(id: number): Observable<Blob> {
        return this.httpSrv.getBlob(PERSONS_URL + '/' + id + PERSONS_PHOTO_URL);
    }

    public getPhotoUrl(id: number): string {
        return id && id > 0 ? (PERSONS_URL + '/' + id + PERSONS_PHOTO_URL) : null;
    }
}

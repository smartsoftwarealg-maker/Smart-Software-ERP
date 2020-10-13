import {Injectable} from '@angular/core';
import {LookupsCacheService} from '@ss/common/api-lookup';
import {
    DIPLOMAS_URL,
    Diploma,
    EDUCATION_LEVEL_URL,
    EducationLevel,
    MARITAL_STATUS_URL,
    MaritalStatus,
    NATIONALITIES_URL,
    Nationality,
    SERVICES_URL,
    Service,
    CATEGORIES_URL,
    Category,
    POSTS_URL,
    Post, MilitaryServiceState, MILITARY_SERVICE_STATES
} from './lookups-api';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PayrollLookupsService {

    constructor(private lookupCacheSrv: LookupsCacheService) {
    }

    public getMaritalStatuses(): Observable<MaritalStatus[]> {
        return this.lookupCacheSrv.load<MaritalStatus>(MARITAL_STATUS_URL, 'maritalStatuses');
    }

    public getDiplomas(): Observable<Diploma[]> {
        return this.lookupCacheSrv.load<Diploma>(DIPLOMAS_URL, 'diplomas');
    }

    public getEducationLevels(): Observable<EducationLevel[]> {
        return this.lookupCacheSrv.load<Diploma>(EDUCATION_LEVEL_URL, 'educationLevels');
    }

    public getNationalities(): Observable<Nationality[]> {
        return this.lookupCacheSrv.load<Nationality>(NATIONALITIES_URL, 'educationLevels');
    }

    public getServices(): Observable<Service[]> {
        return this.lookupCacheSrv.load<Service>(SERVICES_URL, 'services');
    }

    public getCategories(): Observable<Category[]> {
        return this.lookupCacheSrv.load<Category>(CATEGORIES_URL, 'categories');
    }

    public getPosts(): Observable<Post[]> {
        return this.lookupCacheSrv.load<Post>(POSTS_URL, 'posts');
    }

    public getMilitaryServiceStates(): Observable<MilitaryServiceState[]> {
        return of(MILITARY_SERVICE_STATES);
    }
}

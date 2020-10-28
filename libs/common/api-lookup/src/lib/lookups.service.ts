import {LookupsCacheService} from './lookups-cache.service';
import {Observable, of} from 'rxjs';
import {Injectable} from "@angular/core";
import {
    Mark,
    MARKS_URL,
    Vat,
    VATS_URL,
    Wilaya,
    WILAYAS_URL,
    CATEGORIES_URL,
    Category,
    Diploma,
    DIPLOMAS_URL,
    EDUCATION_LEVEL_URL,
    EducationLevel,
    MARITAL_STATUS_URL,
    MaritalStatus,
    MILITARY_SERVICE_STATES,
    MilitaryServiceState,
    NATIONALITIES_URL,
    Nationality,
    Post,
    POSTS_URL,
    Service,
    SERVICES_URL,
    AgentType,
    AGENT_TYPE_URL,
    City,
    CITY_URL,
    Country,
    COUNTRY_URL,
    CompanyType,
    Currency,
    COMPANY_TYPE_URL,
    CURRENCY_URL,
    PayMode,
    PAY_MODE_URL, Activity, ACTIVITY_URL
} from './lookups-api';

@Injectable({
    providedIn: 'root'
})
export class LookupsService {

    constructor(private lookupCacheSrv: LookupsCacheService) {
    }

    public getVats(): Observable<Vat[]> {
        return this.lookupCacheSrv.load<Vat>(VATS_URL, 'vats');
    }

    public getWilaya(): Observable<Wilaya[]> {
        return this.lookupCacheSrv.load<Wilaya>(WILAYAS_URL, 'wilayas');
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

    public getMarks(): Observable<Mark[]> {
        return this.lookupCacheSrv.load<Mark>(MARKS_URL, 'marks');
    }

    public getAgentTypes(): Observable<AgentType[]> {
        return this.lookupCacheSrv.load<AgentType>(AGENT_TYPE_URL, "agentTypes");
    }

    public getCities(): Observable<City[]> {
        return this.lookupCacheSrv.load<City>(CITY_URL, "cities");
    }

    public getCountries(): Observable<Country[]> {
        return this.lookupCacheSrv.load<Country>(COUNTRY_URL, "countries");
    }

    public getCompanyTypes(): Observable<CompanyType[]> {
        return this.lookupCacheSrv.load<CompanyType>(COMPANY_TYPE_URL, "companyTypes");
    }

    public getCurrencies(): Observable<Currency[]> {
        return this.lookupCacheSrv.load<Currency>(CURRENCY_URL, "currencies");
    }

    public getPayModes(): Observable<PayMode[]> {
        return this.lookupCacheSrv.load<PayMode>(PAY_MODE_URL, "payModes");
    }

    public getActivities(): Observable<Activity[]> {
        return this.lookupCacheSrv.load<Activity>(ACTIVITY_URL, "activities");
    }

}

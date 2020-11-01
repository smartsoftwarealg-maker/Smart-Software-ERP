import {LookupsCacheService} from './lookups-cache.service';
import {Observable, of} from 'rxjs';
import {Injectable} from "@angular/core";
import {
    Activity,
    ACTIVITY_URL,
    AGENT_TYPE_URL,
    AgentType,
    CATEGORIES_URL,
    Category,
    City,
    CITY_URL,
    COMPANY_TYPE_URL,
    CompanyType,
    Country,
    COUNTRY_URL,
    Currency,
    CURRENCY_URL,
    Diploma,
    DIPLOMAS_URL,
    EDUCATION_LEVEL_URL,
    EducationLevel,
    MARITAL_STATUS_URL,
    MaritalStatus,
    Mark,
    MARKS_URL,
    MILITARY_SERVICE_STATES,
    MilitaryServiceState,
    NATIONALITIES_URL,
    Nationality,
    PAY_MODE_URL,
    PayMode,
    Post,
    POSTS_URL,
    Price, AGENT_PRICES_URL,
    Service,
    SERVICES_URL,
    Vat,
    VATS_URL,
    Wilaya,
    WILAYAS_URL
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

    public getPrices(): Observable<Price[]> {
        return this.lookupCacheSrv.load<Price>(AGENT_PRICES_URL, "agentprices");
    }

}

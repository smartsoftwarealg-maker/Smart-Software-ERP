import { LookupsCacheService } from './lookups-cache.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {Activity, ACTIVITY_URL, AGENT_PRICES_URL, AGENT_TYPE_URL, AgentType, Bank, BANKS_URL, CATEGORIES_URL, Category, City, CITY_URL, COMPANY_TYPE_URL, CompanyType, Country, COUNTRY_URL, Currency, CURRENCY_URL, Diploma, DIPLOMAS_URL, EDUCATION_LEVEL_URL, EducationLevel, MARITAL_STATUS_URL, MaritalStatus, Mark, MARKS_URL, MILITARY_SERVICE_STATES, MilitaryServiceState, NATIONALITIES_URL, Nationality, PAY_MODE_URL, PayMode, Post, POSTS_URL, AgentPrice, Service, SERVICES_URL, Vat, VATS_URL, Wilaya, WILAYAS_URL, Fund, FUNDS_URL, CC_GROUP_URL, CCGroup, EmploymentType, EMPLOYMENT_TYPE_URL, SuspensionReason, SUSPENSION_REASON_URL, ROLES_URL, Department, DEPARTMENTS_URL, Division, DIVISIONS_URL, Unit, UNIT_URL, CATEGORY_URL, SALES_CATEGORY_URL, Language, LanguageLevel, LANGUAGES_URL, LANGUAGE_LEVELS_URL, JOURNAL_TYPES_URL, WORKSHOPS_URL, LOOKUPS_APPLICATIONS_URL, JournalType} from './lookups-api';
import { Role } from '@ss/common/api-common';
import {Lookup} from '@ss/logistics/ui-doc-import';

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

    public getApplicationList(): Observable<Lookup[]> {
        return this.lookupCacheSrv.load<Lookup>(LOOKUPS_APPLICATIONS_URL, 'applications');
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

    public getUnits(): Observable<Unit[]> {
        return this.lookupCacheSrv.load<Mark>(UNIT_URL, 'units');
    }

    public getAgentTypes(): Observable<AgentType[]> {
        return this.lookupCacheSrv.load<AgentType>(AGENT_TYPE_URL, 'agentTypes');
    }

    public getCities(): Observable<City[]> {
        return this.lookupCacheSrv.load<City>(CITY_URL, 'cities');
    }

    public getCountries(): Observable<Country[]> {
        return this.lookupCacheSrv.load<Country>(COUNTRY_URL, 'countries');
    }

    public getCompanyTypes(): Observable<CompanyType[]> {
        return this.lookupCacheSrv.load<CompanyType>(COMPANY_TYPE_URL, 'companyTypes');
    }

    public getCurrencies(): Observable<Currency[]> {
        return this.lookupCacheSrv.load<Currency>(CURRENCY_URL, 'currencies');
    }

    public getPayModes(): Observable<PayMode[]> {
        return this.lookupCacheSrv.load<PayMode>(PAY_MODE_URL, 'payModes');
    }

    public getActivities(): Observable<Activity[]> {
        return this.lookupCacheSrv.load<Activity>(ACTIVITY_URL, 'activities');
    }

    public getPrices(): Observable<AgentPrice[]> {
        return this.lookupCacheSrv.load<AgentPrice>(AGENT_PRICES_URL, 'agentprices');
    }

    public getBanks(): Observable<Bank[]> {
        return this.lookupCacheSrv.load<Bank>(BANKS_URL, 'banks');
    }

    public getSalesCategories(): Observable<Bank[]> {
        return this.lookupCacheSrv.load<Category>(SALES_CATEGORY_URL, 'sales-categories');
    }


    public getFunds(): Observable<Fund[]> {
        return this.lookupCacheSrv.load<Fund>(FUNDS_URL, 'funds');
    }

    public getRoles(): Observable<Role[]> {
        return this.lookupCacheSrv.load<Fund>(ROLES_URL, 'roles');
    }

    public getCCGroups(): Observable<CCGroup[]> {
        return this.lookupCacheSrv.load<CCGroup>(CC_GROUP_URL, 'cc_groups');
    }

    public getEmploymentTypes(): Observable<EmploymentType[]> {
        return this.lookupCacheSrv.load<EmploymentType>(EMPLOYMENT_TYPE_URL, 'employmentTypes');
    }

    public getSuspensionReasons(): Observable<SuspensionReason[]> {
        return this.lookupCacheSrv.load<EmploymentType>(SUSPENSION_REASON_URL, 'suspensionReason');
    }

    public getDepartments(): Observable<Department[]> {
        return this.lookupCacheSrv.load<Department>(DEPARTMENTS_URL, 'departments')
    }

    public getWorkshops(): Observable<Lookup[]> {
        return this.lookupCacheSrv.load<Lookup>(WORKSHOPS_URL, 'workshops')
    }

    public getDivisions(): Observable<Division[]> {
        return this.lookupCacheSrv.load<Division>(DIVISIONS_URL, 'divisions')
    }

    public getTable(url, table: string): Observable<Lookup[]> {
        return this.lookupCacheSrv.load<Lookup>(url, table);
    }

    public getLanguages(): Observable<Language[]> {
        return this.lookupCacheSrv.load(LANGUAGES_URL, 'languages');
    }

    public getLanguageLevels(): Observable<LanguageLevel[]> {
        return this.lookupCacheSrv.load(LANGUAGE_LEVELS_URL, 'languageLevels');
    }

    public getJournalTypes(): Observable<JournalType[]> {
        return this.lookupCacheSrv.load(JOURNAL_TYPES_URL, 'trsJournalTypes');
    }
}

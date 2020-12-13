
export const VATS_URL = '/vats';
export const MARITAL_STATUS_URL = '/lookups/marital_status';
export const WILAYAS_URL = '/lookups/wilayas';
export const NATIONALITIES_URL = '/lookups/nationalities';

export const EDUCATION_LEVEL_URL = '/educlevels';
export const DIPLOMAS_URL = '/diplomas';
export const POSTS_URL = '/posts';
export const CATEGORIES_URL = '/categories';
export const SERVICES_URL = '/services';

export const MARKS_URL = '/lookups/marks';
export const CLASSES_URL = '/lookups/classes';
export const SUBCLASSES_URL = '/lookups/subclasses';
export const STORE_NAMES_URL = '/storeNames';
export const UNITS_URL = '/units'; // todo: add to backend because it is missing
export const AGENT_TYPE_URL = "/lookups/agents";
export const CITY_URL = "/lookups/cities";
export const COUNTRY_URL = "/lookups/countries";
export const CURRENCY_URL = "/lookups/currencies";
export const COMPANY_TYPE_URL = "/lookups/companies";
export const PAY_MODE_URL = "/lookups/paymodes";
export const ACTIVITY_URL = "/lookups/activities";
export const FUNDS_URL = '/lookups/funds';
export const BANKS_URL = '/banks';
export const AGENT_PRICES_URL = '/inventory/agentprices';
export const CC_GROUP_URL = '/lookups/ccenter_groups';


export interface Wilaya {
    id: number;
    description: string;
}

export interface Vat {
    id: number;
    value: number;
}

export class MaritalStatus {
    id: number;
    description: string;
}

export class Nationality {
    id: number;
    description: string;
}

export class EducationLevel {
    id: number;
    description: string;
}

export class Diploma {
    id: number;
    description: string;
}

export class Post {
    id: number;
    description: string;
}

export class Category {
    id: number;
    description: string;
}

export class Service {
    id: number;
    description: string;
}

export class MilitaryServiceState {
    id: number;
    description: string;
}

export const MILITARY_SERVICE_STATES: MilitaryServiceState[] = [
    {id: 0, description: 'PAYROLL_MSRV_FREEMAN'},
    {id: 1, description: 'PAYROLL_MSRV_ENSLAVED'},
    {id: 2, description: 'PAYROLL_MSRV_EXEMPTED'},
    {id: 3, description: 'PAYROLL_MSRV_UNFIT'}
];


export interface Mark {
    id: number;
    description: string;
}

export interface Class {
    id: number;
    description: string;
}

export interface Subclass {
    id: number;
    description: string;
}

export interface StoreName {
    id: number;
    description: string;
}

export interface Unit {
    id: number;
    description: string;
}

export interface AgentType {
    id: number;
    description: string;
}

export interface City {
    id: number;
    description: string;
}

export interface Country {
    id: number;
    description: string;
}

export interface Currency {
    id: number;
    description: string;
}

export interface CompanyType {
    id: number;
    description: string;
}

export interface PayMode {
    id: number;
    description: string;
}

export interface Activity {
    id: number;
    description: string;
}

export interface Bank {
    id: number;
    description: string;
}

export interface AgentPrice {
    id: number;
    centerId: number;
    description: string;
    descriptionAr: string;
}

export interface Fund {
    id: number;
    description: string;
}

export interface CCGroup {
    id: number;
    description: string;
}

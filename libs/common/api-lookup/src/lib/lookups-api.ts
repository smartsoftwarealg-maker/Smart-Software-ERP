export const BUILDINGS = '/buildings';
export const OFFICES = '/offices';
export const VATS_URL = '/logistics/vats';
export const MARITAL_STATUS_URL = '/lookups/marital_status';
export const CAREER_MOTIVE_URL = '/lookups/career_motives';
export const LOOKUPS_APPLICATIONS_URL = '/lookups/erp_applications';
export const WILAYAS_URL = '/lookups/wilayas';
export const BLOOD_GROUP_URL = '/lookups/blood_groups';
export const NATIONALITIES_URL = '/lookups/nationalities';
export const VEHICLE_TYPES = '/lookups/vehicle_types';
export const FUEL_TYPES = '/lookups/fuel_types';
export const INSURANCE_POLICIES = '/lookups/park_insurance_policies';
export const INSURANCE_AGENCIES = '/lookups/park_insurance_agencies';

export const EDUCATION_LEVEL_URL = '/lookups/educationlevels';
export const DIPLOMAS_URL = '/lookups/diplomas';
export const PUNISHMENT_TYPE_URL = '/lookups/punishmenttypes';
export const PROFESSIONAL_FAULT_URL = '/lookups/professionalfaults';
export const POSTS_URL = '/posts';
export const ACTIVE_POSTS_URL = '/active-posts';
export const CATEGORIES_URL = '/lookups/categories';
export const FORMS_URL = '/lookups/forms';
export const EMPLOYMENT_TYPE_URL = '/lookups/employment_type';
export const SUSPENSION_REASON_URL = '/lookups/suspensionreasons';
export const JOURNAL_TYPES_URL = '/lookups/journal_types';

export const DIVISIONS_URL = '/organizations/divisions';
export const DEPARTMENTS_URL = '/organizations/departments';
export const SERVICES_URL = '/organizations/services';
export const OFFICES_URL = '/organizations/offices';
export const BUILDINGS_URL = '/organizations/buildings';
export const FLOORS_URL = '/organizations/floors';

export const APP_ARCHIVE_DOCUMENTS_URL = '/lookups/archive_documents';
export const MARKS_URL = '/lookups/marks';
export const OS_URL = '/lookups/os_es';
export const ARTICLE_TYPE_URL = '/lookups/article_types';
export const TREASURY_GROUP_URL = '/lookups/treasury_groups';
export const DAIRA_URL = '/lookups/regions';
export const TYPES_URL = '/lookups/types';
export const UNIT_URL = '/lookups/units';
export const CLASSES_URL = '/classes';
export const SUBCLASSES_URL = '/lookups/subclasses';
export const LOTS_URL = '/lots';
export const UNITS_URL = '/lookups/units';
export const AGENT_TYPE_URL = '/lookups/agents';
export const CITY_URL = '/cities';
export const COUNTRY_URL = '/lookups/countries';
export const CURRENCY_URL = '/currencies';
export const COMPANY_TYPE_URL = '/lookups/companies';
export const PROJECT_TYPE_URL = '/lookups/project_types';
export const PROJECT_MOTIVE_URL = '/lookups/project_motives';
export const AWARD_PROCEDURE_URL = '/lookups/award_procedures';
export const PAY_MODE_URL = '/lookups/paymodes';
export const ACTIVITY_URL = '/lookups/activities';
export const DELIVERY_TIME_URL = '/lookups/delivery_times';
export const DISCOUNT_URL = '/lookups/discounts';
export const SECTOR_URL = '/lookups/sectors';
export const WORK_MASTER_URL = '/lookups/master_works';
export const FUNDS_URL = '/lookups/funds';
export const ROLES_URL = '/lookups/roles';
export const BANKS_URL = '/banks';
export const SALES_CATEGORY_URL = '/lookups/sales_categories';
export const CATEGORY_URL = '/lookups/categories';
export const AGENT_PRICES_URL = '/logistics/prices';
export const CC_GROUP_URL = '/lookups/ccenter_groups';
export const LANGUAGES_URL = '/lookups/languages';
export const LANGUAGE_LEVELS_URL = '/lookups/language_levels';
export const DESTINATIONS_URL = '/lookups/destinations';


export const WORKSHOPS_URL = '/lookups/workshops';

export interface Wilaya {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface Vat {
    description?: string;
    descriptionAr?: string;
    id: number;
    value: number;
}

export class MaritalStatus {
    id: number;
    description: string;
    descriptionAr?: string;
}

export class Nationality {
    id: number;
    description: string;
    descriptionAr?: string;
}

export class EducationLevel {
    id: number;
    description: string;
    descriptionAr?: string;
}

export class Diploma {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface PostElement {
    id: number;
    parentId: number;
    element: string,
    description: string;
    amount: number;
}

export class Post {
    id: number;
    description: string;
    descriptionAr?: string;
    blocked: boolean;
    grid?: number;
}

export class Category {
    id: number;
    description: string;
    descriptionAr?: string;
}


export class MilitaryServiceState {
    id: number;
    description: string;
    descriptionAr?: string;
}

export class Language {
    id: number;
    description: string;
    descriptionAr?: string;
}

export class LanguageLevel {
    id: number;
    description: string;
    descriptionAr?: string;
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
    descriptionAr?: string;
}

export interface Class {
    id: number;
    description: string;
    descriptionAr?: string;
    accountId?: number;
    accountno?: string;
    accountName?: string;
}

export interface Subclass {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface Lot {
    id: number;
    storeId: number;
    description: string,
    descriptionAr?: string,
    supplier?: number;
    lotNumber?: number;
    supplierLot?: string;
    creationDate?: Date;
    expires: boolean;
    expirationDate?: Date;
    lotState?: string;
    team?: string;
    center?: number;
    supplierDescription?: string;
    memo?: string;
    analyzed?:boolean;
    analysisDate?: Date;
}

// export interface Lot {
//     id: number;
//     center: number;
//     storeId?: number;
//     description: string;
//     expires: boolean;
// }

export interface Unit {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface AgentType {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface City {
    id: number;
    description: string;
    postalCode?: string;
    descriptionAr?: string;
    wilaya?: number;
    wilayaDescription?: string;
    daira?: number;
    dairaDescription?: string;
}

export interface Country {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface Currency {
    id: number;
    description: string;
    code?: string;
    descriptionAr?: string;
    exchangeRate?: number;
}

export interface CompanyType {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface PayMode {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface PayMethod {
    id: number;
    description: string;
    payMode: number;
    modeDescription?: string;
}

export interface Activity {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface Bank {
    id: number;
    description: string;
    descriptionAr?: string;
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
    descriptionAr?: string;
}

export interface CCGroup {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface EmploymentType {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface SuspensionReason {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface Department {
    id: number;
    description: string;
    descriptionAr?: string;
    responsible: number;
    responsibleName?: string;
}

export interface Division {
    id: number;
    description: string;
    descriptionAr?: string;
    responsible: number;
    responsibleName?: string;
}

export interface Service {
    id: number;
    description: string;
    descriptionAr?: string;
    responsible: number;
    responsibleName?: string;
}

export interface Office {
    id: number;
    description: string;
    descriptionAr?: string;
    center?: number;
    floorNo: number;
    location?: number;
    code?: string;
    buildingId?: number;
    locationDescription?: string;
    locationCode?: string;
    buildingCode?: string;
    buildingDescription?: string;
    cmms?: boolean;
}

export interface JournalType {
    id: number;
    description: string;
    descriptionAr?: string;
}

export interface Destination {
    id: number;
    description: string;
    descriptionAr?: string;
}

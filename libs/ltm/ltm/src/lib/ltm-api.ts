export const LTM_TESTINGS_URL    = '/ltm/testings';
export const LTM_LINE_URL        = '/ltm/lines';
export const LTM_ABNORMAL_TESTS_URL        = '/ltm/abnormal-tests';
export const LTM_MIXTURE_URL        = '/ltm/mixtures';
export const LTM_ANOMALIES_URL        = '/ltm/anomalies';
export const LTM_EQUIPMENT_URL        = '/lookups/ltm_equipment';
export const LTM_BLEACHER_URL        = '/lookups/ltm_bleachers';
export const LTM_ZONE_URL        = '/lookups/ltm_zones';
export const LTM_DEPOSIT_URL        = '/lookups/ltm_deposits';
export const LTM_CORRECTIONS_ACTIONS_URL        = '/lookups/ltm_correction_actions';
export const LTM_SUPPLIER_URL        = '/lookups/ltm_suppliers';
export const LTM_NORM_URL        = '/lookups/ltm_norms';
export const LTM_PRODUCT_LOOKUP_URL        = '/lookups/ltm_products';
export const LTM_PRODUCTS_URL        = '/ltm/products';
export const LTM_PICKUP_POINTS_URL        = '/ltm/pickup-points';
export const LTM_PICKUP_POINTS_CHILD_URL        = '/pickup-points';
export const LTM_TESTING_ANOMALIES_URL        = '/ltm/testing-anomalies';
export const LTM_MIXTURE_DETAIL_URL        = '/detail';
export const LTM_LINE_TYPE_URL        = '/lookups/ltm_test_types';
export const LTM_TEST_URL        = '/ltm/tests';
export const LTM_BATCH_URL       = '/ltm/batch';
export const LTM_TESTING_URL    = '/testings';
export const LTM_PHYSICAL_TESTING_URL    = '/physical-testings';
export const LTM_DEPOSIT_TESTING_URL    = '/deposit-testings';
export const LTM_RM_TESTING_URL    = '/rm-testings';
export const LTM_INJECTION_URL   = '/ltm/injection';
export const LTM_MATTER_URL      = '/ltm/matters';
export const LTM_LINE_MATTER_URL      = '/ltm/line-matters';
export const LTM_CENTER_MATTER_URL      = '/ltm/center-matters';
export const LRM_PERIODICITY_URL = '/lookups/ltm_periodicities';
export const LTM_LINE_SELECT_URL = '/ltm/ltm_selection';
export const LTM_SAMPLES_URL = '/ltm/samples';
export const LTM_LINES_URL = '/lines';
export const LTM_NORM_TREE_URL     = '/ltm/norm-tree';



export interface LTMMixture {
    id: number;
    centerId: number;
    orderNo: number;
    description: string;
    descriptionAr?: string;
}

export interface LTMAnomaly {
    id: number;
    centerId: number;
    description: string;
    descriptionAr?: string;
}
export interface LTMTestingAnomaly {
    id: number;
    centerId: number;
    date: Date;
    matterId: number;
    anomalyId: number;
    userId: number;
    pickupPoint?: number;
    memo?: string;
    anomalyDescription?: string;
    userDescription?: string;
    matterDescription?: string;
    pickupPointDescription?: string;
}

export interface LTMMixtureDetail {
    id: number;
    parentId: number;
    matterId: number;
    matterDescription?: string;
}

export interface LTMLine {
    id: number;
    centerId: number;
    description: string;
    descriptionAr?: string
}

export interface LTMLineMatter {
    id: number;
    centerId: number;
    matterId: number;
    description?: string;
    matterDescription?: string;
    norm?: number;
    min?: number;
    max?: number;
    normMin?: number;
    normMax?: number;
}

export interface LTMMatter {
    id: number,
    description: string;
    descriptionAr?: string;
    code?: string;
    name?: string;
}

export interface LTMTest {
    id: number;
    description: string;
    descriptionAr?: string;
    variable?: string;
    formula?: string;
    chemicalFormula?: string;
    showGraph: boolean;
    showInCertificate: boolean;
    varianceControl: boolean;
    showKPI: boolean;
    testType?: number;
    unit?: number;
    min?: number;
    max: number;
}

export interface LTMMatterTest {
    id: number;
    centerId: number;
    parentId: number;
    testId: number;
    periodDescription?: string;
    testDescription?: string;
    periodicity: number;
    minValue: number;
    optValue: number;
    maxValue: number;
    normMin?: number;
    normMax?: number;
    variable?: string;
    formula?: string;
    orderNo: number;
    varianceControl: boolean;
}


export interface LTMTestingLine {
    id: number;
    parentId: number; //testing_id
    testId: number;
    value: number;
    testDescription?: string;
    orderNo?: number;
}

export interface MLTMTestingLine {
    id: number;
    parentId: number; //testing_id
    testId: number;
    value: number;
}

export interface LTMBatch {
    id: number;
    centerId: number;
    parentId: number;
    timeStamp: Date|string;
    hour?: number;
    sampleNo?: string;
    spoilageHour?: number;
    breakageHour?: number;
    silo?: number;
    equipment?: number;
    bleacher?: number;
    zone?: number;
    deposit?: number;
    pickupPoint?: number;
    supplier?: number;
    userId: number;
    testType: number;
    creationTime: Date;
    tests: LTMTestingLine[];
}

export interface Data {
    time: string;
    key?: string;
    testId: number;
    description: string;
    value: number;
    minValue: number;
    maxValue: number;
}
export interface LTMTesting {
    id: number;
    centerId: number;
    parentId: number; //Matter id
    timeStamp: Date;
    creationTime: Date;
    userId?: number;
    matter?: string;
    sampleNo?: string;
    spoilageHour: Date;
    breakageHour: Date;
    silo: number;
    matterDescription?:string;
    siloDescription?:string;
    pickupDescription?:string;
    equipmentDescription?: string;
    zoneDescription?: string;
    supplierDescription?: string;
    depositDescription?: string;}

export interface LTMTestInjection {
    line: number;
    matter: number;
}

// export interface BTest {
//     id?: number;
//     parentId: number;
//     testId: number;
//     value: number;
// }


export interface INJResult {
    found: string[];
    missing: string[];
}

export interface LTMAbnormalTest {
    id: number;
    matter: string;
    time: Date;
    test: string;
    value: number;
    min: number;
    max: number;
    memo?: string;
    reportedBy?: number;
    correctionAction?: number;
    normId?: number;
    actionNo?: string;
    pickPoint?: string;
}

export interface LTMProduct {
    id: number
    description: string,
    code?: string;
    descriptionAr?: string;
}

export interface LTMPickupPoint {
    id: number;
    description: string,
    descriptionAr?: string;
    equipmentId?: number;
    bleacherId?: number;
    zoneId?: number;
    equipmentDescription?: string;
    bleacherDescription?: string;
    zoneDescription?: string
}

export interface LTMMixturePickupPoint {
    id: number;
    parentId: number;
    pickupPoint: number;
    pickPointDescription?: string;
}

export interface TestNorm {
    test: string;
    min: number;
    max: number;
}

export interface NormTree {
    id: number;
    matter: string;
    testNorm: TestNorm[];
    expanded?: boolean;
}

export interface LTMTestSchedule {
    id: number;
    parentId: number;
    dueDay: number;
    startDate?: Date;
    testDate?: Date;
    nextDate: Date;
}

export const CHEMICAL_TEST = 1;
export const PHYSICAL_TEST = 2;
export const DEPOSIT_TEST = 3;
export const RAW_MATERIAL_TEST = 4;



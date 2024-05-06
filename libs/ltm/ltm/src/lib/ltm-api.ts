export const LTM_TESTINGS_URL    = '/ltm/testings';
export const LTM_LINE_URL        = '/ltm/lines';
export const LTM_ABNORMAL_TESTS_URL        = '/ltm/abnormal-tests';
export const LTM_MIXTURE_URL        = '/ltm/mixtures';
export const LTM_ANOMALIES_URL        = '/ltm/anomalies';
export const LTM_EQUIPMENTS_URL        = '/lookups/ltm_equipment';
export const LTM_PRODUCTS_URL        = '/lookups/ltm_products';
export const LTM_TESTING_ANOMALIES_URL        = '/ltm/testing-anomalies';
export const LTM_MIXTURE_DETAIL_URL        = '/detail';
export const LTM_LINE_TYPE_URL        = '/lookups/ltm_test_types';
export const LTM_TEST_URL        = '/ltm/tests';
export const LTM_BATCH_URL       = '/ltm/batch';
export const LTM_TESTING_URL    = '/testings';
export const LTM_INJECTION_URL   = '/ltm/injection';
export const LTM_MATTER_URL      = '/ltm/matters';
export const LTM_LINE_MATTER_URL      = '/ltm/line-matters';
export const LRM_PERIODICITY_URL = '/lookups/ltm_periodicities';
export const LTM_LINE_SELECT_URL = '/ltm/ltm_selection';
export const LTM_SAMPLES_URL = '/ltm/samples';


export interface LTMMixture {
    id: number;
    centerId: number;
    orderNo: number;
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
    memo?: string;
    anomalyDescription?: string;
    userDescription?: string;
    matterDescription?: string;
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
    product?: number;
    equipment?: number;
    productDescription?: string;
    equipmentDescriptionAr?: string;
    min?: number;
    max?: number;
    normMin?: number;
    normMax?: number;
}

export interface LTMMatter {
    id: number,
    description: string;
    descriptionAr?: string;
}

export interface LTMTest {
    id: number;
    description: string;
    descriptionAr?: string;
    variable?: string;
    formula?: string;
    showGraph: boolean;
    showKPI: boolean;
    testType?: number;
    unit?: number;
    min?: number;
    max: number;
}

export interface LTMMatterTest {
    id: number;
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
    sampleNo?: string;
    spoilageHour?: number;
    breakageHour?: number;
    silo?: number;
    userId: number;
    creationTime: Date;
    tests: LTMTestingLine[];
}

export interface Data {
    key: string;
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
}

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
}

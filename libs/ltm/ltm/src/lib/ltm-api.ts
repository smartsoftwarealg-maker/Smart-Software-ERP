export const LTM_TESTINGS_URL    = '/ltm/testings';
export const LTM_LINE_URL        = '/ltm/lines';
export const LTM_TEST_URL        = '/ltm/tests';
export const LTM_LTM_LINE_URL    = '/ltm/ltm-lines';
export const LTM_INJECTION_URL   = '/ltm/injection';
export const LTM_MATTER_URL      = '/matters';
export const LRM_PERIODICITY_URL = '/lookups/ltm_periodicities';

export interface LTMLine {
    id: number;
    centerId: number;
    description: string,
    descriptionAr?: string
}

export interface LTMLineMatter {
    id: number;
    parentId: number;
    matterId: number;
    description?: string;
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
    maxValue: number
}

export interface LTMTesting {
    id: number;
    parentId: number;
    matterId: number;
    testId: number;
    timeStamp: Date;
    creationTime: Date;
    value: number;
    matter?: string;
    test?: string;
}

export interface LTMTestInjection {
    line: number;
    matter: number;
}

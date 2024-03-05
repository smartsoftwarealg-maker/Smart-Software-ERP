import {inject} from '@angular/core';
import {LtmLineGuard} from './services/ltm-line-guard';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';

export const LTM_TESTINGS_URL    = '/ltm/testings';
export const LTM_LINE_URL        = '/ltm/lines';
export const LTM_MIXTURE_URL        = '/ltm/mixtures';
export const LTM_MIXTURE_DETAIL_URL        = '/detail';
export const LTM_LINE_TYPE_URL        = '/lookups/ltm_test_types';
export const LTM_TEST_URL        = '/ltm/tests';
export const LTM_BATCH_URL       = '/ltm/batch';
export const LTM_INPUT_URL       = '/ltm/input';
export const LTM_TESTING_URL    = '/ltm/testings';
export const LTM_INJECTION_URL   = '/ltm/injection';
export const LTM_MATTER_URL      = '/ltm/matters';
export const LTM_LINE_MATTER_URL      = '/ltm/line-matters';
export const LRM_PERIODICITY_URL = '/lookups/ltm_periodicities';
export const LTM_LINE_SELECT_URL = '/ltm/ltm_selection';

export interface LTMMixture {
    id: number;
    lineId: number;
    description: string,
    descriptionAr?: string;
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
    description: string,
    descriptionAr?: string
}

export interface LTMLineMatter {
    id: number;
    centerId: number;
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
    variable?: string;
    formula?: string;
    showGraph: boolean;
    testType?: number;
    unit?: number;
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
    variable?: string;
    formula?: string;
    orderNo: number;
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
    matterId: number;
    testId: number;
    timeStamp: Date;
    creationTime: Date;
    value: number;
    userId?: number;
    matter?: string;
    test?: string;
}

export interface LTMTestInjection {
    line: number;
    matter: number;
}

export interface BTest {
    id?: number;
    testId: number;
    value: number;
}

export interface Batch {
    centerId: number;
    matterId: number;
    timeStamp: Date;
    tests: BTest[];
}

export interface INJResult {
    found: string[];
    missing: string[];
}

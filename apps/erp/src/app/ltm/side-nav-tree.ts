import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_HR_REPORTS_URL,
    ABS_LTM_BATCH_TESTINGS_URL,
    ABS_LTM_CHARTS_URL, ABS_LTM_DASHBOARD_URL, ABS_LTM_LINES_URL,
    ABS_LTM_MATTERS_URL,
    ABS_LTM_PERIODICITIES_URL, ABS_LTM_REPORTS_URL,
    ABS_LTM_TESTINGS_URL,
    ABS_LTM_TESTS_URL
} from "../common";

export const ltmNavTree: SideNavNode = {
    name: 'LTM',
    icon: 'fa-solid fa-flask',
    children: [
        {
            name: 'LTM_PERIODICITIES',
            icon: 'fa-solid fa-timeline-arrow',
            route: ABS_LTM_PERIODICITIES_URL,
            accessRights: 'LTMMPeriod'
        },
        {
            name: 'LTM_TEST',
            icon: 'fa-solid fa-flask-vial',
            route: ABS_LTM_TESTS_URL,
            accessRights: 'LTMTest'
        },

        {
            name: 'LTM_MATTERS',
            icon: 'fa-solid fa-recycle',
            route: ABS_LTM_MATTERS_URL,
            accessRights: 'LTMMatter'
        },

        {
            name: 'LTM_LINES',
            icon: 'fa-solid fa-xmarks-lines',
            route: ABS_LTM_LINES_URL,
            accessRights: 'LTMLine'
        },


        {
            name: 'LTM_TESTINGS',
            icon: 'fa-regular fa-vials',
            route: ABS_LTM_TESTINGS_URL,
            accessRights: 'LTMTesting'
        },

        {
            name: 'LTM_BATCH_TESTINGS',
            icon: 'fa-solid fa-clock-three-thirty',
            route: ABS_LTM_BATCH_TESTINGS_URL,
            accessRights: 'LTMTesting'
        },

        {
            name: 'COMMON_CHARTS',
            icon: 'fa-solid fa-chart-simple',
            route: ABS_LTM_CHARTS_URL,
            accessRights: 'LTMTesting'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_LTM_DASHBOARD_URL,
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_LTM_REPORTS_URL,
            accessRights: 'Report'
        },
    ],
    accessRights: 'LTM'
};

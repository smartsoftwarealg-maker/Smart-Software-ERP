import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_LTM_ALERT_URL,
    ABS_LTM_ANOMALY_URL,
    ABS_LTM_BATCH_TESTINGS_URL,
    ABS_LTM_CHARTS_URL,
    ABS_LTM_DASHBOARD_URL, ABS_LTM_EQUIPMENT_URL,
    ABS_LTM_LINES_URL,
    ABS_LTM_MATTERS_URL,
    ABS_LTM_MIXTURES_URL, ABS_LTM_NORM_URL,
    ABS_LTM_PERIODICITIES_URL, ABS_LTM_PICKUP_POINTS_URL, ABS_LTM_PRODUCT_URL,
    ABS_LTM_REPORTS_URL,
    ABS_LTM_SAMPLE_TESTINGS_URL, ABS_LTM_SILO_URL,
    ABS_LTM_TEST_TYPE_URL,
    ABS_LTM_TESTINGS_ANOMALIES_URL,
    ABS_LTM_TESTS_URL,
    ABS_LTM_UNIT_URL
} from '../common';

export const ltmNavTree: SideNavNode = {
    name: 'LTM',
    icon: 'fa-solid fa-flask',
    children: [
        {
            name: 'COMMON_UNITS',
            icon: 'fa-solid fa-puzzle-piece-simple',
            route: ABS_LTM_UNIT_URL,
            accessRights: 'LTMMPeriod'
        },
        {
            name: 'LTM_NORMS',
            icon: 'fa-solid fa-ruler-triangle',
            route: ABS_LTM_NORM_URL,
            accessRights: 'Silo'
        },
        {
            name: 'LTM_SILOS',
            icon: 'fa-solid fa-farm',
            route: ABS_LTM_SILO_URL,
            accessRights: 'Silo'
        },
        {
            name: 'COMMON_EQUIPMENT',
            icon: 'fa-solid fa-conveyor-belt-arm',
            route: ABS_LTM_EQUIPMENT_URL,
            accessRights: 'LTMEquipment'
        },
        {
            name: 'COMMON_PRODUCTS',
            icon: 'fa-solid fa-cart-shopping',
            route: ABS_LTM_PRODUCT_URL,
            accessRights: 'LTMProduct'
        },

        {
            name: 'LTM_PICKUP_POINTS',
            icon: 'fa-solid fa-truck-pickup',
            route: ABS_LTM_PICKUP_POINTS_URL,
            accessRights: 'LTMPickupPoint'
        },
        {
            name: 'LTM_ANOMALIES',
            icon: 'fa-regular fa-spider-black-widow',
            route: ABS_LTM_ANOMALY_URL,
            accessRights: 'LTMAnomaly'
        },
        {
            name: 'LTM_PERIODICITIES',
            icon: 'fa-solid fa-timeline-arrow',
            route: ABS_LTM_PERIODICITIES_URL,
            accessRights: 'LTMMPeriod'
        },
        {
            name: 'LTM_TEST_TYPES',
            icon: 'fa-thin fa-list-tree',
            route: ABS_LTM_TEST_TYPE_URL,
            accessRights: 'TestType'
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
            name: 'LTM_LINE_MATTERS',
            icon: 'fa-solid fa-xmarks-lines',
            route: ABS_LTM_LINES_URL,
            accessRights: 'LTMLineMatter'
        },

        {
            name: 'LTM_MIXTURES',
            icon: 'fa-duotone fa-blender',
            route: ABS_LTM_MIXTURES_URL,
            accessRights: 'LTMMixture'
        },

        {
            name: 'LTM_ALERTS',
            icon: 'fa-solid fa-sensor-triangle-exclamation',
            route: ABS_LTM_ALERT_URL,
            accessRights: 'LTMTesting'
        },

        {
            name: 'LTM_BATCH_TESTINGS',
            icon: 'fa-regular fa-vial',
            route: ABS_LTM_BATCH_TESTINGS_URL,
            accessRights: 'LTMTesting'
        },

        {
            name: 'LTM_SAMPLE_TESTINGS',
            icon: 'fa-regular fa-flask-gear',
            route: ABS_LTM_SAMPLE_TESTINGS_URL,
            accessRights: 'LTMTesting'
        },

        {
            name: 'LTM_TESTING_ANOMALIES',
            icon: 'fa-solid fa-circle-exclamation',
            route: ABS_LTM_TESTINGS_ANOMALIES_URL,
            accessRights: 'LTMTestingAnomaly'
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
            accessRights: 'Dashboard'
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

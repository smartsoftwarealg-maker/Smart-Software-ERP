import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_GICA_CONSTANTS_URL, ABS_GICA_CRITERIA_URL, ABS_GICA_DEGRADING_URL,
    ABS_GICA_FAULTS_URL, ABS_GICA_GRADING_URL,
    ABS_GICA_HISTORY_URL,
    ABS_GICA_MOTIVES_URL,
    ABS_GICA_REPORTS_URL,
    ABS_GICA_SCALE_URL
} from "../common";

export const gicaNavTree: SideNavNode = {
    name: 'GICACARRER',
    icon: 'fa-solid fa-stairs',
    children: [
        {
            name: 'PAYROLL_CAREER_CONSTANTS',
            icon: 'fa-duotone fa-function',
            route: ABS_GICA_CONSTANTS_URL,
            accessRights: 'GCConstant'
        },
        {
            name: 'PAYROLL_CRITERIA',
            icon: 'fa-solid fa-stars',
            route: ABS_GICA_CRITERIA_URL,
            accessRights: 'Criterion'
        },
        {
            name: 'COMMON_MOTIVES',
            icon: 'fa-solid fa-golf-flag-hole',
            route: ABS_GICA_MOTIVES_URL,
            accessRights: 'GCMotive'
        },
        {
            name: 'PAYROLL_SCALE',
            icon: 'fa-solid fa-scale-unbalanced',
            route: ABS_GICA_SCALE_URL,
            accessRights: 'GCScale'
        },
        {
            name: 'PAYROLL_CAREER_FAULTS',
            icon: 'fa-solid fa-circle-exclamation',
            route: ABS_GICA_FAULTS_URL,
            accessRights: 'GCFault'
        },

        {
            name: 'PAYROLL_GICA_GRADING',
            icon: 'fa-solid fa-hundred-points',
            route: ABS_GICA_GRADING_URL,
            accessRights: 'GGrade'
        },

        {
            name: 'PAYROLL_GICA_DEGRADING',
            icon: 'fa-solid fa-thumbs-down',
            route: ABS_GICA_DEGRADING_URL,
            accessRights: 'DGrade'
        },

        {
            name: 'COMMON_UPDATE',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_GICA_REPORTS_URL,
            accessRights: 'GCReport'
        },

        {
            name: 'PAYROLL_HISTORY',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_GICA_HISTORY_URL,
            accessRights: 'GCArchive'
        },

    ],
    accessRights: 'LTM'
};

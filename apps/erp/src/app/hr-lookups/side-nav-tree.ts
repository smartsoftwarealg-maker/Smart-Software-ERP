import {SideNavNode} from '@ss/common/api-common';

import {
    ABS_ACTIVITIES_URL,
    ABS_HR_BLOOD_GROUP_URL,
    ABS_HR_CAREER_MOTIVE_URL,
    ABS_HR_CATEGORIES_URL,
    ABS_HR_CONTRACT_MOTIVES_URL,
    ABS_HR_CRITERIA_URL,
    ABS_HR_DECISION_MOTIVES_URL,
    ABS_HR_DEPARTMENTS_URL,
    ABS_HR_DIPLOMAS_URL,
    ABS_HR_DIVISIONS_URL,
    ABS_HR_EDUCATION_LEVELS_URL,
    ABS_HR_EMPLOYMENT_TYPE_URL,
    ABS_HR_JUDICIAL_FRAMES_URL,
    ABS_HR_LANGUAGE_LEVELS_URL,
    ABS_HR_LANGUAGES_URL,
    ABS_HR_MARITAL_STATUS_URL,
    ABS_HR_MOTIVES_URL,
    ABS_HR_NATIONALITIES_URL,
    ABS_HR_POSTS_URL,
    ABS_HR_SERVICES_URL,
    ABS_HR_SUSPENSION_REASON_URL,
    ABS_HR_TRN_SUBJECTS_URL,
    ABS_HR_VACATION_TYPE_URL,
    ABS_HR_WORKSHOP_URL,
    ABS_PHYSICIAN_SPECIALTIES_URL,
    ABS_PHYSICIANS_URL,
    ABS_PROFESSIONAL_FAULTS_URL,
    ABS_PUNISHMENT_TYPE_URL
} from '../common';

export const hrLookupNavTree: SideNavNode = {
    name: 'PAYROLL_LOOKUPS',
    icon: 'fas fa-coins',
    children: [
        {
            name: 'COMMON_BLOOD_GROUPS',
            icon: 'fa-solid fa-people-group',
            route: ABS_HR_BLOOD_GROUP_URL,
            accessRights: 'BloodGroup'
        },
        {
            name: 'COMMON_EMPLOYMENT_TYPES',
            icon: 'fas fa-business-time',
            route: ABS_HR_EMPLOYMENT_TYPE_URL,
            accessRights: 'EmploymentType'
        },
        {
            name: 'COMMON_SUSPENSION_REASONS',
            icon: 'fas fa-user-times',
            route: ABS_HR_SUSPENSION_REASON_URL,
            accessRights: 'SuspensionReason'
        },
        {
            name: 'PAYROLL_CAREER_MOTIVES',
            icon: 'fa-regular fa-bullseye-pointer',
            route: ABS_HR_CAREER_MOTIVE_URL,
            accessRights: 'CareerMotive'
        },
        {
            name: 'COMMON_POSTS',
            icon: 'fas fa-chair-office',
            route: ABS_HR_POSTS_URL,
            accessRights: 'Post'
        },
        {
            name: 'COMMON_MARITAL_STATUS',
            icon: 'fas fa-rings-wedding',
            route: ABS_HR_MARITAL_STATUS_URL,
            accessRights: 'MaritalStatus'
        },
        {
            name: 'COMMON_DIPLOMAS',
            icon: 'fas fa-file-certificate',
            route: ABS_HR_DIPLOMAS_URL,
            accessRights: 'Diploma'
        },
        {
            name: 'COMMON_EDUCATION_LEVELS',
            icon: 'fas fa-graduation-cap',
            route: ABS_HR_EDUCATION_LEVELS_URL,
            accessRights: 'EducationLevel'
        },
        {
            name: 'COMMON_CATEGORIES',
            icon: 'fas fa-shapes',
            route: ABS_HR_CATEGORIES_URL,
            accessRights: 'Category'
        },
        {
            name: 'COMMON_DIVISIONS',
            icon: 'fas fa-puzzle-piece',
            route: ABS_HR_DIVISIONS_URL,
            accessRights: 'Division'
        },
        {
            name: 'COMMON_DEPARTMENTS',
            icon: 'far fa-building',
            route: ABS_HR_DEPARTMENTS_URL,
            accessRights: 'Department'
        },
        {
            name: 'COMMON_SERVICES',
            icon: 'fas fa-shapes',
            route: ABS_HR_SERVICES_URL,
            accessRights: 'Service'
        },
        {
            name: 'PAYROLL_JUDICIAL_FRAMES',
            icon: 'fa-regular fa-gavel',
            route: ABS_HR_JUDICIAL_FRAMES_URL,
            accessRights: 'JudicialFrame'
        },
        {
            name: 'PAYROLL_PAYROLL_MOTIVES',
            icon: 'fa-solid fa-goal-net',
            route: ABS_HR_MOTIVES_URL,
            accessRights: 'Motive'
        },
        {
            name: 'PAYROLL_DECISION_MOTIVES',
            icon: 'fa-solid fa-bullseye-pointer',
            route: ABS_HR_DECISION_MOTIVES_URL,
            accessRights: 'DecisionMotive'
        },
        {
            name: 'PAYROLL_CONTRACT_MOTIVES',
            icon: 'fa-solid fa-bullseye',
            route: ABS_HR_CONTRACT_MOTIVES_URL,
            accessRights: 'ContractMotive'
        },
        {
            name: 'COMMON_NATIONALITIES',
            icon: 'fas fa-flag',
            route: ABS_HR_NATIONALITIES_URL,
            accessRights: 'Nationality'
        },
        {
            name: 'PAYROLL_PUNISHMENT_TYPE',
            icon: 'fa-solid fa-thumbs-down',
            route: ABS_PUNISHMENT_TYPE_URL,
            accessRights: 'PunishmentType'
        },
        {
            name: 'PAYROLL_PUNISHMENTS',
            icon: 'fas fa-graduation-cap',
            route: ABS_PROFESSIONAL_FAULTS_URL,
            accessRights: 'ProfFault'
        },
        // {
        //     name: 'PAYROLL_ACTIVITIES',
        //     icon: 'fa-solid fa-cake-candles',
        //     route: ABS_ACTIVITIES_URL,
        //     accessRights: 'Activity'
        // },
        {
            name: 'PAYROLL_PHYSICIANS',
            icon: 'fa-solid fa-user-doctor-hair',
            route: ABS_PHYSICIANS_URL,
            accessRights: 'Physician'
        },
        {
            name: 'PAYROLL_PHYSICIAN_SPECIALTIES',
            icon: 'fa-solid fa-microscope',
            route: ABS_PHYSICIAN_SPECIALTIES_URL,
            accessRights: 'PhysicianSpecialty'
        },
        {
            name: 'PAYROLL_HR_CRITERIA',
            icon: 'fa-solid fa-stars',
            route: ABS_HR_CRITERIA_URL,
            accessRights: 'Criterion'
        },
        {
            name: 'PAYROLL_LANGUAGE_LEVELS',
            icon: 'fa-solid fa-stairs',
            route: ABS_HR_LANGUAGE_LEVELS_URL,
            accessRights: 'LanguageLevel'
        },
        {
            name: 'PAYROLL_LANGUAGES',
            icon: 'fas fa-language',
            route: ABS_HR_LANGUAGES_URL,
            accessRights: 'Language'
        },
        {
            name: 'PAYROLL_TRN_SUBJECTS',
            icon: 'fas fa-chalkboard-teacher',
            route: ABS_HR_TRN_SUBJECTS_URL,
            accessRights: 'TRNSubject'
        },
        {
            name: 'PAYROLL_WORKSHOPS',
            icon: 'fa-solid fa-location-dot',
            route: ABS_HR_WORKSHOP_URL,
            accessRights: 'Workshop'
        },
        {
            name: 'PAYROLL_VACATION_TYPES',
            icon: 'fa-solid fa-list-tree',
            route: ABS_HR_VACATION_TYPE_URL,
            accessRights: 'VacationType'
        }
    ],
    accessRights: 'HR_TABLES'
};

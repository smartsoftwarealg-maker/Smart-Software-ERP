export const HR_CATEGORIES = '/categories';
export const HR_CRITERIA = '/hr-criteria';
//
// export interface Motive {
//     id: number;
//     description: string;
//     dailyGrade: string;
// }
//
// export interface CareerMotive {
//     id: number;
//     description: string;
//     isPromotion: boolean;
// }
//
// export interface Report {
//     id: number;
//     firstName: string;
//     lastName: string;
//     lastApplicationYear: number;
//     age: number;
//     rate: number;
// }
//
// export interface Application {
//     id: number;
//     parentId: number;
//     employeeId: number;
//     scaleId: number;
//     firstName?: string;
//     lastName?: string;
//     from: number;
//     to: number;
//     rate: number;
// }

export interface HrCriterion {
    id: number;
    parentId: number;
    description: string;
    grade: number;
}

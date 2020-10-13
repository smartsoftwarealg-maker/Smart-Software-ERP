
export const PERSONS_URL = '/persons';
export const PERSONS_PHOTO_URL = '/photo';

export interface Person {
    id: number;
    customCode: string;
    birthInfo: {
        firstName: string;
        lastName: string;
        birthDate: string;
        birthPlace: string;
        father: string;
        mother: string;
        sex: 1 | 2;
    };
    address: { address: string; wilaya: number };
    maritalStatus: number;
    mservice: number;
    nationality: number;
    educationalLevel: number;
    retirementDate: string;
    diploma: number;
    ssNumber: string;
    mutualNumber: string;
}

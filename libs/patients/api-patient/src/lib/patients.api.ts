export const PATIENT_URL = '/patients';

export class Patient {
    id: number;
    centerId: number;
    patientId: number;
    lastName: string;
    firstName: string;
    lastNameAr?: string;
    firstNameAr?: string;
    phone?: string;
    sex: number;
    birthDate?: Date
    birthPlace?: string;
    city?: number;
    address?: string;
    ssNumber?: string;
    profession?: number;
    maritalStatus?: number;
    childCount: number;
    isDAS: boolean;
    educationLevel?: number;
    workingSpouse: boolean;
    lodgingType?: number;
    spouseProfession?: number;
    spouseLastName?: string;
    spouseFirstName?: string;
    hasVehicle: boolean;
}

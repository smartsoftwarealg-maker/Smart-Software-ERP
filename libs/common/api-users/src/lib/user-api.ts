export const USER_URL = '/users';

export interface User {
    id: number;
    description: string;
    fullName: string;
    manager: boolean;
    blocked: boolean;
    androidLicense?: string;
}



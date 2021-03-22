export const USERS_URL = '/users';

export interface User {
    id: number;
    description: string;
    fullName: String,
    manager: string,
    blocked: string,
    password?: string,
    license?: string
}



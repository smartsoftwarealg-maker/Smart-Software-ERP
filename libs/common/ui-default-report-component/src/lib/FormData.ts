export interface FormData {
    app: string;
    form: string;
}

export interface EmailData {
    from: string;
    to: string;
    subject?: string;
    password?: string;
    message?: string;
}

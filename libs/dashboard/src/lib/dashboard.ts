export interface Dashboard {
    id: number;
    description: string;
    query: string;
    appId?: number;
    appName?: string;
}

export interface Headers {
    headers: string[];
}

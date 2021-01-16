export const REPORT_PARAMS_URL = '/reports/params';

export interface ReportParams {
    id: number;
    name: string;
    typeName: string;
    description: string;
    valueString: boolean;
    valueList: [];
}


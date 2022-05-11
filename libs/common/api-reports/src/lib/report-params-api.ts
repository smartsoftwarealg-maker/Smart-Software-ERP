export const REPORT_PARAMS_URL = '/reports/params';

export interface ReportNode {
    name: string;
    list: ReportNode[];
    parent: '';
}

export interface ParamValue {
    name: string;
    value: string | boolean | number | Date;
}

export interface ReportParam {
    id: number;
    name: string;
    typeName: string;
    description: string;
    valueString: boolean;
    valueList: [];
}

export interface ReportViewData {
    app:       string;
    rType:     string;
    fileName:  string;
    paramList: ParamValue[];
}

export interface ReportCatalog {
    id: number;
    description?: string;
    filename?: string;
}

import { Lookup } from "@ss/common/api-lookup";
import { ParamAutoCompleteModel } from "./param-auto-complete-model";

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
    valueList: Lookup[];
    lookupTable?: string;
    lookupModel?: ParamAutoCompleteModel;
}

export interface ReportViewData {
    app:       string;
    rType:     string;
    fileName:  string;
    uuid?:     string,
    paramList: ParamValue[];
}

export interface ReportCatalog {
    id: number;
    description?: string;
    filename?: string;
}

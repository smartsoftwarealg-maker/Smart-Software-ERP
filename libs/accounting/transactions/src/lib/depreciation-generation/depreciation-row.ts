export const DEPRECIATION_URL = '/assets/depreciations';

export interface GenerationInfo {
    year:   number;
    from:   number;
    to:     number;
    byCC:   boolean;
    dType:  number;
}
export interface DepreciationRow {
    acc:         string;
    description: string;
    cCenter?:    string,
    debit:       number;
    credit:      number;
}

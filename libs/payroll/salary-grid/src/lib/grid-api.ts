export const GRID_URL = "/payroll/grids";
export const RANK_URL = "/ranks";

export interface Grid {
    id: number;
    description?: string;
    category?: string;
    sec?: string;
    indexValue?: number;
    baseSalary?: number;
}

export interface GridRank {
    id: number;
    parentId: number;
    rank: number;
    index: number;
    baseSalary: number;
}

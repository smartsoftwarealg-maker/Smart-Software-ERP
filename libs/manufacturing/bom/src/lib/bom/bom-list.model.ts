export type BomStatus = 'DRAFT' | 'PENDING' | 'RELEASED' | 'OBSOLETE';
export type BomType = 'PRODUCTION' | 'ENGINEERING' | 'MANUFACTURING' | 'COSTING';
export type ProductType = 'FINISHED_GOOD' | 'SUB_ASSEMBLY' | 'RAW_MATERIAL' | 'CONSUMABLE';
export type ViewMode = 'list' | 'tree' | 'card';
export type SortDirection = 'asc' | 'desc' | '';

// ============================================================
// BOM HEADER — one row per producible product (list/card views)
// ============================================================
export interface BomListItem {
    id: number;
    bomNumber: string;
    revision: string;
    productName: string;
    productSku: string;
    productType: ProductType;
    bomType: BomType;
    status: BomStatus;
    componentCount: number;        // how many line items in this BOM
    maxHierarchyLevel: number;     // depth of the component tree
    baseQuantity?: number;
    baseUom: string;
    validFrom: string;
    validTo?: string | null;
    updatedBy?: string;
    updatedByInitials?: string;
    updatedAt?: Date;
}

// ============================================================
// BOM ITEM (COMPONENT) — a line inside a specific BOM (tree view)
// ============================================================
export interface BomItem {
    id: number;
    parentId: number | null;       // null = top-level component
    level: number;                 // 0 = top, 1 = child, 2 = grandchild
    hasChildren: boolean;          // true if phantom sub-assembly
    componentName: string;
    componentSku: string;
    componentType: ProductType;
    quantity: number;
    unit: string;
    scrapPct: number;
    isPhantom: boolean;            // exploded at runtime
    hasOwnBom: boolean;            // this component has its own BOM (for drill-down)
}

// ============================================================
// Request / Response
// ============================================================
export interface BomListRequest {
    page: number;
    pageSize: number;
    sortColumn?: string;
    sortDirection?: SortDirection;
    search?: string;
    status?: BomStatus | '';
    bomType?: BomType | '';
    productType?: ProductType | '';
}

export interface BomListResponse {
    items: BomListItem[];
    totalCount: number;
    page: number;
    pageSize: number;
}

export interface BomFilter {
    search: string;
    status: BomStatus | '';
    bomType: BomType | '';
    productType: ProductType | '';
}

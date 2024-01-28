export const COSTING_ENTITIES = {
    Item: 'CItem',
    Key: 'CKey',
    Project: 'CProject',
    Product: 'CProduct',
    ProductLine: 'CProductLine',
    ProductLineDirect: 'CLineDirectItem',
    ProductLineOverhead: 'CLineOHItem',
    Pool: 'CPool',
    PoolDetail: 'CPoolDetail',
    OH: 'OH',
    User: 'User', // FIXME: wrong value
    Role: 'Role', // FIXME: wrong value
    CostCenter: 'CostCenter', // FIXME: wrong value
    CostCenterGroup: 'CostCenterGroup', // FIXME: wrong value
    Injection: 'CostingInjection', // FIXME: wrong value
    InjectionAct: 'CostingInjectionAct', // FIXME: wrong value
    Report: 'Report', // FIXME: wrong value
    AccessRights: 'AccessRights', // FIXME: wrong value
    Profile: 'Profile', // FIXME: wrong value
};

export const COSTING_ENTITY_LIST = [
    COSTING_ENTITIES.Item,
    COSTING_ENTITIES.Key,
    COSTING_ENTITIES.Project,
    COSTING_ENTITIES.Product,
    COSTING_ENTITIES.ProductLine,
    COSTING_ENTITIES.ProductLineDirect,
    COSTING_ENTITIES.ProductLineOverhead,
    COSTING_ENTITIES.Pool,
    COSTING_ENTITIES.PoolDetail,
    COSTING_ENTITIES.OH,
    COSTING_ENTITIES.CostCenter,
    COSTING_ENTITIES.CostCenterGroup,
    COSTING_ENTITIES.Injection,
    COSTING_ENTITIES.InjectionAct,
    COSTING_ENTITIES.Report,
    COSTING_ENTITIES.User,
    COSTING_ENTITIES.Role,
    COSTING_ENTITIES.AccessRights,
    COSTING_ENTITIES.Profile
];

export interface CItem {
    id: number;
    code: string;
    description: string;
    accountNo: number;
    accountDescription?: string;
}

export interface CKey {
    id: number;
    code: string;
    description: string;
}

export interface CProject {
    id: number;
    code: string;
    description: string;
    from: string;
    to: string;
    centerId: number;
}

export interface CProduct {
    id: number;
    code: string;
    description: string;
    price: number;
}

export interface CProductLine {
    id: number;
    parentId: number; //projectId
    productId: number;
    directMaterial: number;
    directLabor: number;
    units: number;
    reference?: string;
    description?: string;
}

export interface CLineKey {
    id:              number;
    parentId:        number;
    keyId:           number;
    value:           number;
    keyDescription?: string;
}

export interface CLineCost {
    id:              number;
    parentId:        number;
    itemId:          number;
    value:           number;
    itemDescription?: string;
}

export interface CPoolCost {
    id:               number;
    parentId:         number;
    itemId:           number;
    value:            number;
    itemDescription?: string;
}

export interface CLineOHItem {
    id: number;
    productLineId: number;
    keyId: number;
    value: number;
    actual: number;
}

export interface CPool {
    id: number;
    costCenterId: number;
    parentId: number;
    keyId: number;
    isSupport: boolean;
    ccDescription?: string;
    keyDescription?: string;
}

export interface CPoolKey {
    id: number;
    parentId: number;
    keyId: number;
    value: number;
    keyDescription?: string;
}

export interface CPoolDetail {
    id: number;
    parentId: number;
    key: number;
    value: number;
    keyDescription?: string;
}

export interface OH {
    id: number;
    parentId: number;
    keyId: number;
    description: string;
    keyDescription?: string;
    amount: number;
    scale?: number;
    actual?: number;
    accountNo?: number;
}

export interface CostCenter {
    id: number;
    code: string;
    description: string;
    groupId: number;
}

export interface CReport {
    trivial: CProduct[],
    simple: CProduct[],
    stepDown: CProduct[],
    reciprocal: CProduct[],
}

export interface ScalaCostingResult {
    _1: CProduct;
    _2: number;
}

export interface CostingResult {
    product: CProduct;
    productAcDescription: number;
    expectedCost: number;
    actualCost: number;
    error: string;
}

export interface ReportList {
    name: string;
    files: string[];
}

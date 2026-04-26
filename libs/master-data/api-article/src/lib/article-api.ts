import {ImageModel} from '@ss/common/ui-image-input';

export const USERS_URL = '/users';
export const STORES_URL = '/stores';
export const ARTICLES_URL = '/articles';
export const MAN_PRODUCT_URL = '/man-products';
export const SERVICE_ARTICLES_URL = '/articles';
export const APP_URL = '/apps';
export const AVAILABLE_ARTICLES_URL = '/articles/available';
export const ARTICLE_IMAGE_URL = '/image';
export const BOM_TREE_URL = '/articles/tree';
export const MANUFACTORING_BOMS_URL = '/manufacturing/boms';
export const BOM_URL = '/boms';

export const SALES = 1;
export const STOCK = 2;
export const SERVICE = 30;
export const RAW_MATERIAL = 40;
export const FINAL_PRODUCT = 50;

export const ARTICLE_RAW_MATERIAL = 1;
export const ARTICLE_SEMI_FINAL = 2;
export const ARTICLE_FINAL_PRODUCT = 3;



export interface BOM {
    id: number;
    bomId?: number;
    productId: number;
    qty: number;
    price?: number;
    description?: string;
    updateDate?: Date;
    updateMemo?: string;
    from?: Date;
    to?: Date;
    units: number;
    version: number;
    productRef?: string;
    productDescription?: string;
}

export interface BOMTree {
    bom: BOM;
    children: BOMTree[];
}

export interface Article {
    id: number;
    reference: string;
    description2: string;
    info?: string;
    mark: number;
    klass: number;
    vat: number;
    vat2: number;
    articleType: number;
    accountno: string;
    price1: number;
    price2: number;
    price3: number;
    awp?: number;
    appId: number;
    salesUnit: number;
    purchaseUnit?: number;
    subClass?: number;
    imageModel?: ImageModel;
    vatValue?: number;
    vatValue2?: number;
    notForSale: boolean;
    recordBlocked: boolean;
    routingId?: number;
    dosageUnit?: number;
    classDescription?: string;
    markDescription?: string;
    subclassDescription?: string;
    minQty?: number;
    maxQty?: number;
    unitDescription?: string;
    routingValue?: number;
    bomValue?: number;
    laborHours?: number;
    typeDescription?: string;
    packagingDescription:string;
    packaging?:number;
    productType?: number;
    importTax: number;
    discountable: boolean;
    salable: boolean;
    purchasable: boolean;
    consumable: boolean;
    discount: number;
}

export interface StockInfo {
    reference: string;
    description?: string;
    storeId: number;
    store: string;
    stock: number;
    price1: number;
    price2: number;
    price3: number;
    price4: number;
    price5: number;
    awp: number;
}

export interface Location {
    id: number;
    storeId: number;
    referenceId: number;
    reference: string;
    location?: string;
    locSector?: string;
    stock: number;
    pp: number;
    price1: number;
    price2: number;
    price3: number;
    price4: number;
    price5: number;
    inventPMP: number;
    inventStock: number;
    theoStock: number;
    lastPurchaseDate?: Date;
    expirationDate?: Date;
    inventDate?: Date;
    fixDate?: Date;
    blockedLot?: boolean;
    isCompliant: boolean;
    analysisDate?: Date;
    center?: number;
    lotNumber?: number;
    description?: string;
    storeName?: string;
}

export interface QtyPrice {
    document: number;
    qty: number;
    price: number;
}

export interface UserStore {
    id: number;
    userId: number;
    storeId: number;
    storeDescription?: string;
}

export interface AvailableArticle {
    articleDescription: string;
    stock: number;
    price: number;
    storeId: number;
    partId: number;
    imageModel?: ImageModel;
    qty?: number;
}

export interface AvailableStock {
    classId: number;
    classDescription: string;
    articles: AvailableArticle[];
}

export interface UnitsOfMeasure {
    id: number;
    code?: string;
    name: string;
    description?: string;
    unitType: string;
    baseUnitId?: number;
    conversionFactor?: number;
    value?: number;
    isActive?: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface ActivityCategory {
    id: number;
    code: string;
    name: string;
    description?: string;
    parentId?: number;
    glAccountId?: number;
    costElementGroup?: string;
    isOverhead?: boolean;
    isVariable?: boolean;
    colorCode?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: number;
    updatedBy?: number;
    deletedAt?: string;
}

import { SideNavNode } from '@ss/common/api-common';
import {
    ABS_PRODUCTION_BOM_PRODUCTS,
    ABS_PRODUCTION_MRP_URL,
    ABS_PRODUCTION_ORDER_URL,
    ABS_PRODUCTION_URL,
    ABS_PRODUCTION_ARTICLE_URL,
    ABS_PRODUCTION_LOT_MANAGEMENT_URL,
    ABS_PRODUCTION_LOT_ANALYSIS_URL,
    ABS_PRODUCTION_INTER_STORE_TRANSFER_URL,
    ABS_PRODUCTION_UNLOCKING_LOTS_URL,
    ABS_PRODUCTION_ARTICLE_TYPES_URL,
    ABS_PRODUCTION_DOSAGE_UNITS_URL,
    ABS_PRODUCTION_PACKAGING_UNITS_URL,
    ABS_PRODUCTION_REPORTS_URL, ABS_LOT_PRIORITY_URL
} from '../common';

export const productionNavTree: SideNavNode = {
    name: 'COMMON_PRODUCTION',
    icon: 'fa-solid fa-conveyor-belt-arm',
    accessRights: 'APP_PRODUCTION',
    children: [
        {
            name: 'STOCK_MODELS',
            icon: 'fa-solid fa-cars',
            route: ABS_PRODUCTION_ARTICLE_TYPES_URL,
            accessRights: 'ArticleType',
        },
        {
            name: 'STOCK_DOSAGE_UNITS',
            icon: 'fa-solid fa-eye-dropper-half',
            route: ABS_PRODUCTION_DOSAGE_UNITS_URL,
            accessRights: 'DosageUnit',
        },
        {
            name: 'STOCK_PACKAGING_UNITS',
            icon: 'fa-solid fa-box-open-full',
            route: ABS_PRODUCTION_PACKAGING_UNITS_URL,
            accessRights: 'PackagingUnit',
        },
        {
            name: 'STOCK_ARTICLES',
            icon: 'fas fa-box',
            route: ABS_PRODUCTION_ARTICLE_URL,
            accessRights: 'Article',
        },
        {
            name: 'PROD_BOM',
            icon: 'fa-solid fa-list-tree',
            route: ABS_PRODUCTION_BOM_PRODUCTS,
            accessRights: 'BOM',
        },
        {
            name: 'STOCK_LOT_MANAGEMENT',
            icon: 'fa-solid fa-truck-ramp-box',
            route: ABS_PRODUCTION_LOT_MANAGEMENT_URL,
            accessRights: 'LotManagement',
        },
        {
            name: 'STOCK_LOT_ANALYSIS',
            icon: 'fa-solid fa-magnifying-glass-chart',
            route: ABS_PRODUCTION_LOT_ANALYSIS_URL,
            accessRights: 'LotAnalysis',
        },
        {
            name: 'STOCK_UNLOCKING_LOTS',
            icon: 'fa-solid fa-unlock',
            route: ABS_PRODUCTION_UNLOCKING_LOTS_URL,
            accessRights: 'UnlockLots',
        },
        {
            name: 'PROD_LOT_PRIORITY',
            icon: 'fa-solid fa-arrow-up-wide-short',
            route: ABS_LOT_PRIORITY_URL,
            accessRights: 'LotPriority',
        },
        {
            name: 'PROD_PRODUCTION_ORDER',
            icon: 'fa-solid fa-industry',
            route: ABS_PRODUCTION_ORDER_URL,
            accessRights: 'ProductionOrder',
        },
        {
            name: 'PROD_PRODUCTION_MRP',
            icon: 'fa-solid fa-industry-windows',
            route: ABS_PRODUCTION_MRP_URL,
            accessRights: 'PMrp',
        },
        {
            name: 'PROD_PRODUCTIONS',
            icon: 'fa-brands fa-product-hunt',
            route: ABS_PRODUCTION_URL,
            accessRights: 'Production',
        },
        {
            name: 'PROD_INTER_STORE_TRANSFER',
            icon: 'fa-regular fa-store',
            route: ABS_PRODUCTION_INTER_STORE_TRANSFER_URL,
            accessRights: 'PInterStore',
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_PRODUCTION_REPORTS_URL,
            accessRights: 'Report',
        },
    ],
};

import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_PRODUCTION_BOM_PRODUCTS,
    ABS_PRODUCTION_MRP_URL,
    ABS_PRODUCTION_ORDER_URL,
    ABS_PRODUCTION_URL,
    ABS_PRODUCTION_ARTICLE_URL,
    ABS_PRODUCTION_LOT_MANAGEMENT_URL,
    ABS_PRODUCTION_LOT_ANALYSIS_URL,
    ABS_PRODUCTION_INTER_STORE_TRANSFER_URL, ABS_PRODUCTION_UNLOCKING_LOTS_URL
} from '../common';

export const productionNavTree: SideNavNode = {
    name: 'PROD_PRODUCTION',
    icon: 'fa-solid fa-conveyor-belt-arm',
    accessRights: 'PRODUCTION_APP',
    children: [
        {
            name: 'STOCK_ARTICLES',
            icon: 'fas fa-box',
            route: ABS_PRODUCTION_ARTICLE_URL,
            accessRights: 'ArticleType'
        },
        {
            name: 'STOCK_LOT_MANAGEMENT',
            icon: 'fa-solid fa-truck-ramp-box',
            route: ABS_PRODUCTION_LOT_MANAGEMENT_URL,
            accessRights: 'LotManagement'
        },
        {
            name: 'STOCK_LOT_ANALYSIS',
            icon: 'fa-solid fa-magnifying-glass-chart',
            route: ABS_PRODUCTION_LOT_ANALYSIS_URL,
            accessRights: 'LotAnalysis'
        },
        {
            name: 'STOCK_UNLOCKING_LOTS',
            icon: 'fa-solid fa-unlock',
            route: ABS_PRODUCTION_UNLOCKING_LOTS_URL,
            accessRights: 'UnlockLots'
        },
        {
            name: 'PROD_BOM',
            icon: 'fa-solid fa-list-tree',
            route: ABS_PRODUCTION_BOM_PRODUCTS,
            accessRights: 'BOM'
        },
        {
            name: 'PROD_PRODUCTION_ORDER',
            icon: 'fa-solid fa-industry',
            route: ABS_PRODUCTION_ORDER_URL,
            accessRights: 'POrder'
        },
        {
            name: 'PROD_PRODUCTION_MRP',
            icon: 'fa-solid fa-industry-windows',
            route: ABS_PRODUCTION_MRP_URL,
            accessRights: 'PMrp'
        },
        {
            name: 'PROD_PRODUCTIONS',
            icon: 'fa-brands fa-product-hunt',
            route: ABS_PRODUCTION_URL,
            accessRights: 'POrder'
        },
        {
            name: 'PROD_INTER_STORE_TRANSFER',
            icon: 'fa-regular fa-store',
            route: ABS_PRODUCTION_INTER_STORE_TRANSFER_URL,
            accessRights: 'PInterStore'
        }
    ]
};

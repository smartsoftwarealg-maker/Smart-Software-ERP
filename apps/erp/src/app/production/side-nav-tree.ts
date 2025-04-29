import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_PRODUCTION_BOM_PRODUCTS,
    ABS_PRODUCTION_MRP_URL,
    ABS_PRODUCTION_ORDER_URL,
    ABS_PRODUCTION_URL, ABS_PRODUCTION_ARTICLE_URL
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
    ]
};

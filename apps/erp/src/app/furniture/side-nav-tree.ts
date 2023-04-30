import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_FURNITURE_ASSIGNMENT_URL,
    ABS_FURNITURE_RECEIVERS_URL,
    ABS_FURNITURE_RECEPTION_URL, ABS_FURNITURE_SALES_URL, ABS_FURNITURE_TYPES_URL,
    ABS_FURNITURE_URL
} from '../common';

export const furnitureNavTree: SideNavNode = {
    name: 'ASSET_FURNITURE',
    icon: 'fa-solid fa-loveseat',
    children: [
        {
            name: 'ASSET_RECEIVERS',
            icon: 'fa-solid fa-hands-holding-diamond',
            route: ABS_FURNITURE_RECEIVERS_URL,
            accessRights: 'FurnitureReceiver'
        },
        {
            name: 'COMMON_TYPES',
            icon: 'fa-solid fa-ruler',
            route: ABS_FURNITURE_TYPES_URL,
            accessRights: 'ArticleType'
        },
        {
            name: 'ASSET_FURNITURE',
            icon: 'fa-solid fa-chair-office',
            route: ABS_FURNITURE_URL,
            accessRights: 'Furniture'
        },
        {
            name: 'ASSET_RECEPTIONS',
            icon: 'fa-solid fa-cart-shopping',
            route: ABS_FURNITURE_RECEPTION_URL,
            accessRights: 'FurnitureReception'
        },
        {
            name: 'ASSET_APPOINTMENTS',
            icon: 'fa-solid fa-user-tag',
            route: ABS_FURNITURE_ASSIGNMENT_URL,
            accessRights: 'FurnitureAssignment'
        },
        {
            name: 'COMMON_SALES',
            icon: 'fa-solid fa-money-bill-wheat',
            route: ABS_FURNITURE_SALES_URL,
            accessRights: 'FurnitureAssignment'
        },
    ],
    accessRights: "Furniture"
};

import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_COSTING_BOM_PRODUCTS,
    ABS_COSTING_COST_CENTER_URL,
    ABS_COSTING_ITEMS,
    ABS_COSTING_KEYS,
    ABS_COSTING_PRODUCTS,
    ABS_COSTING_PROJECTS,
    ABS_COSTING_ROUTING_URL
} from '../common';

export const costingNavTree: SideNavNode = {
    name: 'COSTING',
    icon: 'fa-solid fa-hand-holding-dollar',
    children: [
        {
            name: 'COSTING_ITEMS',
            icon: 'fa-solid fa-sitemap',
            route: ABS_COSTING_ITEMS,
            accessRights: 'CItem'
        },

        {
            name: 'COSTING_KEYS',
            icon: 'fa-solid fa-key-skeleton-left-right',
            route: ABS_COSTING_KEYS,
            accessRights: 'CKey'
        },

        {
            name: 'CMMS_ROUTINGS',
            icon: 'fa-solid fa-list-tree',
            route: ABS_COSTING_ROUTING_URL,
            accessRights: 'CMType'
        },

        {
            name: 'COMMON_COST_CENTER',
            icon: 'fas fa-building',
            route: ABS_COSTING_COST_CENTER_URL,
            accessRights: 'CostCenter'
        },

        {
            name: 'COSTING_PRODUCTS',
            icon: 'fa-solid fa-conveyor-belt-arm',
            route: ABS_COSTING_PRODUCTS,
            accessRights: 'Article'
        },

        {
            name: 'COMMON_PROJECTS',
            icon: 'fa-solid fa-shovel-snow',
            route: ABS_COSTING_PROJECTS,
            accessRights: 'CProject'
        },

        {
            name: 'LOGISTICS_BOM',
            icon: 'fa-solid fa-list-tree',
            route: ABS_COSTING_BOM_PRODUCTS,
            accessRights: 'BOM'
        },
    ]

};

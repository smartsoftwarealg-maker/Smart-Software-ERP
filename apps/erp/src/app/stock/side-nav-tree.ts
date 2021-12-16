import {
    ABS_STOCK_ACCOUNT_URL,
    ABS_STOCK_AGENT_PRICE_URL,
    ABS_STOCK_AGENT_URL,
    ABS_STOCK_ARTICLES_URL,
    ABS_STOCK_CLASSES_URL,
    ABS_STOCK_COST_CENTER_URL,
    ABS_STOCK_INVENTORY_ENTRY_URL,
    ABS_STOCK_INVENTORY_EXIT_URL,
    ABS_STOCK_CONSUMPTION_URL,
    ABS_STOCK_MARKS_URL,
    ABS_STOCK_STORE_NAMES_URL,
    ABS_STOCK_SUBCLASSES_URL,
    ABS_STOCK_UNITS_URL,
    ABS_STORE_ASSIGNMENT_URL,
    ABS_INVENTORY_ANOMALIES_URL, ABS_STOCK_INVENTORY_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const stockNavTree: SideNavNode = {
    name: 'STOCK',
    icon: 'fas fa-warehouse-alt',
    children: [
        {
            name: 'COMMON_FILE',
            icon: 'fas fa-folder',
            children: [
                {
                    name: 'LOGISTICS_AGENT',
                    icon: 'fas fa-user',
                    route: ABS_STOCK_AGENT_URL,
                    accessRights: 'Agent'
                },
                {
                    name: 'LOGISTICS_ACCOUNTS',
                    icon: 'fas fa-user-circle',
                    route: ABS_STOCK_ACCOUNT_URL,
                    accessRights: 'Account'
                },
                {
                    name: 'LOGISTICS_AGENT_PRICE',
                    icon: 'fas fa-dollar-sign',
                    route: ABS_STOCK_AGENT_PRICE_URL,
                    accessRights: 'AgentPrice'
                },
                {
                    name: 'LOGISTICS_COST_CENTER',
                    icon: 'fas fa-building',
                    route: ABS_STOCK_COST_CENTER_URL,
                    accessRights: 'CostCenter'
                },
            ]
        },
        {
            name: 'COMMON_LOOKUPS',
            icon: 'fas fa-clipboard-list',
            children: [
                {
                    name: 'COMMON_MARKS',
                    icon: 'fas fa-copyright',
                    route: ABS_STOCK_MARKS_URL,
                    accessRights: 'Mark'
                },
                {
                    name: 'COMMON_UNITS',
                    icon: 'fas fa-balance-scale-right',
                    route: ABS_STOCK_UNITS_URL,
                    accessRights: 'Unit'
                },
                {
                    name: 'COMMON_CLASSES',
                    icon: 'fas fa-shapes',
                    route: ABS_STOCK_CLASSES_URL,
                    accessRights: 'Klass'
                },
                {
                    name: 'COMMON_SUBCLASSES',
                    icon: 'fas fa-folder-tree',
                    route: ABS_STOCK_SUBCLASSES_URL,
                    accessRights: 'Subclass'
                },
            ]
        },
        {
            name: 'STOCK_INVENTORY',
            icon: 'fas fa-inventory',
            children: [
                {
                    name: 'COMMON_STORE_NAMES',
                    icon: 'fas fa-warehouse',
                    route: ABS_STOCK_STORE_NAMES_URL,
                    accessRights: 'StoreName'
                },
                {
                    name: 'STOCK_STORE_ASSIGNMENT',
                    icon: 'fas fa-pallet',
                    route: ABS_STORE_ASSIGNMENT_URL,
                    accessRights: 'Store'
                },
                {
                    name: 'STOCK_ARTICLES',
                    icon: 'fas fa-box',
                    route: ABS_STOCK_ARTICLES_URL,
                    accessRights: 'Article'
                },
                {
                    name: 'STOCK_INVENTORY',
                    icon: 'fas fa-inventory',
                    route: ABS_STOCK_INVENTORY_URL,
                    accessRights: 'Inventory'
                },
                {
                    name: 'STOCK_INVENTORY_ENTRY',
                    icon: 'fas fa-truck-moving',
                    route: ABS_STOCK_INVENTORY_ENTRY_URL,
                    accessRights: 'InventoryIn'
                },
                {
                    name: 'STOCK_INVENTORY_EXIT',
                    icon: 'fas fa-dolly-flatbed',
                    route: ABS_STOCK_INVENTORY_EXIT_URL,
                    accessRights: 'InventoryOut'
                },
                {
                    name: 'STOCK_CONSUMPTION',
                    icon: 'fas fa-gas-pump',
                    route: ABS_STOCK_CONSUMPTION_URL,
                    accessRights: 'Consumption'
                },
                {
                    name: 'STOCK_ANOMALIES',
                    icon: 'fas fa-tasks',
                    route: ABS_INVENTORY_ANOMALIES_URL
                },
            ]
        },
    ]
};

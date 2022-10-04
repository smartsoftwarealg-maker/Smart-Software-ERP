import {
    ABS_STOCK_ACCOUNT_URL,
    ABS_STOCK_AGENT_URL,
    ABS_STOCK_ARTICLES_URL,
    ABS_STOCK_COST_CENTER_URL,
    ABS_STOCK_INVENTORY_ENTRY_URL,
    ABS_STOCK_INVENTORY_EXIT_URL,
    ABS_STOCK_CONSUMPTION_URL,
    ABS_STOCK_STORE_NAMES_URL,
    ABS_STORE_ASSIGNMENT_URL,
    ABS_INVENTORY_ANOMALIES_URL,
    ABS_STOCK_INVENTORY_URL,
    ABS_STOCK_REPORTS_URL,
    ABS_STOCK_DASHBOARD_URL, ABS_STOCK_TRANSFER_URL, ABS_STOCK_TRANSFER_RECEPTION_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const stockNavTree: SideNavNode = {
    name: 'STOCK',
    icon: 'fas fa-warehouse-alt',
    accessRights: 'INVENTORY',
    children: [
        {
            name: 'STOCK_ARTICLES',
            icon: 'fas fa-box',
            route: ABS_STOCK_ARTICLES_URL,
            accessRights: 'Article'
        },
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
        // {
        //     name: 'LOGISTICS_AGENT_PRICE',
        //     icon: 'fas fa-dollar-sign',
        //     route: ABS_STOCK_AGENT_PRICE_URL,
        //     accessRights: 'AgentPrice'
        // },
        {
            name: 'LOGISTICS_COST_CENTER',
            icon: 'fas fa-building',
            route: ABS_STOCK_COST_CENTER_URL,
            accessRights: 'CostCenter'
        },
        {
            name: 'COMMON_STORE_NAMES',
            icon: 'fas fa-warehouse',
            route: ABS_STOCK_STORE_NAMES_URL,
            accessRights: 'Lot'
        },
        {
            name: 'STOCK_STORE_ASSIGNMENT',
            icon: 'fas fa-pallet',
            route: ABS_STORE_ASSIGNMENT_URL,
            accessRights: 'Store'
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
            name: 'STOCK_TRANSFERS',
            icon: 'fa-sharp fa-solid fa-money-bill-transfer',
            route: ABS_STOCK_TRANSFER_URL,
            accessRights: 'Transfer'
        },
        {
            name: 'STOCK_TRANSFER_RECEPTIONS',
            icon: 'fa-solid fa-bag-shopping',
            route: ABS_STOCK_TRANSFER_RECEPTION_URL,
            accessRights: 'TransferReception'
        },
        {
            name: 'STOCK_ANOMALIES',
            icon: 'fas fa-tasks',
            route: ABS_INVENTORY_ANOMALIES_URL,
            accessRights: 'Article'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-sharp fa-solid fa-file-chart-column',
            route: ABS_STOCK_REPORTS_URL,
            accessRights: 'Report'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fas fa-calendar-check',
            route: ABS_STOCK_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ]
};

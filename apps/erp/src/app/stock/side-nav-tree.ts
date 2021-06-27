import {
    ABS_STOCK_ACCOUNT_URL,
    ABS_STOCK_AGENT_PRICE_URL,
    ABS_STOCK_AGENT_TYPE,
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
    ABS_STOCK_VAT_URL, ABS_STOCK_REPORT_PARAMS
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
                    route: ABS_STOCK_AGENT_URL
                },
                {
                    name: 'LOGISTICS_ACCOUNTS',
                    icon: 'fas fa-user-circle',
                    route: ABS_STOCK_ACCOUNT_URL
                },
                {
                    name: 'LOGISTICS_AGENT_PRICE',
                    icon: 'fas fa-dollar-sign',
                    route: ABS_STOCK_AGENT_PRICE_URL
                },
                {
                    name: 'LOGISTICS_COST_CENTER',
                    icon: 'fas fa-building',
                    route: ABS_STOCK_COST_CENTER_URL
                },
                {
                    name: 'COMMON_REPORT_PARAMS',
                    icon: 'fas fa-file-chart-line',
                    route: ABS_STOCK_REPORT_PARAMS
                }
            ]
        },
        {
            name: 'COMMON_LOOKUPS',
            icon: 'fas fa-clipboard-list',
            children: [
                {
                    name: 'COMMON_STORE_NAMES',
                    icon: 'fas fa-warehouse',
                    route: ABS_STOCK_STORE_NAMES_URL
                },
                {
                    name: 'COMMON_MARKS',
                    icon: 'fas fa-copyright',
                    route: ABS_STOCK_MARKS_URL
                },
                {
                    name: 'COMMON_UNITS',
                    icon: 'fas fa-balance-scale-right',
                    route: ABS_STOCK_UNITS_URL
                },
                {
                    name: 'COMMON_CLASSES',
                    icon: 'fas fa-shapes',
                    route: ABS_STOCK_CLASSES_URL
                },
                {
                    name: 'COMMON_SUBCLASSES',
                    icon: 'fas fa-folder-tree',
                    route: ABS_STOCK_SUBCLASSES_URL
                },
                {
                    name: 'COMMON_VAT',
                    icon: 'fas fa-percentage',
                    route: ABS_STOCK_VAT_URL
                },
                {
                    name: 'COMMON_AGENT_TYPES',
                    icon: 'fas fa-user',
                    route: ABS_STOCK_AGENT_TYPE
                },
            ]
        },
        {
            name: 'STOCK_INVENTORY',
            icon: 'fas fa-inventory',
            children: [
                {
                    name: 'STOCK_ARTICLES',
                    icon: 'fas fa-box',
                    route: ABS_STOCK_ARTICLES_URL
                },
                {
                    name: 'STOCK_INVENTORY_ENTRY',
                    icon: 'fas fa-truck-moving',
                    route: ABS_STOCK_INVENTORY_ENTRY_URL
                },
                {
                    name: 'STOCK_INVENTORY_EXIT',
                    icon: 'fas fa-dolly-flatbed',
                    route: ABS_STOCK_INVENTORY_EXIT_URL
                },
                {
                    name: 'STOCK_CONSUMPTION',
                    icon: 'fas fa-gas-pump',
                    route: ABS_STOCK_CONSUMPTION_URL
                },
                // {
                //     name: 'STOCK_INVENTORY',
                //     icon: 'fas fa-file',
                //     route: ABS_STOCK_INVENTORY_URL
                // },
            ]
        },
    ]
};

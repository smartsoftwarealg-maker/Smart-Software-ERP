import {
    ABS_STOCK_ACCOUNT_URL,
    ABS_STOCK_ACTIVITY,
    ABS_STOCK_AGENT_PRICE_URL,
    ABS_STOCK_AGENT_TYPE,
    ABS_STOCK_AGENT_URL,
    ABS_STOCK_ARTICLES_URL,
    ABS_STOCK_CITY,
    ABS_STOCK_CLASSES_URL,
    ABS_STOCK_COMPANY_TYPE,
    ABS_STOCK_COST_CENTER_URL,
    ABS_STOCK_COUNTRY,
    ABS_STOCK_CURRENCY,
    ABS_STOCK_INVENTORY_ENTRY_URL,
    ABS_STOCK_INVENTORY_EXIT_URL,
    ABS_STOCK_CONSUMPTION_URL,
    ABS_STOCK_RECEPTION_URL,
    ABS_STOCK_INVENTORY_URL,
    ABS_STOCK_MARKS_URL,
    ABS_STOCK_PAY_MODE,
    ABS_STOCK_STORE_NAMES_URL,
    ABS_STOCK_SUBCLASSES_URL,
    ABS_STOCK_UNITS_URL,
    ABS_STOCK_VAT_URL, ABS_COMMON_REPORT_PARAMS
} from '../constants';
import {SideNavNode} from '@ss/common/ui-shell';


export const stockNavTree: SideNavNode = {
    name: 'STOCK',
    icon: 'fas fa-warehouse-alt',
    children: [
        {
            name: 'STOCK_FILE',
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
                    route: ABS_COMMON_REPORT_PARAMS
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
                {
                    name: 'COMMON_COMPANY_TYPES',
                    icon: 'fas fa-building',
                    route: ABS_STOCK_COMPANY_TYPE
                },
                {
                    name: 'COMMON_ACTIVITIES',
                    icon: 'fab fa-app-store-ios',
                    route: ABS_STOCK_ACTIVITY
                },
                {
                    name: 'COMMON_PAY_MODES',
                    icon: 'fas fa-money-check-edit',
                    route: ABS_STOCK_PAY_MODE
                },
                {
                    name: 'COMMON_CURRENCIES',
                    icon: 'fas fa-coins',
                    route: ABS_STOCK_CURRENCY
                },
                {
                    name: 'COMMON_CITIES',
                    icon: 'fas fa-city',
                    route: ABS_STOCK_CITY
                },
                {
                    name: 'COMMON_COUNTRIES',
                    icon: 'fas fa-flag',
                    route: ABS_STOCK_COUNTRY
                }
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
                    icon: 'fas fa-file',
                    route: ABS_STOCK_INVENTORY_ENTRY_URL
                },
                {
                    name: 'STOCK_INVENTORY_EXIT',
                    icon: 'fas fa-file',
                    route: ABS_STOCK_INVENTORY_EXIT_URL
                },
                {
                    name: 'STOCK_CONSUMPTION',
                    icon: 'fas fa-file',
                    route: ABS_STOCK_CONSUMPTION_URL
                },
                {
                    name: 'STOCK_INVENTORY',
                    icon: 'fas fa-file',
                    route: ABS_STOCK_INVENTORY_URL
                },
                {
                    name: 'STOCK_RECEPTION',
                    icon: 'fas fa-file',
                    route: ABS_STOCK_RECEPTION_URL
                }
            ]
        },
    ]
};

import {
    ABS_STOCK_MARKS_URL,
    ABS_STOCK_ARTICLES_URL,
    ABS_STOCK_VAT_URL,
    ABS_STOCK_CLASSES_URL,
    ABS_STOCK_SUBCLASSES_URL,
    ABS_STOCK_STORE_NAMES_URL, ABS_STOCK_UNITS_URL, ABS_STOCK_AGENT_URL
} from '../constants';
import { SideNavNode } from '@ss/common/ui-shell';


export const stockNavTree: SideNavNode = {
    name: 'STOCK',
    icon: 'fas fa-warehouse-alt',
    children: [
        {
            name: 'COMMON_LOOKUPS',
            icon: 'fas fa-clipboard-list',
            children: [
                {
                    name: 'STOCK_STORE_NAMES',
                    icon: 'fas fa-warehouse',
                    route: ABS_STOCK_STORE_NAMES_URL
                },
                {
                    name: 'STOCK_MARKS',
                    icon: 'fas fa-copyright',
                    route: ABS_STOCK_MARKS_URL
                },
                {
                    name: 'STOCK_UNITS',
                    icon: 'fas fa-balance-scale-right',
                    route: ABS_STOCK_UNITS_URL
                },
                {
                    name: 'STOCK_CLASSES',
                    icon: 'fas fa-shapes',
                    route: ABS_STOCK_CLASSES_URL
                },
                {
                    name: 'STOCK_SUBCLASSES',
                    icon: 'fas fa-folder-tree',
                    route: ABS_STOCK_SUBCLASSES_URL
                },
                {
                    name: 'STOCK_VAT',
                    icon: 'fas fa-percentage',
                    route: ABS_STOCK_VAT_URL
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
                }
            ]
        },
        {
            name: 'STOCK_FILE',
            icon: 'fas fa-folder',
            children: [
                {
                    name: 'STOCK_AGENT',
                    icon: 'fas fa-user',
                    route: ABS_STOCK_AGENT_URL
                }
            ]
        }
    ]
};

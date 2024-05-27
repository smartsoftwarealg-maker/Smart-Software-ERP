import { Lookup } from '@ss/common/api-lookup';
import {
    APP_ASSET,
    APP_DASHBOARD,
    APP_HR, APP_LTM,
    APP_PAYROLL,
    APP_PURCHASE,
    APP_SALES, APP_SCHEDULED_SALES,
    APP_STOCK, APP_TREASURY
} from '@ss/common/api-common';

export const     APPLICATIONS: Lookup[] = [
    { id: APP_DASHBOARD,       description: 'DASHBOARD' },
    { id: APP_PURCHASE,        description: 'PURCHASES' },
    { id: APP_STOCK,           description: 'STOCK'     },
    { id: APP_SALES,           description: 'SALES'     },
    { id: APP_PAYROLL,         description: 'PAYROLL'   },
    { id: APP_HR,              description: 'HR'        },
    { id: APP_ASSET,           description: 'ASSETS'    },
    { id: APP_TREASURY,        description: 'TREASURY'  },
    { id: APP_LTM,             description: 'LTM'  },
    { id: APP_SCHEDULED_SALES, description: 'SCHEDULED_SALES'  },
];

export interface Dashboard {
    id: number;
    description: string;
    query: string;
    appId?: number;
    appName?: string;
}

export interface Headers {
    headers: string[];
}

export interface DashboardCenter {
    id: number;
    parentId: number;
    centerId: number;
    centerDescription?: string;
}

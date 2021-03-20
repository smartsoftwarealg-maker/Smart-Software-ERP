import {SideNavNode} from '@ss/common/ui-shell';
import {ABS_PURCHASE_ORDER_URL, ABS_PURCHASE_RECEPTION_URL} from "../constants";

export const purchasesNavTree: SideNavNode = {
    name: 'PURCHASES',
    icon: 'fas fa-warehouse-alt',
    children: [
        {
            name: 'PURCHASES_PURCHASE_ORDER',
            icon: 'fas fa-file',
            route: ABS_PURCHASE_ORDER_URL
        },
        {
            name: 'PURCHASES_RECEPTION',
            icon: 'fas fa-file',
            route: ABS_PURCHASE_RECEPTION_URL
        }
    ]
};

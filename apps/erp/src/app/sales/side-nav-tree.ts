import {SideNavNode} from "@ss/common/ui-shell";
import {DELIVERY_URL} from "@ss/sales/api-delivery";
import {ABS_SALES_DELIVERY_URL, ABS_SALES_ORDER_URL} from "../constants";


export const salesNavTree: SideNavNode = {
    name: 'SALES',
    icon: 'fas fa-warehouse-alt',
    children: [
        {
            name: 'SALES_ORDER',
            icon: 'fas fa-cart-plus',
            route: ABS_SALES_ORDER_URL
        },
        {
            name: 'SALES_DELIVERY',
            icon: 'fas fa-file',
            route: ABS_SALES_DELIVERY_URL
        },
    ]
};

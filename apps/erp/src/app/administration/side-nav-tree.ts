import {SideNavNode} from '@ss/common/ui-shell';
import {ABS_ADMINISTRATION_BANK_URL} from "../constants";

export const administrationNavTree: SideNavNode = {
    name: 'ADMINISTRATION',
    icon: 'fas fa-cog',
    children: [
        {
            name: 'ADMINISTRATION_BANK',
            icon: 'fas fa-university',
            route: ABS_ADMINISTRATION_BANK_URL
        }
    ]
};

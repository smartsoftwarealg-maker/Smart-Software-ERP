import { Right } from "@ss/common/api-common";

export interface SideNavNode {
    icon: string;
    name: string;
    route?: string;
    visible?: boolean;
    accessRights?: string;
    children?: SideNavNode[];
    backgroundColor?: string;
    customerRights?: Right;
}

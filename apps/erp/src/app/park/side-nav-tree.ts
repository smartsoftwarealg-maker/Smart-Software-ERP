
import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_PARK_DRIVER_URL,
    ABS_PARK_FUEL_TYPE_URL, ABS_PARK_INSURANCE_AGENCY_URL, ABS_PARK_INSURANCE_POLICY_URL,
    ABS_PARK_VEHICLE_TYPE_URL,
    ABS_PARK_VEHICLE_URL
} from "../common";

export const parkNavTree: SideNavNode = {
    name: 'PARK',
    icon: 'fa-solid fa-cars',
    children: [
        {
            name: 'PARK_VEHICLE_TYPES',
            icon: 'fa-solid fa-cars',
            route: ABS_PARK_VEHICLE_TYPE_URL,
            accessRights: 'VehicleType'
        },
        {
            name: 'PARK_AGENCIES',
            icon: 'fa-regular fa-building-columns',
            route: ABS_PARK_INSURANCE_AGENCY_URL,
            accessRights: 'InsuranceAgency'
        },
        {
            name: 'PARK_POLICIES',
            icon: 'fa-solid fa-podium',
            route: ABS_PARK_INSURANCE_POLICY_URL,
            accessRights: 'InsuranceAgency'
        },
        {
            name: 'PARK_FUEL_TYPES',
            icon: 'fa-solid fa-gas-pump',
            route: ABS_PARK_FUEL_TYPE_URL,
            accessRights: 'FuelType'
        },
        {
            name: 'PARK_VEHICLES',
            icon: 'fa-solid fa-truck',
            route: ABS_PARK_VEHICLE_URL,
            accessRights: 'Driver'
        },
        {
            name: 'PARK_DRIVERS',
            icon: 'fa-solid fa-id-card',
            route: ABS_PARK_DRIVER_URL,
            accessRights: 'Driver'
        },

    ],
    accessRights: 'PARK'
};

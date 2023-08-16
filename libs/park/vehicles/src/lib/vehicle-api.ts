export const VEHICLES = '/vehicles';
export const MAINTENANCE = '/maintenance';
export const FUEL = '/fuel';
export const OIL = '/oil';
export const INSURANCES = '/insurances';
export const DAMAGES = '/damages';
export const DRIVERS = '/drivers';

export interface Vehicle {
    id: number;
    centerId: number;
    description?: string;
    acquisitionDate?: Date;
    plateNumber?: string;
    odoMeter?: string;
    vType?: string;
    typeDescription?: string;
}

export interface VehicleMaintenance {
    id: number;
    parentId: number;
    date?: Date;
    invoiceNo?: string;
    supplier?: number;
    price?: number;
    description?: string;
    supplierName?: string;
}

export interface FuelConsumption {
    id: number;
    parentId: number;
    date?: Date;
    driver?: number;
    odoMeter?: number;
    orderNo?: string;
    fuelType?: number;
    driverName?: string;
    fuelDescription?: string;
}

export interface OilChange {
    id: number;
    parentId: number;
    date?: Date;
    odometer?: number;
    nextDate?: string;
    nextOdometer?: number;
}

export interface VehicleInsurance {
    id: number;
    parentId: number;
    date?: Date;
    agency?: number;
    policy?: number;
    amount?: number;
    nextDate?: Date;
    agencyDescription?: number;
    policyDescription?: number;
}

export interface VehicleDamage {
    id: number;
    parentId: number;
    driverId?: number;
    date?: Date;
    description?: string;
    fullName?: string;
    plateNo?: string;
    vehicleDescription?: string;
}

export interface VehicleDriver {
    id: number;
    parentId: number;
    personId: number;
    date?: Date;
    workPlace?: string;
    fullName?: string;
    description?: string;
    plateNo?: string;
}

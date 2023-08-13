export const VEHICLES = '/vehicles';
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

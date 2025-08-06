export const MISSIONS_ELEMENTS_URL = '/missions/elements';
export const MISSIONS_PRICING_URL = '/pricing';
export const ZONE_URL = '/lookups/zones';





export interface MissionElement {
    id: number,
    description: String,
    fromHour: number;
    fromMin: number;
    toHour: number;
    toMin: number;
    elemType: number,
    functionOf: string,
    typeDescription: string
}

export interface MissionElementPricing {
    id: number,
    parentId: number,
    theZone: number,
    zoneDescription:string,
    categoryDescription:string,
    element: number,
    category: number,
    amount: number,
}


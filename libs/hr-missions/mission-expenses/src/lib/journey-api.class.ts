export const JOURNEY_URL = '/journeys';

export interface MissionJourney {
    id: number;
    parentId: number;
    fromDate?: Date;
    toDate: Date;
    exclMeal: boolean;
    routeCount: number;
}

export interface MGeneration {
    id: number;
    elemList: string;
}

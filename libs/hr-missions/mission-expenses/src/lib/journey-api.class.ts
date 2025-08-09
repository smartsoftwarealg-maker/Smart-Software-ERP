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

export interface Summary {
    id: number;
    date: Date;
    element: string;
    amount: number;
}

export interface Detail {
    id: number;
    count: number;
    element: string;
    amount: number;
}

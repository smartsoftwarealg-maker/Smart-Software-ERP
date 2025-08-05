export const MISSIONS_URL = '/missions/missions';
export const ZONE_URL = '/lookups/zones';
export const TRANSPORT_URL = '/lookups/missions_transport';
export const TRAJECTORY_URL = '/payroll/trajectories';

export interface Trajectory {
    d: number;
    description: string;
    descriptionAr?: string;
    distance: number;
}

export interface Mission {
    id: number;
    number: number;
    center: number;
    employee: number;
    reference?: string;
    destination: string;
    theZone?: number;
    motive?: string;
    duration?: string;
    transportMeans?: number;
    departure?: string;
    returnBack?: string;
    advancement?: number;
    trajectory?: number;
    meals?: boolean;
    nights?: boolean;
    missionStatus: number;
    lastName?: string;
    firstName?: string;
    zoneName?: string;
    transportName?: string;
    trajectoryName?: string;
}

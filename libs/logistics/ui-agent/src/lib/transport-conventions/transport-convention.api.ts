export const AGENT_URL = '/agents'
export const TRANSPORT_CONVENTIONS_URL = '/transport-conventions'
export const CONVENTIONS_TYPES = ['LOGISTICS_INITIAL', 'LOGISTICS_AMENDMENT']

export interface TransportConvention {
    id: number;
    parentId: number;   //Customer_id //transporterId
    center: number;
    conventionType: number //1 = Initial 2 = Amendment
    conventionDate?: Date,
    fromDate: Date,
    toDate: Date,
    centerDescription?: string,
}

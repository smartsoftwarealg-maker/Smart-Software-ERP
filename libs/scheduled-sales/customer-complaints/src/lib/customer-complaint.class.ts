export const COMPLAINTS_URL = '/ssales/complaints';
export const COMPLAINTS_TYPE_URL = '/lookups/complaints';

export interface CustomerComplaint {
    id: number;
    centerId: number;
    date: Date;
    agentId: number;
    complaintId?: string;
    complaint?: string;
    answer?: string;
    agentDescription?: string;
    complaintDescription?: string;
}

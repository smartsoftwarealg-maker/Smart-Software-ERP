export interface CRMLeadActivity {
    id: number;
    parentId: number;
    activityType: string;
    subject: string;
    detail?: string;
    dueDate?: Date;
    priority: string;
    duration: number;
    status: string;
    completionDate?: Date;
    feedback?: string;
    ownerId: number;
    createdAt: Date;
    createdBy: number;
    updatedAt?: Date;
    updatedBy?: number;
    ownerDescription?: string;
    leadDescription?: string;
    toEmail?: string;
}
export interface EMessage {
    to?: string;
    subject?: string;
    body?: string;
    isHTML?: boolean;
}

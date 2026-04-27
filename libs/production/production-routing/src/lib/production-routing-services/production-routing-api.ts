export const ROUTING_CENTER_URL = '/production/routing';

export const ROUTING_STATUS = [
    'DRAFT',
    'APPROVED',
    'OBSOLETE',
    'CANCELLED'
];

export interface Routing {
    id: number;
    productId: number;
    routingNumber: string;
    revision: string;
    description?: string;
    status?: string;
    isDefault?: number;
    isActive?: number;
    validFrom: Date;
    validTo?: Date;
    lotSizeFrom?: number;
    lotSizeTo?: number;
    previousVersionId?: number;
    supersededById?: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    deletedAt?: Date;
}

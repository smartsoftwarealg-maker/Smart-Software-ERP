export const PRODUCTION_ROUTING_URL = '/production/routing';
export const ROUTING_OPERATION_URL = '/operations';

export const ROUTING_STATUS = ['DRAFT', 'APPROVED', 'OBSOLETE', 'CANCELLED'];
export const OPERATION_TYPE = [
    'PROCESS',
    'ASSEMBLY',
    'INSPECTION',
    'STORAGE',
    'SHIPPING',
    'SUBCONTRACT',
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

export interface RoutingOperation {
    id: number;
    parentId: number;
    operationSequence: number;
    operationNumber?: string;
    operationName?: string;
    workCenterId: number;
    setupTime?: number;
    runTimePerUnit?: number;
    teardownTime?: number;
    queueTime?: number;
    moveTime?: number;
    waitTime?: number;
    operationType?: number;
    isMilestone?: number;
    isCritical?: number;
    requiresInspection?: number;
    allowsBackflush?: number;
    laborCrewSize?: number;
    machineCount?: number;
    instructionText?: string;
    setupInstruction?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    deletedAt?: Date;
}

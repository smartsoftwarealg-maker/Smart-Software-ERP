export interface EmailTemplate{
        id: number;
        name: string;
        subject: string;
        thumbnail?: string;
        htmlContent: string;
        textContent?: string;
        category?: string;
        tags?: string;
        mergeFields?: string;
        status: string;
        ownerId: number;
        teamId?: number;
        createdAt: Date,
        createdBy: number;
        updatedAt: Date;
        updatedBy: number;
        ownerDescription?: string;
}

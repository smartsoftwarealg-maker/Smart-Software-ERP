export const ARCHIVE_URL = '/warch';
export interface Lookup {id: number; description: string }

export interface ArchiveDocument {
    id: number,
    _id?: string;
    filename?: string;
    length?: number;
    chunkSize?: number;
    uploadDate: string;
    thumbnail?: string[];
    imageStr?: string;
    imgSrc?: string;
    metadata: Record<string, any>;
}

export interface UPDocInfo{ _id: string;
                           description: string;
                           filename?: string;
                           user?: number;
                           personId?: number;
                           agentId?: number;
                           serviceId?: number;
                           receiver?: number;
                           tags?: string;
                 }

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';
import {
    BomListItem, BomItem, BomListRequest, BomListResponse, ProductType, BomStatus, BomType
} from './bom-list.model';
import {HttpService} from "@ss/common/api-common";
import {BOM} from "@ss/master-data/api-article";

@Injectable({ providedIn: 'root' })
export class BomListService {
    private readonly http = inject(HttpClient);
    private readonly httpSrv = inject(HttpService);
    private readonly API = '/manufacturing/boms';

    /** Fetch paginated BOM HEADERS (list/card views) */
    getBomList(request: BomListRequest): Observable<BomListResponse> {
        // 👇 Real backend:
        let params = new HttpParams()
          .set('page', request.page.toString())
          .set('pageSize', request.pageSize.toString());
        if (request.sortColumn) params = params.set('sortColumn', request.sortColumn);
        if (request.sortDirection) params = params.set('sortDirection', request.sortDirection);
        if (request.search) params = params.set('search', request.search);
        if (request.status) params = params.set('status', request.status);
        if (request.bomType) params = params.set('bomType', request.bomType);
        if (request.productType) params = params.set('productType', request.productType);
        const tmp = this.httpSrv
            .getData<BOM>(this.API, request.page, request.pageSize, request.search, request.sortColumn,  params)
            .pipe(map(res =>  {
                const bom: BOM[] = res.body;
                const itemList = { ...bom };
                const tmp = { items: itemList, totalCount: res.itemCount, page: request.page, pageSize: request.pageSize };
                return bom;
            }));


        return of(this.mockBomHeaders(request)).pipe(delay(400));
    }

    /** Fetch BOM EXPLOSION — the COMPONENTS of a specific BOM (tree view) */
    getBomExplosion(bomId: number): Observable<BomItem[]> {
        // 👇 Real backend:
        // return this.http.get<BomItem[]>(`${this.API}/${bomId}/explosion`);
        return of(this.mockBomExplosion(bomId)).pipe(delay(300));
    }

    /** Lightweight list of all BOMs for the tree-view selector */
    getAllBomSummaries(): Observable<{ id: number; bomNumber: string; productName: string }[]> {
        // 👇 Real backend:
        // return this.http.get<...>(`${this.API}/summaries`);
        return of([
            { id: 1, bomNumber: 'BOM-001', productName: 'Steel Bracket Assembly' },
            { id: 2, bomNumber: 'BOM-002', productName: 'Aluminum Housing' },
            { id: 3, bomNumber: 'BOM-003', productName: 'Hydraulic Pump Assembly' },
            { id: 4, bomNumber: 'BOM-004', productName: 'Control Panel PCB' },
            { id: 5, bomNumber: 'BOM-005', productName: 'Legacy Gearbox' },
            { id: 6, bomNumber: 'BOM-006', productName: 'Electric Motor Stator' },
        ]).pipe(delay(150));
    }

    getStats() {
        return of({ total: 247, released: 189, draft: 42, obsolete: 16, pending: 8 }).pipe(delay(200));
    }

    // ============ MOCK DATA ============

    private mockBomHeaders(req: BomListRequest): BomListResponse {
        const allBoms: BomListItem[] = [
            this.mockHeader(1, '2.0', 'Steel Bracket Assembly', 'WIDGET-A-1000', 'FINISHED_GOOD', 'PRODUCTION', 'RELEASED', 12, 3, 1, 'EA', '2024-01-15', null, 'A. Doe', 'AD', new Date('2024-06-09')),
            this.mockHeader(2, '1.0', 'Aluminum Housing', 'WIDGET-B-2000', 'FINISHED_GOOD', 'PRODUCTION', 'DRAFT', 8, 2, 1, 'EA', '2024-06-01', null, 'J. Smith', 'JS', new Date('2024-06-10')),
            this.mockHeader(3, '3.1', 'Hydraulic Pump Assembly', 'PUMP-HYD-500', 'FINISHED_GOOD', 'PRODUCTION', 'RELEASED', 34, 4, 1, 'EA', '2023-08-10', '2024-12-31', 'M. Kim', 'MK', new Date('2024-06-03')),
            this.mockHeader(4, '1.2', 'Control Panel PCB', 'PCB-CTRL-100', 'FINISHED_GOOD', 'ENGINEERING', 'PENDING', 67, 1, 100, 'EA', '2024-03-20', null, 'L. Rodriguez', 'LR', new Date('2024-06-07')),
            this.mockHeader(5, '4.0', 'Legacy Gearbox', 'GB-LEG-250', 'FINISHED_GOOD', 'COSTING', 'OBSOLETE', 18, 2, 1, 'EA', '2022-02-05', '2024-01-01', 'System', 'SY', new Date('2023-12-01')),
            this.mockHeader(6, '1.0', 'Electric Motor Stator', 'MOT-ST-300', 'FINISHED_GOOD', 'PRODUCTION', 'RELEASED', 22, 3, 1, 'EA', '2024-04-12', null, 'T. Patel', 'TP', new Date('2024-06-09')),
        ];

        let filtered = allBoms.filter(b => {
            if (req.status && b.status !== req.status) return false;
            if (req.bomType && b.bomType !== req.bomType) return false;
            if (req.productType && b.productType !== req.productType) return false;
            if (req.search) {
                const hay = `${b.bomNumber} ${b.productName} ${b.productSku}`.toLowerCase();
                if (!hay.includes(req.search.toLowerCase())) return false;
            }
            return true;
        });

        if (req.sortColumn && req.sortDirection) {
            const dir = req.sortDirection === 'asc' ? 1 : -1;
            filtered.sort((a, b) => {
                const va = (a as any)[req.sortColumn!] ?? '';
                const vb = (b as any)[req.sortColumn!] ?? '';
                return va < vb ? -dir : va > vb ? dir : 0;
            });
        }

        const start = req.page * req.pageSize;
        return { items: filtered.slice(start, start + req.pageSize), totalCount: filtered.length, page: req.page, pageSize: req.pageSize };
    }

    /** Mock BOM EXPLOSION — components of a specific BOM */
    private mockBomExplosion(bomId: number): BomItem[] {
        const explosions: Record<string, BomItem[]> = {
            'BOM-001': [
                this.mockItem(1, null, 0, false, 'Steel Plate 10mm', 'MAT-ST-10-1000', 'RAW_MATERIAL', 2.0, 'EA', 2.5, false, false),
                this.mockItem(2, null, 0, true, 'Hinge Sub-Assembly', 'HINGE-ASSY-01', 'SUB_ASSEMBLY', 1.0, 'EA', 0, true, true),
                this.mockItem(3, null, 0, false, 'Welding Wire ER70S-6', 'MAT-WW-ER70', 'CONSUMABLE', 0.5, 'KG', 1.0, false, false),
                this.mockItem(4, null, 0, false, 'Bolts M8 x 25mm', 'MAT-BT-M8-25', 'RAW_MATERIAL', 10, 'EA', 1.0, false, false),
                this.mockItem(5, null, 0, false, 'Paint Blue RAL 5005', 'MAT-PNT-BLUE', 'CONSUMABLE', 0.5, 'L', 5.0, false, false),
                // Children of phantom Hinge Sub-Assembly
                this.mockItem(6, 2, 1, false, 'Hinge Pin', 'MAT-HP-001', 'RAW_MATERIAL', 1.0, 'EA', 0, false, false),
                this.mockItem(7, 2, 1, true, 'Hinge Plate', 'HINGE-PLATE-01', 'SUB_ASSEMBLY', 2.0, 'EA', 2.0, true, true),
                // Children of phantom Hinge Plate
                this.mockItem(8, 7, 2, false, 'Pin Rivet', 'MAT-RV-004', 'RAW_MATERIAL', 4.0, 'EA', 1.0, false, false),
            ],
            'BOM-002': [
                this.mockItem(101, null, 0, false, 'Aluminum Sheet 2mm', 'MAT-AL-2MM', 'RAW_MATERIAL', 3.0, 'EA', 3.0, false, false),
                this.mockItem(102, null, 0, false, 'Rivets Aluminum', 'MAT-RV-AL', 'RAW_MATERIAL', 24, 'EA', 2.0, false, false),
                this.mockItem(103, null, 0, false, 'Corner Brackets', 'MAT-CB-AL', 'RAW_MATERIAL', 4, 'EA', 1.5, false, false),
            ],
            'BOM-003': [
                this.mockItem(201, null, 0, false, 'Pump Casing', 'MAT-PC-500', 'RAW_MATERIAL', 1.0, 'EA', 1.0, false, false),
                this.mockItem(202, null, 0, true, 'Impeller Assembly', 'IMP-ASSY-01', 'SUB_ASSEMBLY', 1.0, 'EA', 0, true, true),
                this.mockItem(203, null, 0, false, 'Shaft Seal', 'MAT-SS-500', 'RAW_MATERIAL', 1.0, 'EA', 0.5, false, false),
                this.mockItem(204, 202, 1, false, 'Impeller Blade', 'MAT-IB-01', 'RAW_MATERIAL', 6.0, 'EA', 2.0, false, false),
                this.mockItem(205, 202, 1, false, 'Impeller Hub', 'MAT-IH-01', 'RAW_MATERIAL', 1.0, 'EA', 1.0, false, false),
            ],
        };
        return explosions[bomId] ?? [];
    }

    private mockHeader(
        id: number, revision: string, productName: string, productSku: string,
        productType: ProductType, bomType: BomType, status: BomStatus,
        componentCount: number, maxHierarchyLevel: number,
        baseQuantity: number, baseUom: string,
        validFrom: string, validTo: string | null,
        updatedBy: string, updatedByInitials: string, updatedAt: Date
    ): BomListItem {
        return {
            id, bomNumber: id +'', revision, productName, productSku,
            productType, bomType, status, componentCount, maxHierarchyLevel,
            baseQuantity, baseUom, validFrom, validTo,
            updatedBy, updatedByInitials, updatedAt
        };
    }

    private mockItem(
        id: number, parentId: number | null, level: number, hasChildren: boolean,
        componentName: string, componentSku: string, componentType: ProductType,
        quantity: number, unit: string, scrapPct: number,
        isPhantom: boolean, hasOwnBom: boolean
    ): BomItem {
        return {
            id, parentId, level, hasChildren,
            componentName, componentSku, componentType,
            quantity, unit, scrapPct, isPhantom, hasOwnBom
        };
    }
}

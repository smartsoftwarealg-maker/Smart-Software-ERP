import { Component, inject, signal, computed, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
    BomListItem, BomItem, BomFilter, BomListRequest,
    BomStatus, BomType, ProductType, ViewMode, SortDirection
} from './bom-list.model';
import { BomListService } from './bom-list.service';

@Component({
    selector: 'app-bom-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './bom-list.component.html',
    styleUrls: ['./bom-list.component.scss']
})
export class BomListComponent implements OnInit {

    private readonly service = inject(BomListService);
    private readonly router = inject(Router);

    // Expose Math to template (for pagination display)
    readonly Math = Math;

    // === VIEW MODE ===
    viewMode = signal<ViewMode>('list');

    // === BOM HEADERS (list/card views) ===
    items = signal<BomListItem[]>([]);
    totalCount = signal(0);
    isLoading = signal(true);

    // === BOM EXPLOSION (tree view) ===
    treeItems = signal<BomItem[]>([]);
    isLoadingExplosion = signal(false);
    selectedBomForTree = signal<BomListItem | null>(null);
    allBomSummaries = signal<{ id: number; bomNumber: string; productName: string }[]>([]);

    // === SINGLE-NODE EXPANSION (tree view — expands phantom sub-assemblies) ===
    expandedItemId = signal<number | null>(null);
    childrenCache = signal<Map<string, BomItem[]>>(new Map());

    // === SELECTION ===
    selectedIds = signal<Set<number>>(new Set());

    // === FILTERS ===
    filter = signal<BomFilter>({ search: '', status: '', bomType: '', productType: '' });

    // === PAGINATION ===
    currentPage = signal(0);
    pageSize = signal(25);

    // === SORTING ===
    sortColumn = signal<string>('');
    sortDirection = signal<SortDirection>('');

    // === STATS ===
    stats = signal({ total: 0, released: 0, draft: 0, obsolete: 0, pending: 0 });

    // === MENU ===
    activeMenu = signal<string | null>(null);

    // === TABLE COLUMNS (list view) ===
    listColumns: string[] = [
        'select', 'bomNumber', 'revision', 'product', 'bomType',
        'components', 'status', 'baseQty', 'validFrom', 'updated', 'actions'
    ];

    // Debounced search
    private searchSubject = new Subject<string>();

    // === COMPUTED: Visible tree rows (top-level + expanded phantom children) ===
    treeVisibleRows = computed(() => {
        const expandedId = this.expandedItemId();
        const allItems = this.treeItems();
        const result: BomItem[] = [];

        for (const item of allItems) {
            // Only show top-level items, plus children of the expanded phantom
            if (item.parentId === null) {
                result.push(item);
                if (expandedId === item.id) {
                    result.push(...allItems.filter(c => c.parentId === item.id));
                }
            }
        }
        return result;
    });

    // === COMPUTED: Tree view stats ===
    treeStats = computed(() => {
        const items = this.treeItems();
        return {
            totalComponents: items.length,
            maxLevel: items.reduce((max, i) => Math.max(max, i.level), 0) + 1,
            phantomCount: items.filter(i => i.isPhantom).length
        };
    });

    constructor() {
        this.searchSubject.pipe(debounceTime(300)).subscribe(search => {
            this.filter.update(f => ({ ...f, search }));
            this.currentPage.set(0);
            this.loadData();
        });
    }

    ngOnInit() {
        this.loadStats();
        this.loadData();
        this.loadAllBomSummaries();
    }

    // === DATA LOADING ===
    private loadData() {
        this.isLoading.set(true);
        const request: BomListRequest = {
            page: this.currentPage(),
            pageSize: this.pageSize(),
            sortColumn: this.sortColumn() || undefined,
            sortDirection: this.sortDirection() || undefined,
            search: this.filter().search || undefined,
            status: this.filter().status || undefined,
            bomType: this.filter().bomType || undefined,
            productType: this.filter().productType || undefined
        };

        this.service.getBomList(request).subscribe({
            next: (r) => { this.items.set(r.items); this.totalCount.set(r.totalCount); this.isLoading.set(false); },
            error: () => this.isLoading.set(false)
        });
    }

    private loadStats() {
        this.service.getStats().subscribe(s => this.stats.set(s));
    }

    private loadAllBomSummaries() {
        this.service.getAllBomSummaries().subscribe(s => this.allBomSummaries.set(s));
    }

    // === TREE VIEW: EXPLODE A BOM ===

    /**
     * Explode a BOM: switch to tree view and load its component hierarchy.
     * Called from list/card view "Explode" button.
     */
    explodeBom(bom: BomListItem) {
        this.viewMode.set('tree');
        this.loadExplosion(bom);
    }

    /**
     * Load the explosion for a specific BOM (called when user selects a BOM in tree view).
     */
    loadExplosion(bom: BomListItem) {
        this.selectedBomForTree.set(bom);
        this.expandedItemId.set(null);
        this.childrenCache.set(new Map());
        this.isLoadingExplosion.set(true);

        this.service.getBomExplosion(bom.id).subscribe({
            next: (items) => {
                this.treeItems.set(items);
                this.isLoadingExplosion.set(false);
            },
            error: () => this.isLoadingExplosion.set(false)
        });
    }

    /**
     * Called when user changes the BOM selector in tree view.
     */
    onTreeBomChange(bomId: number) {
        const bom = this.allBomSummaries().find(b => b.id === bomId);
        if (!bom) return;

        // Build a minimal BomListItem for the selected BOM
        const header: BomListItem = {
            id: bom.id, bomNumber: bom.bomNumber, revision: '',
            productName: bom.productName, productSku: '',
            productType: 'FINISHED_GOOD', bomType: 'PRODUCTION', status: 'RELEASED',
            componentCount: 0, maxHierarchyLevel: 0,
            baseQuantity: 1, baseUom: 'EA',
            validFrom: '', validTo: null,
            updatedBy: '', updatedByInitials: '', updatedAt: new Date()
        };
        this.loadExplosion(header);
    }

    /**
     * Drill down into a phantom sub-assembly's own BOM.
     */
    openSubAssemblyBom(item: BomItem) {
        if (!item.hasOwnBom) return;
        // In a real app, this would load the sub-assembly's BOM.
        // For demo, we'll just expand it inline (already handled by toggleExpansion).
        this.toggleExpansion(item);
    }

    /**
     * Go back to list view from tree view.
     */
    goBackToList() {
        this.viewMode.set('list');
    }

    // === TREE VIEW: EXPAND/COLLAPSE PHANTOM SUB-ASSEMBLIES ===

    isExpanded(item: BomItem): boolean {
        return this.expandedItemId() === item.id;
    }

    toggleExpansion(item: BomItem, event?: Event) {
        event?.stopPropagation();
        if (!item.hasChildren) return;

        if (this.expandedItemId() === item.id) {
            this.expandedItemId.set(null);
        } else {
            this.expandedItemId.set(item.id);
        }
    }

    // === SELECTION ===
    isAllSelected(): boolean {
        const visible = this.viewMode() === 'tree' ? this.treeVisibleRows() : this.items();
        return visible.length > 0 && visible.every(r => this.selectedIds().has(r.id));
    }

    toggleSelectAll() {
        const visible = this.viewMode() === 'tree' ? this.treeVisibleRows() : this.items();
        if (this.isAllSelected()) {
            this.selectedIds.set(new Set());
        } else {
            this.selectedIds.set(new Set(visible.map(r => r.id)));
        }
    }

    toggleSelect(item: BomListItem | BomItem, event?: Event) {
        event?.stopPropagation();
        const next = new Set(this.selectedIds());
        if (next.has(item.id)) next.delete(item.id);
        else next.add(item.id);
        this.selectedIds.set(next);
    }

    isSelected(item: BomListItem | BomItem): boolean {
        return this.selectedIds().has(item.id);
    }

    // === FILTERS ===
    onSearchInput(event: Event) {
        this.searchSubject.next((event.target as HTMLInputElement).value);
    }

    updateFilter(patch: Partial<BomFilter>) {
        this.filter.update(f => ({ ...f, ...patch }));
        this.currentPage.set(0);
        this.loadData();
    }

    clearFilters() {
        this.filter.set({ search: '', status: '', bomType: '', productType: '' });
        this.currentPage.set(0);
        this.sortColumn.set('');
        this.sortDirection.set('');
        this.loadData();
    }

    // === PAGINATION ===
    totalPages(): number { return Math.ceil(this.totalCount() / this.pageSize()); }

    goToPage(page: number) {
        if (page >= 0 && page < this.totalPages()) {
            this.currentPage.set(page);
            this.loadData();
        }
    }

    onPageSizeChange(size: number) {
        this.pageSize.set(size);
        this.currentPage.set(0);
        this.loadData();
    }

    getPageNumbers(): number[] {
        const total = this.totalPages();
        const current = this.currentPage();
        const pages: number[] = [];
        if (total <= 7) {
            for (let i = 0; i < total; i++) pages.push(i);
        } else {
            pages.push(0);
            if (current > 2) pages.push(-1);
            for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++) pages.push(i);
            if (current < total - 3) pages.push(-1);
            pages.push(total - 1);
        }
        return pages;
    }

    // === SORTING ===
    onSortChange(sort: { active: string; direction: SortDirection }) {
        this.sortColumn.set(sort.active);
        this.sortDirection.set(sort.direction);
        this.currentPage.set(0);
        this.loadData();
    }

    getSortDirection(column: string): SortDirection {
        if (this.sortColumn() !== column) return 'asc';
        return this.sortDirection() === 'asc' ? 'desc' : 'asc';
    }

    getSortIcon(column: string): string {
        if (this.sortColumn() !== column) return 'fa-solid fa-sort';
        return this.sortDirection() === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
    }

    // === VIEW MODE ===
    setViewMode(mode: ViewMode) {
        this.viewMode.set(mode);
    }

    // === NAVIGATION ===
    viewBom(item: BomListItem) { this.router.navigate(['/boms', item.id]); }
    editBom(item: BomListItem) { this.router.navigate(['/boms', item.id, 'edit']); }
    whereUsed(item: BomListItem | BomItem) { this.router.navigate(['/boms', 'where-used', item.id]); }

    // === MENU ===
    toggleMenu(itemId: string, event: Event) {
        event.stopPropagation();
        this.activeMenu.set(this.activeMenu() === itemId ? null : itemId);
    }

    @HostListener('document:click')
    onDocumentClick() { this.activeMenu.set(null); }

    // === HELPERS ===
    getIndentClass(item: BomItem): string { return `level-${item.level}`; }

    getTypeIcon(type: ProductType): string {
        const icons: Record<ProductType, string> = {
            'FINISHED_GOOD': 'fa-box', 'SUB_ASSEMBLY': 'fa-cubes',
            'RAW_MATERIAL': 'fa-cube', 'CONSUMABLE': 'fa-bottle-droplet'
        };
        return icons[type];
    }

    getTypeClass(type: ProductType): string {
        const classes: Record<ProductType, string> = {
            'FINISHED_GOOD': 'type-finished', 'SUB_ASSEMBLY': 'type-subassembly',
            'RAW_MATERIAL': 'type-raw', 'CONSUMABLE': 'type-consumable'
        };
        return classes[type];
    }

    relativeTime(date: Date): string {
        const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
}

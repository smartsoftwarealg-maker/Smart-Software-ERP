import {Component, computed, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LanguageService, LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {BomService} from "@ss/master-data/ui-article";
import {BOM} from "@ss/master-data/api-article";
import {TranslatePipe} from "@ss/common/ui-lang";

// Assuming these interfaces exist or need to be created based on your backend
// export interface BOM {
//   id: number;
//   bomNumber: string;
//   revision: string;
//   productName: string;
//   productSku: string;
//   bomType: 'PRODUCTION' | 'ENGINEERING' | 'MANUFACTURING' | 'COSTING';
//   status: 'RELEASED' | 'DRAFT' | 'PENDING' | 'OBSOLETE';
//   componentsCount: number;
//   hierarchyLevel: number;
//   baseQty: string;
//   validFrom: Date;
//   validUntil?: Date;
//   lastUpdatedBy: string;
//   lastUpdatedTime: Date;
//   email?: string; // For BaseEntityListComponent
// }

export interface BOMTree {
  bom: BOM;
  children?: BOMTree[];
}

export interface StatCard {
  label: string;
  value: number;
  trend?: string;
  trendIcon?: string;
  trendColor?: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  active: boolean;
  filterValue: string; // To link with filter
}

export interface FilterTab {
  label: string;
  icon: string;
  count: number;
  active: boolean;
  filterValue: string; // To link with filter
}

@Component({
  selector: 'ss-bom-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    ReactiveFormsModule,
      TranslatePipe,
  ],
  templateUrl: './bom-list.component.html',
  styleUrl: './bom-list.component.scss',
})
export class BomListComponent extends BaseEntityListComponent<BOM> implements OnInit, OnDestroy {
  private loginSrv = inject(LoginService);
  private langSrv = inject(LanguageService);

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  // Data for statistics cards (dummy data for now)
  statsCards: StatCard[] = [
    { label: 'Total BOMs', value: 247, trend: '12 this month', trendIcon: 'fa-arrow-up', trendColor: 'var(--success)', icon: 'fa-layer-group', iconBgColor: '#dbeafe', iconColor: '#1e40af', active: true, filterValue: 'ALL' },
    { label: 'Released', value: 189, trend: '8 this month', trendIcon: 'fa-arrow-up', trendColor: 'var(--success)', icon: 'fa-circle-check', iconBgColor: '#dcfce7', iconColor: '#166534', active: false, filterValue: 'RELEASED' },
    { label: 'Draft', value: 42, trend: '4 this month', trendIcon: 'fa-arrow-up', trendColor: 'var(--success)', icon: 'fa-pen-to-square', iconBgColor: '#fef3c7', iconColor: '#92400e', active: false, filterValue: 'DRAFT' },
    { label: 'Obsolete', value: 16, trend: 'No change', trendIcon: 'fa-minus', trendColor: 'var(--text-muted)', icon: 'fa-ban', iconBgColor: '#f1f5f9', iconColor: '#475569', active: false, filterValue: 'OBSOLETE' },
    { label: 'Total Components', value: 2847, trend: '156 this month', trendIcon: 'fa-arrow-up', trendColor: 'var(--success)', icon: 'fa-cubes', iconBgColor: '#fce7f3', iconColor: '#9d174d', active: false, filterValue: 'COMPONENTS' },
  ];

  // Data for quick filter tabs (dummy data for now)
  filterTabs: FilterTab[] = [
    { label: 'All', icon: 'fa-globe', count: 247, active: true, filterValue: 'ALL' },
    { label: 'Released', icon: 'fa-circle-check', count: 189, active: false, filterValue: 'RELEASED' },
    { label: 'Draft', icon: 'fa-pen-to-square', count: 42, active: false, filterValue: 'DRAFT' },
    { label: 'Obsolete', icon: 'fa-ban', count: 16, active: false, filterValue: 'OBSOLETE' },
    { label: 'Favorites', icon: 'fa-star', count: 8, active: false, filterValue: 'FAVORITES' },
    { label: 'Recently Modified', icon: 'fa-clock-rotate-left', count: 23, active: false, filterValue: 'RECENT' },
  ];

  // MatTableDataSource will wrap the data from the base class
  dataSource = new MatTableDataSource<BOM>([]);

  displayedColumns = signal<string[]>([
    // 'select',
    'bomNumber',
    'revision',
    'product',
    'bomType',
    'components',
    'status',
    'baseQty',
    'validFrom',
    'lastUpdated',
    // 'actions',
  ]);

  searchControl = new FormControl('');
  statusFilterControl = new FormControl('');
  typeFilterControl = new FormControl('');
  productTypeFilterControl = new FormControl('');
  plantFilterControl = new FormControl('');

  viewMode = signal<'list' | 'tree' | 'cards'>('list');
  selectedBOMs = signal<BOM[]>([]);
  allBOMsSelected = computed(() => this.data.length > 0 && this.selectedBOMs().length === this.data.length);

  // Tree view specific properties (if needed for a separate tree view)
  treeControl = new NestedTreeControl<BOMTree>(node => node.children);
  treeDataSource = new MatTreeNestedDataSource<BOMTree>();
  hasChild = (_: number, node: BOMTree) => !!node.children && node.children.length > 0;

  constructor(
    public override entitySrv: BomService, // Use actual BomService
    public override shellSrv: ShellService,
    public override snackBarSrv: SnackBarService,
    public override route: ActivatedRoute,
    public override router: Router,
    public override confirmationSrv: ConfirmationDialogService,
    public override defReportSrv: DefaultReportService,
    public override pagPersistSrv: PaginatorPersistenceService,
  ) {
    super(
      entitySrv,
      shellSrv,
      snackBarSrv,
      route,
      router,
      confirmationSrv,
      defReportSrv,
      pagPersistSrv,
      'MANUFACTURING_BOM_LIST' // Your module title
    );

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => this.applyFilter(value || ''));

    // Apply filters to MatTableDataSource
    this.dataSource.filterPredicate = (data: BOM, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const searchMatch = data.bomNumber?.toLowerCase().includes(searchTerms.search) ||
                          data.productDescription?.toLowerCase().includes(searchTerms.search);

      const statusMatch = searchTerms.status === '' || data.status === searchTerms.status;
      const bomTypeMatch = searchTerms.bomType === '' || data.bomType === searchTerms.bomType;
      // Add other filter conditions as needed

      return searchMatch && statusMatch && bomTypeMatch;
    };
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Set MatTableDataSource after data is loaded by super.ngOnInit()
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
    this.treeDataSource.data = this.buildTreeData(this.data); // Initialize tree data
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // Method to convert flat BOM list to hierarchical BOMTree (dummy for now)
  private buildTreeData(boms: BOM[]): BOMTree[] {
    // This is a placeholder. You'll need actual logic to build a tree
    // based on parent-child relationships in your BOM data.
    // For now, it creates a flat tree structure from the BOM list.
    return boms.map(bom => ({ bom: bom, children: <BOMTree[]>[] }));
  }

  applyFilter(searchValue: string) {

    this.dataSource.filter = JSON.stringify({
        search: searchValue.trim().toLowerCase(),
        status: this.statusFilterControl.value || '',
        bomType: this.typeFilterControl.value || '',
        productType: this.productTypeFilterControl.value || '',
        plant: this.plantFilterControl.value || '',
    });
    this.refresh();
  }

  onStatCardClick(card: StatCard): void {
    this.statsCards.forEach(c => c.active = false);
    card.active = true;

    // Apply filter based on card.filterValue
    this.statusFilterControl.setValue(card.filterValue === 'ALL' ? '' : card.filterValue);
    this.applyFilter(this.searchControl.value || '');
  }

  onFilterTabClick(tab: FilterTab): void {
    this.filterTabs.forEach(t => t.active = false);
    tab.active = true;
    // Apply filter based on tab.filterValue
    this.statusFilterControl.setValue(tab.filterValue === 'ALL' ? '' : tab.filterValue);
    this.applyFilter(this.searchControl.value || '');
  }

  onViewToggle(mode: 'list' | 'tree' | 'cards'): void {
    this.viewMode.set(mode);
    // Logic to switch between different views (e.g., show/hide mat-table, mat-tree, or custom card view)
  }

  onSelectAll(event: any): void {
    if (event.checked) {
      this.selectedBOMs.set([...this.data]);
    } else {
      this.selectedBOMs.set([]);
    }
  }

  onRowSelect(event: any, row: BOM): void {
    if (event.checked) {
      this.selectedBOMs.update(boms => [...boms, row]);
    } else {
      this.selectedBOMs.update(boms => boms.filter(b => b.id !== row.id));
    }
    // Also update the single selectedRow from BaseEntityListComponent
    this.selectRow(row);
  }

  isRowSelected(row: BOM): boolean {
    return this.selectedBOMs().some(b => b.id === row.id);
  }

 expandRow(row: BOM): void {
   console.log(row);
 }

  newBOM(): void {
    this.showDetail(0); // Assuming 0 means new entity
  }

  importBOM(): void {
    this.snackBarSrv.showMessage('Import functionality not yet implemented.');
  }

  exportBOM(): void {
    this.snackBarSrv.showMessage('Export functionality not yet implemented.');
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.statusFilterControl.setValue('');
    this.typeFilterControl.setValue('');
    this.productTypeFilterControl.setValue('');
    this.plantFilterControl.setValue('');
    this.statsCards.forEach((c, i) => c.active = (i === 0)); // Activate 'All BOMs'
    this.filterTabs.forEach((t, i) => t.active = (i === 0)); // Activate 'All' tab
    this.applyFilter(''); // Clear all filters
  }

  onSortChange(sortState: Sort): void {
    // MatTableDataSource handles sorting automatically if `matSort` is provided
    if (this.dataSource.sort) {
      this.dataSource.sort.active = sortState.active;
      this.dataSource.sort.direction = sortState.direction;
      this.dataSource.sort = this.dataSource.sort; // Trigger sort update
    }
  }

  onPageChange(event: PageEvent): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.refresh();
  }

  override refresh(callback?: () => void): void {
    // Implement actual data fetching logic here
    // For now, just re-apply filter to dummy data
    // In a real app, you'd call your entitySrv.getPage here
    // and then update this.data and this.dataSource.data
    this.setLoading(true);
      // pageModel.page - 1, pageModel.pageSize, filter, this._sortColumn, extraPrams
    this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize, this.filter, this.sortBy)
      .pipe(
        tap(data => {
          this.data = data.body; // Update data from BaseEntityListComponent
          this.matPaginator.length = data.itemCount;
          this.dataSource.data = this.data; // Update MatTableDataSource
          this.dataSource.paginator = this.matPaginator; // Re-assign paginator if needed
          this.dataSource.sort = this.matSort; // Re-assign sort if needed
          // this.applyFilter(this.searchControl.value || ''); // Re-apply filters
        })
      )
      .subscribe({
        next: () => {
          this.setLoading(false);
          if (callback) {
            callback();
          }
        },
        error: (err) => {
          this.setLoading(false);
          this.snackBarSrv.showFailureMessage();
          console.error(err);
        }
      });
  }

  // Helper to format dates
  formatDate(date: Date | undefined): string {
    return date ? this.langSrv.formatDate(date) : 'No expiry';
  }

  // Helper to format time ago
  timeAgo(date: Date | string | undefined): string {
    if (!date) return '';
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  }
}

import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Company, CompanyService} from "@ss/administration/api-company";
import {FlatTreeControl} from "@angular/cdk/tree";
import {Center, CenterService} from "@ss/administration/api-center";
import {LanguageService} from "@ss/common/ui-lang";
import {SelectionChange} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";
import {PaginationModel} from "@ss/common/ui-pagination";
import {DETAIL_URL} from "@ss/common/api-common";

/** Flat node with expandable and level information */
export class DynamicFlatNode {
    constructor(public company: Company,
                public centers: Center[],
                public level,
                public expandable,
                public isLoading?,
                public maxItemCount?: number) {
    }
}

declare type SelectedType = 'company' | 'center';


@Component({
    selector: 'ss-company-center-tree',
    styleUrls: ['./company-center-tree.component.scss'],
    templateUrl: './company-center-tree.component.html'
})
export class CompanyCenterTreeComponent implements OnInit {

    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: false,
        click: () => {
            this.refresh();
        }
    };
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: false,
        menuItems: [
            {
                icon: 'fas fa-plus',
                label: 'ADMINISTRATION_ADD_COMPANY',
                disabled: false,
                click: () => this.addButtonClicked("company"),
                visible: true
            },
            {
                icon: 'fas fa-plus',
                label: 'ADMINISTRATION_ADD_CENTER',
                disabled: false,
                click: () => this.addButtonClicked("center"),
                visible: true
            }
        ]
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: false,
        click: () => this.edit()
    };
    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: false,
        click: () => this.deleteSelected()
    };
    //
    public filter: string;
    public centerPageSize: number = 10;
    //
    public companies: Company[] = [];
    public selectedCompany: Company;
    public selectedCenter: Center;
    //
    public treeControl: FlatTreeControl<DynamicFlatNode>
    public treeData: DynamicFlatNode[] = [];
    public treeDataSource: BehaviorSubject<DynamicFlatNode[]>;

    getLevel = (node: DynamicFlatNode) => node.level;

    isExpandable = (node: DynamicFlatNode) => node.expandable;

    hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
    //
    public readonly companyPagination = PaginationModel.newInstance();


    constructor(
        public companySrv: CompanyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public langSrv: LanguageService,
        public centerSrv: CenterService) {
    }


    public ngOnInit(): void {
        this.shellSrv.setTilte('ADMINISTRATION_COMPANY');
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.enableSearch('COMMON_SEARCH', o => o.subscribe(f => this.setFilter(f)));
        this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton]);
        this.companyPagination.onChange = () => this.refresh();
        this.refresh();
    }

    public setFilter(fltr: string): void {
        this.filter = fltr;
        this.companyPagination.onChange = () => this.refresh();
        this.refresh();
    }

    public refresh(): void {
        this.releaseResources();
        this.shellSrv.setLoading(true);

        this.companySrv.getPage(
            this.companyPagination,
            this.filter
        ).subscribe(
            data => this.finishLoading(data),
            err => {
                this.shellSrv.setLoading(false); // stop the animation
                throw err;
            }
        );
    }


    finishLoading(companies: Company[]) {
        this.createCompanyTree(companies);
        this.shellSrv.setLoading(false);
    }


    createCompanyTree(companies: Company[]): void {
        this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
        this.treeDataSource = new BehaviorSubject([]);
        this.treeData = companies.map(x => new DynamicFlatNode(x, null, () => 0, () => false, false))
        this.notifyTreeDataChange(); // update the view according to the model
        this.onTreeChanged(); // listen to opened and closed nodes
    }

    notifyTreeDataChange(): void {
        this.treeDataSource.next(this.treeData);
    }

    onTreeChanged(): void {
        this.treeControl.expansionModel.changed.subscribe(change => {
            if ((change as SelectionChange<DynamicFlatNode>).added ||
                (change as SelectionChange<DynamicFlatNode>).removed) {
                this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
            }
        });
    }

    handleTreeControl(change: SelectionChange<DynamicFlatNode>): void {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }

    toggleNode(node: DynamicFlatNode, expand: boolean): void {
        if (expand) {
            this.addChildNode(node);
        } else {
            this.removeChildNode(node);
        }
    }

    addChildNode(node: DynamicFlatNode): void {
        const childIndex = this.getNodeIndex(node) + 1;
        const emptyNode = new DynamicFlatNode(null, [], 1, false, false);
        emptyNode.isLoading = true;
        this.getCenters(0, node.company.id)
            .subscribe(
                response => {
                    emptyNode.centers = response.body;
                    emptyNode.maxItemCount = response.itemCount;
                    this.treeData.splice(childIndex, 0, emptyNode)
                    this.notifyTreeDataChange();
                },
                error => {
                    throw error;
                },
                () => {
                    emptyNode.isLoading = false;
                }
            )

    }

    removeChildNode(node: DynamicFlatNode): void {
        const childIndex = this.getNodeIndex(node) + 1;
        if (this.treeData[childIndex] && this.treeData[childIndex].level > node.level()) {
            this.treeData.splice(childIndex, 1);
            this.notifyTreeDataChange();
        }
    }

    public edit() {
        if (this.selectedCompany) {
            this.showDetail(this.selectedCompany.id, "company");
        } else if (this.selectedCenter) {
            this.showDetail(this.selectedCenter.id, "center");
        }
    }

    public showDetail(id: number, type: string): void {
        const params = {
            id: id
        };

        this.router.navigate([`../${type}-${DETAIL_URL}`], {relativeTo: this.route, queryParams: params})
            .then();
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedCompany && this.selectedCompany.id > 0) {
                        this.deleteCompany();
                    } else if (this.selectedCenter && this.selectedCenter.id > 0) {
                        this.deleteCenter();
                    }
                }
            })
    }

    public deleteCompany() {
        this.shellSrv.setLoading(true);
        this.companySrv.remove(this.selectedCompany.id)
            .subscribe(
                () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                },
                err => {
                    this.snackBarSrv.showFailureMessage();
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            );
    }

    public deleteCenter() {
        this.centerSrv.remove(this.selectedCenter.id)
            .subscribe(
                () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                },
                err => {
                    this.snackBarSrv.showFailureMessage();
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            );
    }

    getNodeIndex(n: DynamicFlatNode): number {
        return this.treeData.indexOf(n);
    }


    getCenters(page: number, parentId: number): Observable<{ body: Center[], itemCount: number }> {
        this.centerSrv.setParentId(parentId);
        return this.centerSrv.getList(page, this.centerPageSize, this.filter)
    }

    onScrollChange(index: number, node) {

        if (node.centers.length < node.maxItemCount &&
            index > 0 &&
            node.centers.length - index <= 4) {

            const page = node.centers.length / this.centerPageSize;
            const parentIndex = this.getNodeIndex(node) - 1;
            const parentId = this.treeData[parentIndex].company.id;
            this.getCenters(page, parentId)
                .subscribe(
                    response => {
                        node.centers = [...node.centers, ...response.body];
                        node.maxItemCount = response.itemCount;
                    },
                    error => {
                        throw error;
                    },
                    () => {
                    }
                )
        }
    }


    select(selected: any, type: SelectedType) {
        if (selected === this.selectedCompany || selected === this.selectedCenter) {
            this.selectedCompany = null;
            this.selectedCenter = null;
        } else {
            this.selectedCompany = type === "company" ? selected : null;
            this.selectedCenter = type === "center" ? selected : null;
            this.shellSrv.showToolbar(); // The toolbar can disappear when scrolling down
        }
        const itemControlsOn = (this.selectedCompany != null && this.selectedCompany.id > 0)
            || (this.selectedCenter != null && this.selectedCenter.id > 0);
        this.shellSrv.setButtonEnabled(this.editButton, itemControlsOn);
        this.shellSrv.setButtonEnabled(this.deleteButton, itemControlsOn);
    }


    releaseResources() {
        this.selectedCompany = null;
        this.selectedCenter = null;
        this.companies = [];
        this.treeData = [];
        this.treeDataSource = null;
        this.treeControl = null;
    }

    addButtonClicked(type: string): void {
        this.showDetail(0, type);
    }

    public ngOnDestroy() {
        this.releaseResources();
        this.shellSrv.reset();
    }


}

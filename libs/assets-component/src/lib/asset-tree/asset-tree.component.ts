import { Component, inject, OnDestroy, OnInit } from "@angular/core";

import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from "@ss/common/ui-shell";
import { ActivatedRoute } from "@angular/router";
import { AssetInventoryService } from "../services/asset-tree.service";
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { Asset, ASSTree, TAsset } from '../assets-api';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { AssetsService } from '../services/assets.service';

import { FormControl } from '@angular/forms';

import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: "ss-asset-tree",
    standalone: true,
    imports: [MaterialModule, MatTreeModule, TranslatePipe, PaginationComponent, TranslateDirective],
    templateUrl: "./asset-tree.component.html",
    styleUrls: ["./asset-tree.component.css"]
})
export class AssetTreeComponent implements OnInit, OnDestroy {
    private confirmationSrv  = inject(ConfirmationDialogService);
    private refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.refreshTree()
    };

    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private treeSrv = inject(AssetInventoryService);
    private assetSrv = inject(AssetsService);
    private snackBarSrv  = inject(SnackBarService);

    searchText = new FormControl<string>("");
    data: ASSTree[] = [];
    listData: Asset[] = [];
    selectedNode: ASSTree | null = null;
    selectedAsset: Asset | null = null;
    nodeLevel = 0;

    pagingModel = PaginationModel.newInstance({ page: 1, pageSize: 10, elementCount: 0 });
    listModel = PaginationModel.newInstance({ page: 1, pageSize: 10, elementCount: 0 });
    treeControl = new NestedTreeControl<ASSTree>(node => node.children);
    dataSource = new MatTreeNestedDataSource<ASSTree>();

    constructor() {
        this.pagingModel.onChange = () => this.refreshTree();
        this.listModel.onChange = () => this.refreshList();
    }

    hasChild = (_: number, node: ASSTree) => !!node.children && node.children.length > 0;

    ngOnInit(): void {
        this.shellSrv.setButtons([this.refreshButton]);
        this.shellSrv.enableSearch("SEARCH_APP", obs => obs.subscribe(str => this.refreshList()));
        this.shellSrv.setGoBackPath("..", this.route);
        this.refreshTree();
    }

    refreshTree() {
        this.treeSrv
            .tree(this.pagingModel.page - 1, this.pagingModel.pageSize, this.shellSrv.getSearchText())
            .subscribe(res => {
                this.data = res.body;
                this.dataSource.data = this.data;
                this.pagingModel.elementCount = res.itemCount;
            });
    }

    selectNode(node: ASSTree) {
        this.selectedNode = node;
    }

    selectAsset(asset: Asset) {
        this.selectedAsset = asset;
    }

    refreshList() {
        this.assetSrv
            .getList(this.listModel.page-1, this.listModel.pageSize, this.searchText.value)
            .subscribe(res => {
                this.listData = res.body;
                this.listModel.elementCount = res.itemCount;
            });
    }

    removeNode() {
        if (this.selectedNode) {
            const asset: TAsset = {
                id: this.selectedNode.ent?.id,
                centerId: this.selectedNode.ent?.centerId,
                parentId: null,
                reference: this.selectedNode.ent?.reference,
                description: this.selectedNode.ent?.description
            };
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(res => res? this.treeSrv.save(asset) : of(0)))
                .subscribe(res => {
                    if (res > 0) {
                        this.selectedNode = null;
                        this.snackBarSrv.showSuccessMessage();
                        this.refreshTree();
                    }
                });
        }
    }

    addNode() {
        if (this.selectedNode && this.selectedAsset) {
            const asset: TAsset = {
                id: this.selectedAsset?.id,
                centerId: this.selectedAsset?.centerId,
                parentId: this.selectedNode?.ent?.id,
                reference: this.selectedAsset?.reference,
                description: this.selectedAsset?.description
            };
            this.treeSrv
                .save(asset)
                .subscribe(res => {
                    if (res > 0) {
                        this.selectedNode = null;
                        this.snackBarSrv.showSuccessMessage();
                        this.refreshTree();
                    }
                });
        }
    }

    ngOnDestroy() {
        this.shellSrv.reset();
    }
}

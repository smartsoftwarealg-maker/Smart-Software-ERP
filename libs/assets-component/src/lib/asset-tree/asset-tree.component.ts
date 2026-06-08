import { Component, computed, inject, OnDestroy, OnInit, signal} from "@angular/core";

import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from "@ss/common/ui-shell";
import { ActivatedRoute } from "@angular/router";
import { AssetInventoryService } from "../services/asset-tree.service";
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { Asset, ASSTree, TAsset } from '../assets-api';
import { MatTreeModule } from '@angular/material/tree';
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
    data = signal<ASSTree[]>([]);
    listData = signal<Asset[]>([]);
    selectedNode = signal<ASSTree | null>(null);
    selectedAsset = signal<Asset|null>(null);
    selectedId = computed(() => this.selectedNode()?.ent?.id || 0);
    loading = signal(true);
    nodeLevel = 0;
    childrenAccessor = (node: ASSTree) => node.children??[];
    hasChild = (_: number, node: ASSTree) => !!node.children && node.children.length > 0;

    pagingModel = PaginationModel.newInstance({ page: 1, pageSize: 10, elementCount: 0 });
    listModel = PaginationModel.newInstance({ page: 1, pageSize: 10, elementCount: 0 });

    constructor() {
        this.pagingModel.onChange = () => this.refreshTree();
        this.listModel.onChange = () => this.refreshList();
    }


    ngOnInit(): void {
        this.shellSrv.setButtons([this.refreshButton]);
        this.shellSrv.enableSearch("SEARCH_APP", obs => obs.subscribe(() => this.refreshList()));
        this.shellSrv.setGoBackPath("..", this.route);
        this.refreshTree();
    }

    refreshTree() {
        this.loading.set(true);
        this.shellSrv.setLoading(true);
        this.treeSrv
            .tree(this.pagingModel.page - 1, this.pagingModel.pageSize, this.shellSrv.getSearchText())
            .subscribe(res => {
                this.data.set(res.body);
                this.pagingModel.elementCount = res.itemCount;
                this.loading.set(false);
                this.shellSrv.setLoading(false);
            });
    }

    selectNode(node: ASSTree) {
        this.selectedNode.set(node);
    }


    refreshList() {
        this.loading.set(true);
        this.assetSrv
            .getList(this.listModel.page-1, this.listModel.pageSize, this.searchText.value||undefined)
            .subscribe({
                next: res => {
                    this.listData.set(res.body);
                    this.listModel.elementCount = res.itemCount;
                    this.loading.set(false);
                },
                error: err => {
                    this.loading.set(false);
                    throw err;
                }
            });
    }

    removeNode() {
        if (this.selectedNode()) {

            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(res => res? this.assetSrv.get(this.selectedNode()?.ent?.id||0) : of(null)),
                      switchMap(res => res? this.assetSrv.update(({...res, parentId: null})) : of(null)))
                .subscribe(res => {
                    if (res) {
                        this.selectedNode.set(null);
                        this.snackBarSrv.showSuccessMessage();
                        this.refreshTree();
                    }
                });
        }
    }

    addNode() {
        if (this.selectedNode() && this.selectedAsset()) {
            const tmp: Asset = this.selectedAsset();
            tmp.parentId = this.selectedNode()?.ent?.id||0;
            const asset: TAsset = {
                id: this.selectedAsset()?.id||0,
                centerId: this.selectedAsset()?.centerId||0,
                parentId: this.selectedNode()?.ent?.id||0,
                reference: this.selectedAsset()?.reference||'',
                description: this.selectedAsset()?.description||''
            };
            this.assetSrv
                .save(tmp)
                .subscribe(res => {
                    if (res > 0) {
                        this.selectedAsset.set(null);
                        this.snackBarSrv.showSuccessMessage();
                        this.refreshTree();
                    }
                });
        }
    }

    selectAsset(a: Asset) {
        this.selectedAsset.set(a);
    }
    ngOnDestroy() {
        this.shellSrv.reset();
    }
}

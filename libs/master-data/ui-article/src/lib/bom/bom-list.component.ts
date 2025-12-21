import { Component, DestroyRef, effect, inject, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { BomService } from '../bom.service';
import { BOM, BOMTree } from '@ss/master-data/api-article';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BomDialogComponent } from '../bom-dialog/bom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ss-bom-children',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe
    ],
    templateUrl: './bom-list.component.html',
    styleUrl: './bom-list.component.css',
})
export class BomListComponent implements OnDestroy, OnInit {
    private duplicateButton: ToolbarButton = {
        icon: 'fa-solid fa-copy',
        label: 'COMMON_DUPLICATE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.duplicate()
    };
    private dialog = inject(MatDialog);
    private langSrv = inject(LanguageService);
    private EMPTY_BOM: BOM = {id: 0, qty: 0, productRef: '',  productDescription: this.langSrv.translate('LOGISTICS_BOM'), productId: 0, units: 1, version: 1};
    private confirmationSrv =  inject(ConfirmationDialogService);
    private entitySrv = inject(BomService);
    private snackBarSrv = inject(SnackBarService);
    private destroyRef = inject(DestroyRef);

    @ViewChild('tree', { static: false }) tree: MatTree<BOMTree>;

    private deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.deleteSelected()
    };
    private addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showAddDialog()
    };
    private editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.showEditDialog()
    };

    private shellSrv = inject(ShellService);
    private bomSrv = inject(BomService);

    protected searchCtrl = new FormControl<string>('');

    selectedBOM: BOMTree | null = null;
    rootBOM: BOMTree| null = null;

    childrenAccessor = (node: BOMTree) => node.children??[];
    hasChild = (_: number, node: BOMTree) => !!node.children && node.children.length > 0;

    // treeControl = new NestedTreeControl<BOMTree>(node => node.children);
    dataSource = new MatTreeNestedDataSource<BOMTree>();
    bomId = input(0);
    readonly idEffect = effect(() => this.refresh(null, this.bomId()));

    ngOnInit() {
        if (this.editButton.visible) {
            this.shellSrv.addButton(this.duplicateButton);
        }
        this.searchCtrl
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(res => this.refresh(res, this.bomId()));
    }

    refresh(filter?: string, id?: number) {
        this.bomSrv
            .tree(filter, id)
            .subscribe(res => {
                // this.dataSource.data = res;
                this.dataSource.data = [{ bom: this.EMPTY_BOM, children: res || []}];
            });
    }


    private getSelectedParent(source: BOMTree[], child: BOMTree): BOMTree {
        if (!child) {
            return null;
        }
        const tmp = [...source.map(s => this.getSelectedParent(s.children, child)), source.find(e => !!e.children.find(e => e.bom.id === child.bom.id))];
        return tmp.length > 0? tmp.filter(e => !!e)[0] : null;
    }

    select(tree: BOMTree) {
        this.selectedBOM = tree;
        this.editButton.disabled = !tree?.bom.id;
        this.addButton.disabled = !tree;
        this.deleteButton.disabled = !tree?.bom.id;
        this.rootBOM = this.getSelectedParent(this.dataSource.data, this.selectedBOM);
    }

    //A function which will remove a given node from BOMTree[] recursively
    // private removeNode(source: BOMTree[], child: BOMTree): BOMTree[] {
    //     return source
    //         .filter(b => b.bom.id !== child.bom.id)
    //         .map(e => {
    //             return {bom: e.bom, children: this.removeNode(e.children, child)} as BOMTree;
    //         });
    // }
    private contains(source: BOMTree[], child: BOMTree): boolean {
        return source.find(b => b.bom.id === child.bom.id || this.contains(b.children, child)) !== undefined;
    }

    protected deleteSelected() {
        if (this.selectedBOM && this.selectedBOM.bom.id > 0) {
            const parent = this.getSelectedParent(this.dataSource.data, this.selectedBOM);
            this.confirmationSrv.confirmDelete()
                .pipe(switchMap(yes => yes ? this.entitySrv.remove(this.selectedBOM.bom.id) : of({ count: 0 })))
                .subscribe(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        parent.children = parent.children.filter(e => e.bom.id !== this.selectedBOM.bom.id);
                        this.tree.collapse(parent);
                        this.tree.expand(parent);
                        if (this.contains(this.dataSource.data, this.selectedBOM)) {
                            this.refresh(null);
                        }
                    }
                });
        }
    }

    //Create track by function to avoid re-rendering the tree
    // trackByFn(index: number, item: BOMTree): number {
    //     return item.bom.id;
    // }

    private showEditDialog() {
        const bom = this.selectedBOM?.bom;
        this.edit(bom);
    }

    protected showAddDialog() {
        const bom = this.selectedBOM?.bom;
        this.edit({ id: 0, productId: null, bomId: bom?.id || 0, qty: 0, price: 0, version: 1, units: 1});
    }

    protected editSelected() {
        if (this.selectedBOM) {
            this.edit(this.selectedBOM.bom);
        }
    }
    protected edit(bom: BOM) {
        const dialogRef = this.dialog.open(BomDialogComponent, {
            width: '600px',
            height: '250px',
            maxWidth: '650px',
            disableClose: true,
            data: bom
        });

        dialogRef.afterClosed()
            .pipe(switchMap(bom => bom? this.entitySrv.save(bom).pipe(map(id => {bom.id = bom.id||id; return bom;})) : of(null)))
            .subscribe((bom: BOM) => {
                if (bom) {
                    this.snackBarSrv.showSuccessMessage();
                    if (bom.id === this.selectedBOM?.bom.id) {
                        this.selectedBOM.bom.qty = bom.qty;
                        this.selectedBOM.bom.price = bom.price;
                        this.selectedBOM.bom.productId = bom.productId;
                    } else {
                        this.selectedBOM.children.push({bom: bom, children: []});
                    }
                    this.select(this.selectedBOM);
                    this.tree.collapse(this.selectedBOM);
                    this.tree.expand(this.selectedBOM);
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }


    public ngOnDestroy() {
        this.shellSrv.reset();
    }

    private duplicate() {
        if (this.selectedBOM) {
            this.confirmationSrv
                .confirm('LOGISTICS_BOM', 'LOGISTICS_CONFIRM_DUPLICATE')
                .pipe(switchMap(yes => yes ? this.entitySrv.duplicate(this.selectedBOM.bom.id) : of({id: 0})))
                .subscribe(res => {
                    if (res.id > 0) {
                        this.snackBarSrv.showSuccessMessage();
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                });
        }
    }
}

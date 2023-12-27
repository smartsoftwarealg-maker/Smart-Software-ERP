import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { BomService } from '../bom.service';
import { BOM, BOMTree } from '@ss/stock/api-article';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BomDialogComponent } from '../bom-dialog/bom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, of, switchMap } from 'rxjs';

@Component({
    selector: 'ss-bom',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MaterialModule, CommonUiDatepickerModule, UiPaginationModule],
    templateUrl: './bom.component.html',
    styleUrl: './bom.component.css',
})
export class BomComponent implements OnInit {
    private dialog = inject(MatDialog);
    private langSrv = inject(LanguageService);
    private EMPTY_BOM: BOM = {id: 0, qty: 0, childRef: '',  childDescription: this.langSrv.translate('LOGISTICS_BOM'), childId: 0};
    private confirmationSrv =  inject(ConfirmationDialogService);
    private entitySrv = inject(BomService);
    private snackBarSrv = inject(SnackBarService);
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
        disabled: false,
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

    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private bomSrv = inject(BomService);

    selectedBOM: BOMTree | null = null;
    rootBOM: BOMTree| null = null;

    treeControl = new NestedTreeControl<BOMTree>(node => node.children);
    dataSource = new MatTreeNestedDataSource<BOMTree>();


    hasChild = (_: number, node: BOMTree) => !!node.children && node.children.length > 0;

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setButtons([this.addButton, this.editButton, this.deleteButton]);
        this.refresh(null);
    }

    getLevel(node: BOMTree): number {
        return this._getLevel(this.dataSource.data, node);
    }

    private _getLevel(tree: BOMTree[], node: BOMTree): number {
        const path = tree.find(branch => {
            return this.treeControl
                .getDescendants(branch)
                .some(n => n.bom.id === node.bom.id);
        });

        return path ? this._getLevel(path.children, node) + 1 : 0;
    }

    refresh(filter?: string) {
        this.bomSrv
            .tree(filter)
            .subscribe(res => {
                // this.dataSource.data = res;
                this.dataSource.data = [{ bom: this.EMPTY_BOM, children: res || []}];
                this.treeControl.dataNodes = this.dataSource.data;
                this.treeControl.expandAll();
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
        this.deleteButton.disabled = !tree?.bom.id;
        this.rootBOM = this.getSelectedParent(this.dataSource.data, this.selectedBOM);
    }

    private deleteSelected() {
        if (this.selectedBOM && this.selectedBOM.bom.id > 0) {
            this.confirmationSrv.confirmDelete()
                .pipe(switchMap(yes => yes ? this.entitySrv.remove(this.selectedBOM.bom.id) : of({ count: 0 })))
                .subscribe(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.refresh();
                    }
                });
        }
    }

    private showEditDialog() {
        const bom = this.selectedBOM?.bom;
        this.edit({ id: bom?.id || 0, childId: bom?.childId, parentId: bom.parentId || null, qty: bom.qty, price: bom?.price});
        // const dialogRef = this.dialog.open(BomDialogComponent, {
        //     width: '600px',
        //     height: '250px',
        //     disableClose: true,
        //     data: { id: bom?.id || 0, childId: bom?.childId, parentId: bom.parentId || null, qty: bom.qty, price: bom?.price}
        // });
        //
        // dialogRef.afterClosed()
        //     .pipe(switchMap(bom => bom? this.entitySrv.save(bom).pipe(map(id => {bom.id = id; return bom;})) : of(null)))
        //     .subscribe((bom: BOM) => {
        //         if (bom) {
        //             this.snackBarSrv.showSuccessMessage();
        //             this.selectedBOM.children.push({bom: bom, children: []});
        //             this.refresh();
        //         } else {
        //             this.snackBarSrv.showFailureMessage();
        //         }
        //     });
    }

    private showAddDialog() {
        const bom = this.selectedBOM?.bom;
        this.edit({ id: 0, childId: 0, parentId: bom.childId || null, qty: 0, price: 0});
    }

    private edit(bom: BOM) {
        const dialogRef = this.dialog.open(BomDialogComponent, {
            width: '600px',
            height: '250px',
            disableClose: true,
            data: bom
        });

        dialogRef.afterClosed()
            .pipe(switchMap(bom => bom? this.entitySrv.save(bom).pipe(map(id => {bom.id = id; return bom;})) : of(null)))
            .subscribe((bom: BOM) => {
                if (bom) {
                    this.snackBarSrv.showSuccessMessage();
                    this.selectedBOM.children.push({bom: bom, children: []});
                    this.refresh();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }

}

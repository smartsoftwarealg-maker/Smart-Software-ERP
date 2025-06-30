import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarService } from '@ss/common/ui-shell';
import { BomService } from '../bom.service';
import { BOM, BOMTree } from '@ss/master-data/api-article';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';

import { LanguageService, MaterialModule } from '@ss/common/api-common';

import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BomDialogComponent } from '../bom-dialog/bom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, of, switchMap } from 'rxjs';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-child-bom',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialModule,
        TranslatePipe,
        TranslateDirective
    ],
    templateUrl: './child-bom.component.html',
    styleUrl: './child-bom.component.css',
})
export class ChildBomComponent implements OnInit {
    private dialog = inject(MatDialog);
    private langSrv = inject(LanguageService);
    private EMPTY_BOM: BOM = {id: 0, qty: 0, productRef: '',  productDescription: this.langSrv.translate('LOGISTICS_BOM'), productId: 0, version: 1};
    private confirmationSrv =  inject(ConfirmationDialogService);
    private entitySrv = inject(BomService);
    private snackBarSrv = inject(SnackBarService);
    @ViewChild('tree', { static: false }) tree: MatTree<BOMTree>;

    private bomSrv = inject(BomService);

    selectedBOM: BOMTree | null = null;

    treeControl = new NestedTreeControl<BOMTree>(node => node.children);
    dataSource = new MatTreeNestedDataSource<BOMTree>();


    hasChild = (_: number, node: BOMTree) => !!node.children && node.children.length > 0;

    ngOnInit(): void {
        this.refresh();
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

    refresh() {
        this.bomSrv
            .treeById()
            .subscribe(res => {
                // this.dataSource.data = res;
                this.dataSource.data = [{ bom: this.EMPTY_BOM, children: res || []}];
                this.treeControl.dataNodes = this.dataSource.data;
                this.treeControl.expandAll();
            });
    }


    select(tree: BOMTree) {
        this.selectedBOM = tree;
    }

    deleteSelected() {
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

    showEditDialog() {
        const bom = this.selectedBOM?.bom;
        this.edit(bom);
    }

    public showAddDialog() {
        const bom = this.selectedBOM?.bom;
        this.edit({ id: 0, productId: 0, bomId: bom?.productId || this.bomSrv.getParentId(), qty: 0, price: 0, version: 1});
    }

    public edit(bom: BOM) {
        const dialogRef = this.dialog.open(BomDialogComponent, {
            width: '600px',
            height: '250px',
            maxWidth: '650px',
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

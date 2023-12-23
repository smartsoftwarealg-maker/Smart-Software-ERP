import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepOnToolbar, ShellService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { BomService } from '../bom.service';
import { BOM, BOMTree } from '@ss/stock/api-article';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-bom',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MaterialModule, CommonUiDatepickerModule, UiPaginationModule],
    templateUrl: './bom.component.html',
    styleUrl: './bom.component.css',
})
export class BomComponent implements OnInit {
    private langSrv = inject(LanguageService);
    private EMPTY_BOM: BOM = {id: 0, qty: 0, childRef: '',  childDescription: this.langSrv.translate('LOGISTICS_BOM'), childId: 0};
    private confirmationSrv =  inject(ConfirmationDialogService);
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
        click: () => this.edit()
    };

    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private bomSrv = inject(BomService);

    selectedBOM: BOMTree;

    treeControl = new NestedTreeControl<BOMTree>(node => node.children);
    dataSource = new MatTreeNestedDataSource<BOMTree>();


    hasChild = (_: number, node: BOMTree) => !!node.children && node.children.length > 0;

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setButtons([this.addButton, this.editButton, this.deleteButton]);
        this.refresh(null);
    }

    refresh(filter?: string) {
        this.bomSrv
            .tree(filter)
            .subscribe(res => {
                // this.dataSource.data = res;
                this.dataSource.data = [{ bom: this.EMPTY_BOM, children: res || []}];
            });
    }

    select(tree: BOMTree) {
        this.selectedBOM = tree;
        this.editButton.disabled = !tree?.bom.id;
        this.deleteButton.disabled = !tree?.bom.id;
    }

    private deleteSelected() {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedBOM && this.selectedBOM.bom.id > 0) {
                        console.log(this.selectedBOM);
                    }
                }
            });
    }

    private showAddDialog() {
        console.log(this.selectedBOM);
    }

    private edit() {
        console.log(this.selectedBOM);
    }
}

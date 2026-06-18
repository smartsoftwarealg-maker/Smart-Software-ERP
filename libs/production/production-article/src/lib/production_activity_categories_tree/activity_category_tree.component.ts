import { Component, DestroyRef, effect, inject, input, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivityCategory, ActivityCategoryTree } from '@ss/master-data/api-article';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../services/categories.service';
import { ActivityCategoryDialogComponent } from '../production_activity_categories_dialog/activity_category_dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ss-category-tree',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
    ],
    templateUrl: './activity_category_tree.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './activity_category_tree.component.scss',
})
export class ActivityCategoryTreeComponent implements OnDestroy, OnInit {
    // private duplicateButton: ToolbarButton = {
    //     icon: 'fa-solid fa-copy',
    //     label: 'COMMON_DUPLICATE',
    //     disabled: true,
    //     visible: true,
    //     keepOnToolbar: KeepOnToolbar.ALWAYS,
    //     click: () => this.duplicate(),
    // };
    private route = inject(ActivatedRoute);
    private dialog = inject(MatDialog);
    private EMPTY_ACTIVITY_CATEGORY: ActivityCategory = {
        id: 0,
        code: '',
        name: '',
    };
    private confirmationSrv = inject(ConfirmationDialogService);
    private entitySrv = inject(CategoriesService);
    private snackBarSrv = inject(SnackBarService);
    private destroyRef = inject(DestroyRef);

    @ViewChild('tree', { static: false }) tree: MatTree<ActivityCategoryTree>;

    private deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.deleteSelected(),
    };
    private addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showAddDialog(),
    };
    private editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.showEditDialog(),
    };

    private shellSrv = inject(ShellService);
    private activityCategorySrv = inject(CategoriesService);

    protected searchCtrl = new FormControl<string>('');

    selectedCategory: ActivityCategoryTree | null = null;
    rootCategory: ActivityCategoryTree | null = null;

    childrenAccessor = (node: ActivityCategoryTree) => node.children ?? [];
    hasChild = (_: number, node: ActivityCategoryTree) =>
        !!node.children && node.children.length > 0;

    dataSource = new MatTreeNestedDataSource<ActivityCategoryTree>();
    categoryId = input(0);
    readonly idEffect = effect(() => this.refresh(null, this.categoryId()));

    ngOnInit() {
        // if (this.editButton.visible) {
        //     this.shellSrv.addButton(this.duplicateButton);
        // }
        this.shellSrv.setGoBackPath('..', this.route);
        this.searchCtrl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((res) => this.refresh(res, this.categoryId()));
    }

    refresh(filter?: string, id?: number) {
        this.activityCategorySrv.tree(filter, id).subscribe((res) => {
            this.dataSource.data = [
                { category: this.EMPTY_ACTIVITY_CATEGORY, children: res || [] },
            ];
        });
    }

    private getSelectedParent(
        source: ActivityCategoryTree[],
        child: ActivityCategoryTree,
    ): ActivityCategoryTree {
        if (!child) {
            return null;
        }
        const tmp = [
            ...source.map((s) => this.getSelectedParent(s.children, child)),
            source.find(
                (e) =>
                    !!e.children.find(
                        (e) => e.category.id === child.category.id,
                    ),
            ),
        ];
        return tmp.length > 0 ? tmp.filter((e) => !!e)[0] : null;
    }

    select(tree: ActivityCategoryTree) {
        this.selectedCategory = tree;
        this.editButton.disabled = !tree?.category.id;
        this.addButton.disabled = !tree;
        this.deleteButton.disabled = !tree?.category.id;
        this.rootCategory = this.getSelectedParent(
            this.dataSource.data,
            this.selectedCategory,
        );
    }

    private contains(
        source: ActivityCategoryTree[],
        child: ActivityCategoryTree,
    ): boolean {
        return (
            source.find(
                (b) =>
                    b.category.id === child.category.id ||
                    this.contains(b.children, child),
            ) !== undefined
        );
    }

    protected deleteSelected() {
        if (this.selectedCategory && this.selectedCategory.category.id > 0) {
            const parent = this.getSelectedParent(
                this.dataSource.data,
                this.selectedCategory,
            );
            this.confirmationSrv
                .confirmDelete()
                .pipe(
                    switchMap((yes) =>
                        yes
                            ? this.entitySrv.remove(
                                  this.selectedCategory.category.id,
                              )
                            : of({ count: 0 }),
                    ),
                )
                .subscribe((res) => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        parent.children = parent.children.filter(
                            (e) =>
                                e.category.id !==
                                this.selectedCategory.category.id,
                        );
                        this.tree.collapse(parent);
                        this.tree.expand(parent);
                        if (
                            this.contains(
                                this.dataSource.data,
                                this.selectedCategory,
                            )
                        ) {
                            this.refresh(null);
                        }
                    }
                });
        }
    }

    private showEditDialog() {
        const category = this.selectedCategory?.category;
        this.edit(category);
    }

    protected showAddDialog() {
        const category = this.selectedCategory?.category;
        console.log(category);
        this.edit({
            id: 0,
            code: '',
            name: '',
            parentId: category?.id,
        });
    }

    protected editSelected() {
        if (this.selectedCategory) {
            this.edit(this.selectedCategory.category);
        }
    }
    protected edit(category: ActivityCategory) {
        const dialogRef = this.dialog.open(ActivityCategoryDialogComponent, {
            width: '600px',
            height: '250px',
            maxWidth: '650px',
            disableClose: true,
            data: category,
        });

        dialogRef
            .afterClosed()
            .pipe(
                switchMap((category) =>
                    category
                        ? this.entitySrv.save(category).pipe(
                              map((id) => {
                                  category.id = category.id || id;
                                  return category;
                              }),
                          )
                        : of(null),
                ),
            )
            .subscribe((category: ActivityCategory) => {
                if (category) {
                    this.snackBarSrv.showSuccessMessage();
                    if (category.id === this.selectedCategory?.category.id) {
                        this.selectedCategory.category.code = category.code;
                        this.selectedCategory.category.name = category.name;
                        this.selectedCategory.category.description =
                            category.description;
                    } else {
                        this.selectedCategory.children.push({
                            category: category,
                            children: [],
                        });
                    }
                    this.select(this.selectedCategory);
                    this.tree.collapse(this.selectedCategory);
                    this.tree.expand(this.selectedCategory);
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }

    public ngOnDestroy() {
        this.shellSrv.reset();
    }
}

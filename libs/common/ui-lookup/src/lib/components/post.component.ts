import { Component, inject } from '@angular/core';
import { Post, PostElementsService, PostService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { GridService } from '@ss/payroll/salary-grid';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MatCard } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Observable } from 'rxjs';


@Component({
    selector: 'ss-post-list',
    template: `<div class="container size">
            <mat-table
                mat-table
                [dataSource]="data"
                class="main-table"
                matSort
                (matSortChange)="sort($event)">
                <ng-container matColumnDef="description">
                    <mat-header-cell *matHeaderCellDef mat-sort-header translate>COMMON_DESCRIPTION</mat-header-cell
                    >
                    <mat-cell *matCellDef="let e">
                        {{ e.description }}
                    </mat-cell>
                </ng-container>

                <ng-container matColumnDef="descriptionAr">
                    <mat-header-cell *matHeaderCellDef mat-sort-header translate
                        >ADMINISTRATION_DESCRIPTION_AR</mat-header-cell
                    >
                    <mat-cell *matCellDef="let e">
                         {{ e.descriptionAr }}
                    </mat-cell>
                </ng-container>

                <ng-container matColumnDef="blocked">
                    <mat-header-cell *matHeaderCellDef translate
                        >ADMINISTRATION_BLOCKED</mat-header-cell
                    >
                    <mat-cell *matCellDef="let e">
                        <mat-checkbox
                            [class.mat-checkbox-disabled]="false"
                            disabled="true"
                            [checked]="e.blocked"
                        >
                        </mat-checkbox>
                    </mat-cell>
                </ng-container>

                <mat-header-row
                    *matHeaderRowDef="displayedColumns; sticky: true"
                ></mat-header-row>
                <mat-row
                    class="selectable"
                    [class.selected]="row.id == selected"
                    (click)="select(row.id)"
                    *matRowDef="let row; columns: displayedColumns"
                ></mat-row>
            </mat-table>
        </div>
        <div class="size b-b-background">
            <ss-pagination [paginationModel]="pagination"></ss-pagination>
        </div>
         `,
    styleUrls: ['../base-templates/list-template.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatCheckbox,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,

    ],
})
export class PostListComponent extends BaseEntityListComponent<Post> {
    displayedColumns = ['description', 'descriptionAr', 'blocked'];

    constructor(
        public postSrv: PostService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            postSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_POSTS',
        );
    }
}


@Component({
    selector: 'ss-post-detail',
    template: `<mat-card>
            <form *ngIf="form !== null" novalidate [formGroup]="form">
                <mat-form-field class="default-100">
                    <mat-label translate>COMMON_DESCRIPTION</mat-label>
                    <input
                        matInput
                        formControlName="description"
                        type="text"
                        required
                        autofocus
                    />
                </mat-form-field>

                <mat-form-field class="default-100">
                    <mat-label translate
                        >ADMINISTRATION_DESCRIPTION_AR</mat-label
                    >
                    <input
                        matInput
                        formControlName="descriptionAr"
                        type="text"
                    />
                </mat-form-field>

                <mat-form-field class="default-50 sm-100">
                    <mat-label translate>PAYROLL_SALARY_GRID</mat-label>
                    <ss-auto-complete
                        matInput
                        [model]="gridLookup"
                        formControlName="grid"
                        required="true"
                    >
                    </ss-auto-complete>
                </mat-form-field>

                <div class="default-50 sm-100">
                    <mat-checkbox formControlName="blocked" translate
                        >ADMINISTRATION_BLOCKED</mat-checkbox
                    >
                </div>
            </form>
        </mat-card>
        @if (id) {
            <router-outlet></router-outlet>
        } `,
    styleUrls: ['../base-templates/detail-template.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        UiAutoCompleteComponent,
        MatCheckbox,
        RouterOutlet,
    ],
})
export class PostDetailComponent extends BaseEntityDetailComponent<Post> {
    private gridService = inject(GridService);
    gridLookup = new DefaultAutoCompleteModel(this.gridService);
    constructor(
        public postSrv: PostService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
        public postElementSrv: PostElementsService
    ) {
        super(
            postSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'COMMON_POSTS',
        );
    }

    public override setupForm(e: Post): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            blocked: [e.blocked || false, Validators.required],
            grid: [e.grid],
        });
    }

    public loadEntity(id: number): Observable<Post> {
       this.postElementSrv.setParentId(id)
        return super.loadEntity(id);
    }
}

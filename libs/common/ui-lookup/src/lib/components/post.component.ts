import { Component } from '@angular/core';
import { Post, PostService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-post-list',
    template: `<div class="container size">
        <mat-table mat-table [dataSource]="data" class="main-table" matSort (matSortChange)="sort($event)">

            <ng-container matColumnDef="description">
                <mat-header-cell *matHeaderCellDef mat-sort-header translate>COMMON_DESCRIPTION</mat-header-cell>
                <mat-cell *matCellDef="let e">
                    {{e.description}}
                </mat-cell>
            </ng-container>

            <ng-container matColumnDef="descriptionAr">
                <mat-header-cell *matHeaderCellDef mat-sort-header translate>ADMINISTRATION_DESCRIPTION_AR</mat-header-cell>
                <mat-cell *matCellDef="let e">
                    {{e.descriptionAr}}
                </mat-cell>
            </ng-container>

            <ng-container matColumnDef="blocked">
                <mat-header-cell *matHeaderCellDef translate>ADMINISTRATION_BLOCKED</mat-header-cell>
                <mat-cell *matCellDef="let e">
                    <mat-checkbox [class.mat-checkbox-disabled]="false"
                                  disabled="true"
                                  [checked]="e.blocked">
                    </mat-checkbox>
                </mat-cell>
            </ng-container>

            <mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></mat-header-row>
            <mat-row class="selectable" [class.selected]="row.id == selected" (click)="select(row.id)"
                     *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
    </div>
    <div class="size b-b-background">
        <ss-pagination [paginationModel]="pagination"></ss-pagination>
    </div>
    `,
    styleUrls: ['../base-templates/list-template.scss']
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
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(postSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_POSTS');
    }

}


@Component({
    selector: 'ss-post-detail',
    template: `<mat-card>
        <form *ngIf="form !== null" novalidate [formGroup]="form">
            <mat-form-field class="default-100">
                <mat-label translate>COMMON_DESCRIPTION</mat-label>
                <input matInput formControlName="description" type="text" required autofocus>
            </mat-form-field>

            <mat-form-field class="default-100">
                <mat-label translate>ADMINISTRATION_DESCRIPTION_AR</mat-label>
                <input matInput formControlName="descriptionAr" type="text">
            </mat-form-field>

            <div class="default-100 sm-100">
                <mat-checkbox formControlName="blocked" translate>ADMINISTRATION_BLOCKED</mat-checkbox>
            </div>
        </form>
    </mat-card>`,
    styleUrls: ['../base-templates/detail-template.scss']
})
export class PostDetailComponent extends BaseEntityDetailComponent<Post> {

    constructor(
        public postSrv: PostService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(postSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_POSTS');
    }

    public override setupForm(e: Post): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            blocked:       [e.blocked || false, Validators.required]
        });
    }
}

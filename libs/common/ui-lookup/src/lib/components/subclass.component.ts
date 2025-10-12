import {Component, computed, inject} from '@angular/core';
import {ClassService, Subclass, SubclassService} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {IsParamService, MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {toSignal} from "@angular/core/rxjs-interop";
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from "@ss/common/ui-auto-complete";
import {AssetClassService} from "@ss/assets-component";


@Component({
    selector: 'ss-subclass-list',
    template: `<div class="container size">
        <mat-table mat-table [dataSource]="data" class="main-table" matSort (matSortChange)="sort($event)">

            <ng-container matColumnDef="description">
                <mat-header-cell *matHeaderCellDef mat-sort-header translate>COMMON_DESCRIPTION</mat-header-cell>
                <mat-cell *matCellDef="let e">
                    {{ e.description }}
                </mat-cell>
            </ng-container>

            <ng-container matColumnDef="classDescription">
                <mat-header-cell *matHeaderCellDef mat-sort-header translate>COMMON_CLASS</mat-header-cell>
                <mat-cell *matCellDef="let e">
                    {{ e.classDescription }}
                </mat-cell>
            </ng-container>

            <ng-container matColumnDef="descriptionAr">
                <mat-header-cell *matHeaderCellDef mat-sort-header translate>{{ descriptionAr() }}</mat-header-cell>
                <mat-cell *matCellDef="let e">
                    {{ e.descriptionAr }}
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
    styleUrls: ['../base-templates/list-template.scss'],
    standalone: true,
    imports: [MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class SubclassListComponent extends BaseEntityListComponent<Subclass> {
    #isSodismac = toSignal(inject(IsParamService).is('SODISMAC'));

    displayedColumns = ['description', 'descriptionAr'];
    descriptionAr = computed(() => this.#isSodismac()? 'ADMINISTRATION_CODE' : 'ADMINISTRATION_DESCRIPTION_AR');

    constructor(
        public subclassSrv: SubclassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(subclassSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_SUBCLASSES');
    }
}


@Component({
    selector: 'ss-subclass-detail',
    template: `<mat-card>
        @if (form) {
            <form [formGroup]="form">
                <mat-form-field class="default-100">
                    <mat-label translate>COMMON_DESCRIPTION</mat-label>
                    <input matInput formControlName="description" type="text" required autofocus>
                </mat-form-field>

                <mat-form-field class="default-100">
                    <mat-label translate>{{ descriptionAr() }}</mat-label>
                    <input matInput formControlName="descriptionAr" type="text">
                </mat-form-field>
<!--                <mat-form-field class="default-50 sm-100">-->
<!--                    <mat-label translate>COMMON_CLASS</mat-label>-->
<!--                    <ss-auto-complete matInput-->
<!--                                      [model]="classLookup"-->
<!--                                      formControlName="classId">-->
<!--                    </ss-auto-complete>-->
<!--                </mat-form-field>-->
            </form>
        }
    </mat-card>
    `,
    styleUrls: ['../base-templates/detail-template.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput]
})
export class SubclassDetailComponent extends BaseEntityDetailComponent<Subclass> {
    #classSrv     = inject(ClassService);
    #isSodismac = toSignal(inject(IsParamService).is('SODISMAC'));

    classLookup       = new DefaultAutoCompleteModel(this.#classSrv);
    descriptionAr = computed(() => this.#isSodismac()? 'ADMINISTRATION_CODE' : 'ADMINISTRATION_DESCRIPTION_AR');

    constructor(
        public subclassSrv: SubclassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(subclassSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_SUBCLASS');
    }

    public override setupForm(e: Subclass): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            classId:       [e.classId]
        });
    }
}


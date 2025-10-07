import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Mark, MarkService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {IsParamService, LanguageService, MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {toSignal} from "@angular/core/rxjs-interop";
import {UiAutoCompleteComponent} from "@ss/common/ui-auto-complete";

@Component({
    selector: 'ss-mark-list',
    template: `
        @if (isGICA() !== undefined) {
            <div class="container size">
                <mat-table mat-table [dataSource]="data" class="main-table" matSort (matSortChange)="sort($event)">

                    <ng-container matColumnDef="description">
                        <mat-header-cell *matHeaderCellDef mat-sort-header translate>COMMON_DESCRIPTION
                        </mat-header-cell>
                        <mat-cell *matCellDef="let e">
                            {{ e.description }}
                        </mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="descriptionAr">
                        @if (isGICA()) {
                            <mat-header-cell *matHeaderCellDef mat-sort-header>{{'ADMINISTRATION_CODE'|translate}}</mat-header-cell>
                        } @else {
                            <mat-header-cell *matHeaderCellDef mat-sort-header translate>COMMON_DESCRIPTION_AR</mat-header-cell>
                        }
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
        }
    `,
    styleUrls: ['../base-templates/list-template.scss'],
    standalone: true,
    imports: [MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, TranslatePipe]
})
export class MarkListComponent extends BaseEntityListComponent<Mark> implements OnInit {
    #langSrv = inject(LanguageService);
    #isParamSrv = inject(IsParamService);

    isGICA = toSignal(this.#isParamSrv.is('SODISMAC'));
    description = computed(() => this.isGICA()? 'ADMINISTRATION_CODE' : 'COMMON_DESCRIPTION_AR');
    isSodismac = signal(false);

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public markSrv: MarkService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(markSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_MARKS');
    }

    ngOnInit() {
        super.ngOnInit();
        this.#isParamSrv
            .is('SODISMAC')
            .subscribe(sodismac => {
                if (sodismac) {
                    this.isSodismac.set(true);
                    this.shellSrv.setTitle(this.#langSrv.translate('STOCK_GICA_CLASSES'));
                }
            });
    }
}

@Component({
    selector: 'ss-mark-detail',
    template: `
        <mat-card>
            @if (form !== null) {
                <form novalidate [formGroup]="form">
                    <mat-form-field class="default-100">
                        <mat-label translate>COMMON_DESCRIPTION</mat-label>
                        <input matInput formControlName="description" type="text" required autofocus>
                    </mat-form-field>
                    <mat-form-field class="default-100">
                        @if (isSodismac()) {
                            <mat-label>{{ 'ADMINISTRATION_CODE'|translate }}</mat-label>
                        } @else {
                            <mat-label>{{ 'COMMON_DESCRIPTION_AR'|translate }}</mat-label>
                        }
                        <input matInput formControlName="descriptionAr" type="text">
                    </mat-form-field>
                </form>
            }
        </mat-card>
    `,
    styleUrls: ['../base-templates/detail-template.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, TranslatePipe]
})
export class MarkDetailComponent extends BaseEntityDetailComponent<Mark> {
    #langSrv = inject(LanguageService);
    #isParamSrv = inject(IsParamService);
    isSodismac = signal(false);

    constructor(
        public markSrv: MarkService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(markSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_MARK');
    }

    public override setupForm(e: Mark): UntypedFormGroup {
        this.#isParamSrv
            .is('SODISMAC')
            .subscribe(sodismac => {
                if (sodismac) {
                    this.isSodismac.set(true);
                    this.shellSrv.setTitle(this.#langSrv.translate('STOCK_GICA_CLASSES'));
                }
            });

        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}


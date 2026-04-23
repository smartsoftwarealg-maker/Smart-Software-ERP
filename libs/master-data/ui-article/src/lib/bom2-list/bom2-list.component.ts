import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BOM } from '@ss/master-data/api-article';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of, switchMap } from 'rxjs';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Bom2Service } from '../bom2.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ss-bom-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
    ],
    templateUrl: './bom2-list.component.html',
    styleUrl: './bom2-list.component.css',
})
export class Bom2ListComponent extends BaseEntityListComponent<BOM> {
    public duplicateButton: ToolbarButton = {
        icon: 'fa-solid fa-layer-plus',
        label: 'COMMON_DUPLICATE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.duplicate(),
    };

    displayedColumns = [
        'productDescription',
        'description',
        'from',
        'to',
        'version',
    ];

    constructor(
        public entitySrv: Bom2Service,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LOGISTICS_BOM',
        );
        this.pagination.pageSize = 10;
    }

    protected postInit(): Observable<unknown> {
        return super.postInit()
            .pipe(tap(() => this.shellSrv.addButton(this.duplicateButton)));
    }

    private duplicate() {
        this.confirmationSrv
            .confirm('PROD_BOM_DUP', 'PROD_BOM_DUP_CONFIRM')
            .pipe(
                switchMap((res) =>
                    res ? this.entitySrv.duplicate(this.selected) : of(null),
                ),
                switchMap((res) => {
                    if (res) {
                        this.refresh();
                        return of({ id: 1 });
                    } else {
                        return of({ id: 0 });
                    }
                }),
            )
            .subscribe((res) => {
                if (res && res.id) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    select(id: number) {
        super.select(id);
        this.duplicateButton.disabled = !id;
    }
}

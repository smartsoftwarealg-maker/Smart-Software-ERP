import { Component, DestroyRef, inject } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LTMAbnormalTest } from '../ltm-api';
import { LtmAbnormalTestService } from '../services/ltm-abnormal-test.service';
import { filter, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ss-ltm-alerts-list',
    templateUrl: './ltm-alerts.component.html',
    styleUrls: ['./ltm-alerts.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmAlertsComponent extends BaseEntityListComponent<LTMAbnormalTest> {
    #destroyRef = inject(DestroyRef);

    private abnormalTestSrv = inject(LtmAbnormalTestService);
    private subscription: Subscription|null = null;

    private badgeBtn: ToolbarButton = {
        icon: 'fa-solid fa-sensor-triangle-exclamation',
        label: 'LTM_ALERTS',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.showAlerts()
    };

    displayedColumns = ['matter', 'test',  'time', 'value', 'min', 'max', 'pickupPoint'];
    formBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        from: [new Date(new Date().getTime() - 24 * 3600 * 1000 * 30 )],
        to:   [new Date()],
    })

    constructor(
        public override entitySrv: LtmAbnormalTestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_ALERTS');
        this.pagination.pageSize = 15;
    }

    override refresh(callback?: () => void) {
        const formValue = this.form.value;
        this.data = [];
        this.shellSrv.setLoading(this.canShowProcessingStatus());
        this.select(0);
        this.entitySrv
            .refresh(formValue.from, formValue.to, this.pagination.page - 1, this.pagination.pageSize, this.shellSrv.getSearchText())
            .subscribe({
                    next: data => {
                        this.shellSrv.setLoading(false); // stop the animation
                        this.data = data.body;
                        this.pagination.elementCount = data.itemCount;
                    },
                    error: err => {
                        this.data = []; // clear everything;
                        this.shellSrv.setLoading(false); // stop the animation
                        throw err;
                    }
                }
            );
    }

    showAlertBadge() {
            const TODAY = new Date(new Date().getTime() - 24 * 3600 * 1000);
            this.subscription = this.abnormalTestSrv
                .refresh(TODAY, new Date(), 0, 49)
                .subscribe(res => {
                    if (res.itemCount > 0) {
                        this.badgeBtn.badgeCount = res.itemCount;
                        this.shellSrv.addButton(this.badgeBtn);
                    }
                });
    }

    private showAlerts() {
        this.shellSrv.removeButton('LTM_ALERTS');
        this.subscription?.unsubscribe();
        this.router.navigate(['/app/ltm/ltm-alerts']).then();
    }
    override ngOnInit() {
        this.addButton.visible = false;
        // this.editButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();

        this.form
            .controls
            .from
            .valueChanges
            .pipe(
                takeUntilDestroyed(this.#destroyRef),
                filter(() => this.form.controls.from.value !== null),
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => this.refresh());

        this.form
            .controls
            .to
            .valueChanges
            .pipe(
                takeUntilDestroyed(this.#destroyRef),
                filter(() => this.form.controls.to.value !== null),
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => this.refresh());
    }

    override showDetail(id: number) {
        this.router.navigate([id], {relativeTo: this.route}).then()
    }
}

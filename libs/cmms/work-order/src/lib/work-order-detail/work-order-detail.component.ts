import { Component, inject } from '@angular/core';
import { CMMSWorkDetail, Work } from '@ss/cmms/cmms-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSWorkOrderService } from '../c-m-m-s-work-order.service';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { RequestImportComponent } from '@ss/cmms/cmms-ui';
import { of, switchMap } from 'rxjs';

@Component({
    selector: 'ss-work-order-detail',
    templateUrl: './work-order-detail.component.html',
    styleUrls: ['./work-order-detail.component.css'],
})
export class WorkOrderDetailComponent extends CMMSWorkDetail {
    private router = inject(Router);
    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    };

    private generateBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-regular fa-wind-turbine',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'CMMS_GENERATE_REQUEST',
        visible: true,
        click: () => this.generateRequest(),
    };

    constructor(
        public override entitySrv: CMMSWorkOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, DOC_WORK_ORDER, 'CMMS_CUR_WORK_ORDER');
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
            const agentId = 0; //this.form.controls['agent'].value;
            const dialogRef = this.dialog.open(RequestImportComponent, {
                width: '800px',
                height: '55%',
                data: { agentId: agentId }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['work']) {
                    const work = result['work'];
                    work.sourceId = work.id;
                    work.id = 0;
                    this.form = super.setupForm(work);
                }
            });
        }
    }

    override setupForm(e: Work): UntypedFormGroup {
        if (!e.id) {
            this.shellSrv.addButton(this.importBtn);
        } else {
            this.shellSrv.addButton(this.generateBtn);
        }
        return super.setupForm(e);
    }

    private generateRequest() {
        this.confirmationSrv
            .confirm('STOCK_PARTS_REQUEST', 'CMMS_GENERATE_REQUEST')
            .pipe(switchMap(res => res && this.id > 0? this.entitySrv.generateRequest(this.id) : of({id: 0})))
            .subscribe(res => {
                if (res?.id > 0) {
                    this.router.navigate(['/app/cmms/parts-requests']).then();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }
}


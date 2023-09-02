import { Component, inject } from '@angular/core';
import { CMMSWorkDetail, Work } from '@ss/cmms/cmms-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSWorkOrderService } from '../c-m-m-s-work-order.service';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { RequestImportComponent } from '@ss/cmms/cmms-ui';
import { Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { CMMSWorkOrderArticleService } from '../c-m-m-s-work-order-article.service';

@Component({
    selector: 'ss-work-order-detail',
    templateUrl: './work-order-detail.component.html',
    styleUrls: ['./work-order-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatTableModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule,
        RouterOutlet
    ]
})
export class WorkOrderDetailComponent extends CMMSWorkDetail {
    private articleSrv = inject(CMMSWorkOrderArticleService);
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

    override loadEntity(id: number): Observable<Work> {
        this.articleSrv.setParentId(id);
        return super.loadEntity(id);
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


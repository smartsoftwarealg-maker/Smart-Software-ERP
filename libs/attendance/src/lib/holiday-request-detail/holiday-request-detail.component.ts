import {Component, inject} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {HolidayRequest} from '@ss/payroll/api-employee';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {HolidayRequestService} from '../holiday-request.service';
import {LoginService} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {HolidayTypeService} from '../holiday-type.service';
import { HOLIDAY_REQUEST, WorkflowDialogComponent } from '@ss/workflow';
import { MatDialog } from '@angular/material/dialog';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-holiday-request-dist',
    templateUrl: './holiday-request-detail.component.html',
    styleUrls: ['./holiday-request-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        UiAutoCompleteComponent,
        MatError,
        DatePickerComponent,
    ],
})
export class HolidayRequestDetailComponent extends BaseEntityDetailComponent<HolidayRequest>{
    protected dialog = inject(MatDialog);
    private loginSrv = inject(LoginService);
    private holidayTypeSrv = inject(HolidayTypeService);
    private sendBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-envelope',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_SEND_MESSAGE',
        visible: true,
        click: () => this.sendMessage(),
    };

    holidayLookup = new DefaultAutoCompleteModel(this.holidayTypeSrv);

    constructor(
        public override entitySrv: HolidayRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ATT_HOLIDAY_REQUEST');
    }


    public override setupForm(b: HolidayRequest) {
        // Make sure to update the template if you edit the configuration here
        this.saveButton.visible = this.loginSrv.appCtx.id == 0;
        if (b.id) {
            this.shellSrv.addButton(this.sendBtn);
        }
        this.isEditable = !!this.loginSrv.appCtx.personId;
        return this.formBuilder.group({
            id:        [b.id],
            centerId:  [b.centerId || this.loginSrv.appCtx.center, Validators.required],
            personId:  [b.personId || this.loginSrv.appCtx.personId, Validators.required],
            from:      [b.from, Validators.required],
            to:        [b.to, Validators.required],
            hType:     [b.hType, Validators.required],
            lastName:  [{ value: b.lastName, disabled: true}],
            firstName: [{ value: b.firstName, disabled: true}]
        });
    }

    override readForm(): HolidayRequest {
        return this.form.getRawValue();
    }

    private sendMessage() {
        if (!this.sendBtn.disabled) {
            const id = this.form.controls['id'].value;
            const dialogRef = this.dialog.open(WorkflowDialogComponent, {
                width: '350px',
                height: '500px',
                data: { transacId: id, senderId: 1, documentId: HOLIDAY_REQUEST }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['message']) {
                    this.snackBarSrv.showSuccessMessage();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
        }
    }
}

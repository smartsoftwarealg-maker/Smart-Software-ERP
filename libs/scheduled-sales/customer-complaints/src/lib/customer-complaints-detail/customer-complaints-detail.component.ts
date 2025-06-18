import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CustomerComplaint } from '../customer-complaint.class';
import { CustomerComplaintsService } from '../customer-complaint.service';
import { ComplaintTypeService } from '../complaint-type.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Lookup } from '@ss/common/api-lookup';
import { Agent, AgentService } from '@ss/logistics/api-agent';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';

@Component({
    selector: 'ss-customer-complaints-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MaterialModule,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslateDirective,
        ImageInputComponent,
    ],
    templateUrl: './customer-complaints-detail.component.html',
    styleUrl: './customer-complaints-detail.component.css',
})
export class CustomerComplaintsDetailComponent extends BaseEntityDetailComponent<CustomerComplaint> {
    private agentSrv = inject(AgentService);
    private loginSrv = inject(LoginService);
    private complaintTypeSrv = inject(ComplaintTypeService);
    private img: number[];
    public imageModel: ImageModel;
    complaintLookup = new DefaultAutoCompleteModel(this.complaintTypeSrv);
    public agentLookup = new DefaultAutoCompleteModel<Agent>(
        this.agentSrv,
        'id',
        'denomination',
    );

    constructor(
        public override entitySrv: CustomerComplaintsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'COMMON_COMPLAINTS',
        );
        this.complaintLookup.onObjectSelected = (e) =>
            this.updateTypeRequirement(e);
        this.imageModel = new ImageModel(null);
    }

    public override setupForm(b: CustomerComplaint) {
        // Make sure to update the template if you edit the configuration here
        const img: Blob = new Blob([new Uint8Array(b.image)], {
            type: 'image',
        });
        this.imageModel.setImageBlob(img, false);
        return this.formBuilder.group({
            id: [b.id],
            centerId: [
                {
                    value: b.centerId || this.loginSrv.appCtx.center,
                    disabled: true,
                },
            ],
            agentId: [b.agentId || this.loginSrv.appCtx.agentId],
            complaintId: [
                { value: b.complaintId, disabled: this.loginSrv.appCtx.id > 0 },
                Validators.required,
            ],
            complaintType: [
                {
                    value: b.complaintType,
                    disabled: this.loginSrv.appCtx.id > 0,
                },
            ],
            complaint: [
                { value: b.complaint, disabled: this.loginSrv.appCtx.id > 0 },
                Validators.required,
            ],
            answer: [
                { value: b.answer, disabled: this.loginSrv.appCtx.id < 1 },
            ],
            image: [{ value: b.image, disabled: this.loginSrv.appCtx.id > 0 }],
            agentDescription: [{ value: b.agentDescription, disabled: true }],
        });
    }
//this.langSrv.translate('COMMON_MAX_FILE_SIZE_1MB')
    override save() {
        if (this.imageModel.getBlob()) {
            if(this.imageModel.getBlob().size > 65000){
                this.snackBarSrv.showMessage('COMMON_MAX_FILE_SIZE_65KB')
                return;
            }
            this.imageModel.getBlob().arrayBuffer().then((buffer) => {
                    this.img = Array.from(new Uint8Array(buffer)) ;
                    super.save();
                });
        }else {
            this.img = null
            super.save()
        }
    }

    override readForm(): CustomerComplaint {
        const value = this.form.getRawValue();
        value.complaintType = +value.complaintType;
        value.image = this.img;
        return value;
    }

    private updateTypeRequirement(e: Lookup) {
        const ctrl = this.form?.controls['complaintType'];
        if (ctrl && e) {
            if (e.id === 1) {
                ctrl.clearValidators();
            } else {
                ctrl.setValidators(Validators.required);
            }
            ctrl.updateValueAndValidity();
        }
    }
}

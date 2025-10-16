import { Component, inject } from '@angular/core';

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
import { ImageUploaderUtil, LoginService, MaterialModule } from '@ss/common/api-common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Lookup } from '@ss/common/api-lookup';
import { Agent, AgentService } from '@ss/logistics/api-agent';
import { ImageModel } from '@ss/common/ui-image-input';

@Component({
    selector: 'ss-customer-complaints-detail',
    standalone: true,
    imports: [
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
    TranslatePipe
],
    templateUrl: './customer-complaints-detail.component.html',
    styleUrl: './customer-complaints-detail.component.scss',
})
export class CustomerComplaintsDetailComponent extends BaseEntityDetailComponent<CustomerComplaint> {
    private agentSrv = inject(AgentService);
    private complaintTypeSrv = inject(ComplaintTypeService);

    protected loginSrv = inject(LoginService);

    public imageModel: ImageModel;
    public fileName = '';
    public uploadUtil: ImageUploaderUtil = new ImageUploaderUtil();

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
        ImageUploaderUtil.toBase64(img, (s: string) => this.uploadUtil.imgSrc = s);

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

    override readForm(): CustomerComplaint {
        const value = this.form.getRawValue();
        value.complaintType = +value.complaintType;
        value.image = null;
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


    delete(){
        this.entitySrv
            .deleteImage(this.form.value.id)
            .subscribe({
                complete: () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.uploadUtil.imgSrc = null;
                }
            });
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
    }

    onFileSelected(event: any) {
        this.shellSrv.setLoading(true);
        this.uploadUtil.onFileSelected(event);
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        const rawValue = this.form.getRawValue();
        formData.append('filename', selectedFile);
        formData.append('id', rawValue.id);
        this.uploadUtil.loadingRate = 0;
        formData.append('file', selectedFile);

      this.entitySrv
          .upload(this.form.value.id, formData)
          .subscribe({
            complete: () => {
                this.shellSrv.setLoading(false);
                this.snackBarSrv.showSuccessMessage();
            },
              error: (e) => {
                  this.shellSrv.setLoading(false);
                  throw e;
              }
        });
    }

}

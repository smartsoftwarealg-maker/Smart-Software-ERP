import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ADImage} from '../ecommerce-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SalesAdsService} from '../sales-ads.service';
import {ImageUploaderUtil} from '@ss/common/api-common';
import {concatMap, from} from 'rxjs';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'ss-sales-ads-detail',
    templateUrl: './sales-ads-detail.component.html',
    styleUrls: ['./sales-ads-detail.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatMiniFabButton,
    ],
})
export class SalesAdsDetailComponent extends BaseEntityDetailComponent<ADImage> {
    uploadUtil: ImageUploaderUtil = new ImageUploaderUtil();

    constructor(
        public adSrv: SalesAdsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(adSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SALES_ADS');
    }

    public override setupForm(e: ADImage): UntypedFormGroup {
        if (e.id) {
            this.adSrv
                .image(e.id)
                .subscribe(res => {
                    if (res['size']) {
                        ImageUploaderUtil.toBase64(res, (s: string) => this.uploadUtil.imgSrc = s);
                    }
                });
        }
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }

    override save() {
        if (this.uploadUtil.selectedFile) {
            this.upload();
        }
        super.save();
    }

    private upload() {
        const formData = new FormData();
        let rawValue = this.form.getRawValue();
        formData.append('description', this.form.value.description);
        formData.append('filename', 'file');
        formData.append('id', rawValue.id);
        formData.append('app_id', rawValue.appId);
        formData.append('document_id', rawValue.documentId);
        formData.append('obj_id', rawValue.objId);
        this.uploadUtil.loadingRate = 0;
        formData.append('file', this.uploadUtil.selectedFile);

        from(this.uploadUtil.fileList)
            .pipe(concatMap(f => {
                formData.delete('file');
                formData.append('file', f);
                return this.adSrv.upsert(this.form.value.id, formData);
            }))
            .subscribe();
    }
}

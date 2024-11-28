import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImageUploaderUtil, LoginService, MaterialModule } from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {AppArchiveService} from '../app-archive.service';
import { concatMap, from, of, switchMap, tap, zip } from 'rxjs';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {AppArchiveDocumentService} from '@ss/common/api-lookup';
import {AppArchive} from '../app-archive-api';
import { CommonModule } from '@angular/common';



import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-agent-archive-detail',
    templateUrl: './app-archive-detail.component.html',
    styleUrls: ['./app-archive-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ]
})
export class AppArchiveDetailComponent implements OnInit {
    private withQueryParams = false;
    private fb = inject(FormBuilder);
    private documentSrv =  inject(AppArchiveDocumentService);
    documentAutoCompleteModel     = new DefaultAutoCompleteModel(this.documentSrv);
    uploadUtil: ImageUploaderUtil = new ImageUploaderUtil();
    form: UntypedFormGroup        = null;

    constructor(private service: AppArchiveService,
                private router: Router,
                private route: ActivatedRoute,
                private snackBarSrv: SnackBarService) {}

    ngOnInit(): void {
        this.route
            .paramMap
            .pipe(switchMap(res => +res.get('id') > 0? this.service.get(+res.get('id')) : of(null as AppArchive)))
            .subscribe(res => {
                this.form = this.fb.group({
                    id:         [res?.id || 0],
                    appId:      [res?.appId || this.service.appId],
                    documentId: [{ value: res?.documentId, disabled: !!res?.id}, Validators.required],
                    objId:      [res?.objId || this.service.id, Validators.required]
                });
            });
    }

    onSave() {
        if (this.uploadUtil.selectedFile) {
            this.upload();
        } else {
            this.save();
        }
    }

    private upload() {
        const formData = new FormData();
        const rawValue = this.form.getRawValue();
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
                return this.service.upsert(this.form.value.id, formData);
            })).subscribe({
                complete: () => {
                    this.snackBarSrv.showSuccessMessage();
                    this.form.reset();
                    this.onCancel();
                }
            });
    }

    private save() {
        this.service
            .save(this.form.getRawValue())
            .subscribe(_ => {
                this.snackBarSrv.showSuccessMessage();
                this.onCancel();
            });
    }

    onCancel() {
        const params = this.withQueryParams ? {
            documentId: this.service.getParentId(),
            appId: this.service.appId,
            editable: this.service.editable
        } : {};
        this.router.navigate(['..'], {relativeTo: this.route, queryParams: params}).then();
    }
}

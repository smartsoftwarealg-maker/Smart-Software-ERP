import {Component, OnInit} from '@angular/core';
import {AppArchive} from '@ss/logistics/api-agent';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageUploaderUtil, LoginService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {AppArchiveService} from '../app-archive.service';
import {of, switchMap, zip} from 'rxjs';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AppArchiveDocumentService} from '@ss/common/api-lookup';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'ss-agent-archive-detail',
    templateUrl: './app-archive-detail.component.html',
    styleUrls: ['./app-archive-detail.component.scss']
})
export class AppArchiveDetailComponent implements OnInit {
    private withQueryParams = false;
    documentAutoCompleteModel     = new DefaultAutoCompleteModel(this.documentSrv);
    uploadUtil: ImageUploaderUtil = new ImageUploaderUtil();
    form: UntypedFormGroup        = null;

    constructor(private service: AppArchiveService,
                private documentSrv: AppArchiveDocumentService,
                private router: Router,
                private route: ActivatedRoute,
                private fb: UntypedFormBuilder,
                private loginSrv: LoginService,
                private shellSrv: ShellService,
                private snackBarSrv: SnackBarService) {}

    ngOnInit(): void {
        zip(this.route.paramMap, this.route.parent.parent.paramMap, this.route.data)
            .pipe(
                tap(res => {
                    const appId = +res[2]['appId'] || this.service.appId;
                    this.service.appId = appId;
                    this.withQueryParams = appId > 0;
                    const parentId = +res[1].get('id') || 0;
                    if (parentId > 0 || !this.service.getParentId() ) {
                        this.service.setParentId(parentId);
                    }
                }),
                switchMap(res => this.service.getParentId()? this.service.get(+res[0].get('id')) : of(null as AppArchive)))
            .subscribe(res => {
                this.form = this.fb.group({
                    id:         [res?.id || 0],
                    appId:      [res?.appId || this.service.appId],
                    documentId: [{ value: res?.documentId, disabled: !!res?.id}, Validators.required],
                    objId:      [res?.objId || this.service.getParentId(), Validators.required]
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
        formData.append('file', this.uploadUtil.selectedFile);
        formData.append('description', this.form.value.description);
        formData.append('filename', 'file');
        formData.append('id', this.form.value.id);
        this.uploadUtil.loadingRate = 0;
        this.service
            .upsert(this.form.value.id, formData)
            .subscribe(res => {
                this.snackBarSrv.showSuccessMessage();
                this.form.reset();
                this.onCancel();
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
            appId: this.service.appId
        } : {};
        this.router.navigate(['..'], {relativeTo: this.route, queryParams: params}).then();
    }

}

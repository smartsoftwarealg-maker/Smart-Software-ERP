import {Component, OnInit} from '@angular/core';
import {AppArchive} from '@ss/logistics/api-agent';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageUploaderUtil, LoginService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {AppArchiveService} from '../app-archive.service';
import {switchMap, zip} from 'rxjs';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AppArchiveDocumentService} from '@ss/common/api-lookup';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'ss-agent-archive-detail',
    templateUrl: './app-archive-detail.component.html',
    styleUrls: ['./app-archive-detail.component.scss']
})
export class AppArchiveDetailComponent implements OnInit {
    public documentAutoCompleteModel    = new DefaultAutoCompleteModel(this.documentSrv);
    uploadUtil: ImageUploaderUtil = new ImageUploaderUtil();
    form: FormGroup = null;

    constructor(private service: AppArchiveService,
                private documentSrv: AppArchiveDocumentService,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private loginSrv: LoginService,
                private shellSrv: ShellService,
                private snackBarSrv: SnackBarService) {
    }

    ngOnInit(): void {
        zip(this.route.paramMap, this.route.parent.parent.paramMap)
            .pipe(
                tap(res => {
                    const id = +res[0].get('id');
                    const parentId = +res[1].get('id');
                    this.service.setParentId(parentId);
                }),
                switchMap(res => this.service.get(+res[0].get('id'))))
            .subscribe(res => {
                this.form = this.fb.group({
                    id:         [res?.id || 0],
                    appId:      [res?.appId || this.service.appId],
                    documentId: [res?.documentId, Validators.required],
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
            .save(this.form.value)
            .subscribe(_ => {
                this.snackBarSrv.showSuccessMessage();
                this.onCancel();
            });
    }

    onCancel() {
        this.router.navigate(['../..'], {relativeTo: this.route}).then();
    }
}

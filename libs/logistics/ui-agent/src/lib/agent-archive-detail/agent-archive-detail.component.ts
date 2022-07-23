import {Component, OnInit} from '@angular/core';
import {AgentArchiveService, Archive} from '@ss/logistics/api-agent';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageUploaderUtil, LoginService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'ss-agent-archive-detail',
    templateUrl: './agent-archive-detail.component.html',
    styleUrls: ['./agent-archive-detail.component.scss']
})
export class AgentArchiveDetailComponent implements OnInit {
    uploadUtil: ImageUploaderUtil = new ImageUploaderUtil();
    form: FormGroup = null;

    constructor(private service: AgentArchiveService,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private loginSrv: LoginService,
                private shellSrv: ShellService,
                private snackBarSrv: SnackBarService) {
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.route
            .parent
            .paramMap
            .subscribe(params =>
                this.form = this.fb.group({
                    id: [+params.get("id")],
                    description: ['', Validators.required]
                }))
    }

    onSave() {
        if (this.uploadUtil.selectedFile) {
            this.post();
        } else {
            if (this.form.value.id) {
                this.put();
            }
        }
    }

    private post() {
        const formData = new FormData();
        formData.append('file', this.uploadUtil.selectedFile);
        formData.append('description', this.form.value.description);
        formData.append('filename', 'file');
        formData.append('id', this.form.value.id);
        this.uploadUtil.loadingRate = 0;
        this.service
            .upsert(formData)
            .subscribe(res => {
                this.snackBarSrv.showSuccessMessage();
                this.onCancel();
            });
    }

    private put() {
        const data: Archive =  {
            description: this.form.value.description,
            id: this.form.value.id,
        }
        this.service
            .update(data)
            .subscribe(_ => {
                this.snackBarSrv.showSuccessMessage();
                this.onCancel();
            });
    }

    onCancel() {}
}

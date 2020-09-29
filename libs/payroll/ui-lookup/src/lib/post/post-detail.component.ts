import { Component } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Post, PostService} from "@ss/payroll/api-lookup";


@Component({
    selector: 'ss-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent extends BaseEntityDetailComponent<Post> {

    constructor(
        public postSrv: PostService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
            super(postSrv, shellSrv, snackBarSrv, route, formBuilder, 'PAYROLL_EDIT_POST');
    }

    public setupForm(e: Post): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}

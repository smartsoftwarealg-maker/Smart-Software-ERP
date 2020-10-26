import { Component } from '@angular/core';
import { Mark, MarkService } from '@ss/common/api-lookup';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'ss-mark-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class MarkDetailComponent extends BaseEntityDetailComponent<Mark> {

    constructor(
        public markSrv: MarkService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
            super(markSrv, shellSrv, snackBarSrv, route, formBuilder, 'STOCK_EDIT_MARK');
    }

    public setupForm(e: Mark): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}

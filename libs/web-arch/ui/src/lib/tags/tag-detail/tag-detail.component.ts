import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Tag} from '../tag';
import {Service, ServiceService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {TagService} from '../tag-list/tag.service';

@Component({
  selector: 'ss-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent extends BaseEntityDetailComponent<Tag> {

    constructor(
        public tagSrv: TagService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(tagSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'WAR_TAGS');
    }

    public override setupForm(e: Tag): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }

}

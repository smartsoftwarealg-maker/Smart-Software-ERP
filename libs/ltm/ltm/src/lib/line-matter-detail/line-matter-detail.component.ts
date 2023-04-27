import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LtmMatterService} from '../ltm-matter.service';
import {LTMLineMatter} from '../ltm-api';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {of} from 'rxjs';
import {SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-line-matter-detail',
    templateUrl: './line-matter-detail.component.html',
    styleUrls: ['./line-matter-detail.component.scss'],
})
export class LineMatterDetailComponent implements OnInit {
    private matterSrv =  inject(LtmMatterService);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);
    form = this.fb.group( {
        id:       [0],
        matterId: [0, Validators.required],
        parentId: [0, Validators.required]
    });

    constructor(private entitySrv: LtmLineMatterService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private snackBarSrv: SnackBarService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService) {}

    ngOnInit(): void {
        this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(params => this.form.controls.parentId.setValue(+(params.get('id')||'0'))),
                switchMap(_ => this.route.paramMap),
                switchMap(params => {
                    const id = +(params.get('id')||'0');
                    return id > 0? this.entitySrv.get(id) : of(<LTMLineMatter> { id: 0, parentId: this.form.controls.parentId.value, matterId: 0});
                }))
            .subscribe(matter => this.form.setValue({ id: matter.id, matterId: matter.matterId, parentId: matter.parentId}));
    }

    save() {
        this.entitySrv
            .save(this.form.getRawValue())
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    this.router.navigate(['../../'], { relativeTo: this.activatedRoute});
                }
            });
    }

    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../../'], { relativeTo: this.activatedRoute});
            }
        });
    }
}

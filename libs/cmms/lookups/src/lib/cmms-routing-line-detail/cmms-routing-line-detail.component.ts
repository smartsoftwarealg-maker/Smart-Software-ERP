import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { of, switchMap, tap } from 'rxjs';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSRoutingDetailService } from '../services/cmms-routing-detail.service';
import { RoutingDetail } from '@ss/cmms/cmms-api';

@Component({
    selector: 'ss-routing-line-detail',
    templateUrl: './cmms-routing-line-detail.component.html',
    styleUrls: ['./cmms-routing-line-detail.component.css'],
})
export class CMMSRoutingLineDetailComponent implements OnInit {
    private EMPTY_RECORD: RoutingDetail = {
        id: 0,
        parentId: 0,
        teamSize: 1,
        order: 10,
        description: ''
    };
    private entitySrv = inject(CMMSRoutingDetailService);
    private shellSrv  = inject(ShellService);
    private route  = inject(ActivatedRoute);
    private router  = inject(Router);
    private snackBarSrv  = inject(SnackBarService);
    private confirmationSrv  = inject(ConfirmationDialogService);
    private fb = inject(FormBuilder);

    id = 0;
    public form: UntypedFormGroup = null;
    isEditable = true;

    ngOnInit() {
        this.route
            .paramMap
            .pipe(
                tap(map => this.id = +map.get('id') || 0),
                switchMap(() => this.route.parent.parent.paramMap),
                switchMap(map => {
                    this.EMPTY_RECORD.parentId = +map.get('id') || 0;
                    this.entitySrv.setParentId(this.EMPTY_RECORD.parentId);
                    return this.id? this.entitySrv.get(this.id) : of(this.EMPTY_RECORD);
                })
            ).subscribe(ent => {
                this.form = this.fb.group({
                    id:          [ent.id],
                    parentId:    [ent.parentId],
                    order:       [ent.order || 10, Validators.required],
                    description: [ent.description, Validators.required],
                    teamSize:    [ent.teamSize || 1],
                    hours:       [ent.hours],
                    cost:        [ent.cost]
                });
            });
    }

    save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val = this.form.getRawValue();

        this.entitySrv.update(val)
            .pipe(tap(i => {
                if (val.id == 0) {
                    val.id = i;
                }
                this.shellSrv.setLoading(true);
            })).subscribe({
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    this.shellSrv.setLoading(false);
                    this.form?.reset(val);
                    throw err;
                },
                next: () => {
                    this.shellSrv.setLoading(false);
                    this.router.navigate(['../'], { relativeTo: this.route }).then();
                    this.form.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../'], {relativeTo: this.route}).then();
            }
        });
    }
}

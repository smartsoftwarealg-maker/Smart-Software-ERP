import {ChangeDetectorRef, Directive, inject, signal} from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UntypedFormGroup } from '@angular/forms';
import { Observable, of, switchMap, tap } from 'rxjs';
import { LoginService, Right } from '@ss/common/api-common';

@Directive()
export abstract class BaseChildEntityDetailComponent<T extends { id: number, parentId: number} > {
    private cdr = inject(ChangeDetectorRef);
    private confirmationSrv  = inject(ConfirmationDialogService);

    protected router  = inject(Router);
    protected loginSrv = inject(LoginService);
    protected shellSrv  = inject(ShellService);
    protected EMPTY_RECORD: T = { id: 0, parentId: 0} as T;
    protected snackBarSrv  = inject(SnackBarService);
    protected route  = inject(ActivatedRoute);

    public id = 0;
    public form: UntypedFormGroup | null = null;
    public isEditable = signal(true);
    rights: Right = {edit: false, write: false, read: false, delete: false};
    loading = signal(true);


    protected constructor(protected entitySrv: BaseEntityService<T>, protected entity: string) {}

    abstract setupForm(e: T): UntypedFormGroup;

    idParamMap(): Observable<ParamMap> {
        return this.route.parent.parent.paramMap;
    }

    protected process(t: T): void { }

    protected load(): Observable<T> {
        return this.route
            .paramMap
            .pipe(
                tap(map => this.id = +map.get('id') || 0),
                switchMap(() => this.idParamMap()),
                switchMap(() =>  this.id? this.entitySrv.get(this.id) : of(this.EMPTY_RECORD)),
                tap(ent => this.process(ent))
            );
    }
    ngOnInit() {
        this.loading.set(true);
        this.load()
            .subscribe(ent => {
                this.form = this.setupForm(ent);
                const isManager = this.loginSrv?.appCtx?.manager || false;
                const rights = this.shellSrv.getEntityRights(this.entity);
                this.rights = rights || {write: isManager, edit: isManager, read: isManager, delete: isManager};
                this.isEditable.set(this.rights.edit);
                this.loading.set(false);
                this.cdr.markForCheck();
            });

        // this.EMPTY_RECORD.parentId = this.entitySrv.getParentId();
        // const obs = this.id
        //     ? this.entitySrv.get(this.id)
        //     : of(this.EMPTY_RECORD);
        //
        // obs.subscribe(ent => this.form = this.setupForm(ent));

        // this.isEditable = this.shellSrv.getCurrentNodeRights()?.edit || false;
    }

    readForm(): T {
        return this.form?.getRawValue();
    }

    save() {
        this.form?.markAllAsTouched();
        if (!this.form?.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val = this.readForm();

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
                    this.router.navigate(['../'], { relativeTo: this.route }).then();
                    this.form?.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                },
                complete: () => this.shellSrv.setLoading(false)
            });
    }

    cancel() {
        const obs = this.form?.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../'], {relativeTo: this.route}).then();
            }
        });
    }
}

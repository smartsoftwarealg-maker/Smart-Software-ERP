import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { Observable, of, Subscription } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Directive()
export abstract class AbstractEntityComponent<T extends { id: number }> implements OnInit, OnDestroy {
    public shellSrv = inject(ShellService);
    public snackBarSrv = inject(SnackBarService);
    public confirmationSrv = inject(ConfirmationDialogService);

    protected queryId: number;
    protected subscriptions: Subscription[] = [];
    public form: UntypedFormGroup|null = null;
    public isEditable = true;

    protected constructor(public entitySrv: BaseEntityService<T>) {}

    public save() {
        this.form.markAllAsTouched();
        if (!this.isValidForm()) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val = this.readForm();
        // val.id = this.queryId || val.id;
        this.shellSrv.setLoading(true);
        const obs = val.id === 0 ?
            this.entitySrv
                .add2(val) // REMOVED `.add` TO SOLVE IDIOTS' PROBLEM
                .pipe(tap(i => {
                    if (!val.id) {
                        this.queryId = i;
                        val.id = i;
                    }
                })) :
            this.entitySrv
                .update(val)
                .pipe(tap(i => {
                    if (!val.id) {
                        this.queryId = i;
                        val.id = i;
                    }
                }),
                switchMap(() => this.uploadAttachments(val.id)));

        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.goBack();
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
            },
            error: err => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                this.form?.reset(val);
                throw err;
            }
        });
    }

    protected isValidForm() {
        return this.form.valid;
    }

    public get id() {
        return this.queryId;
    }

    public set id(value: number) {
        this.queryId = value;
    }

    public uploadAttachments(id?: number): Observable<any> {
        return of(null);
    }

    public readForm(): T {
        return this.form.getRawValue();
    }

    ngOnInit() {
        const rights = this.shellSrv.getCurrentNodeRights();
        this.isEditable = rights.edit || rights.write;
    }

    ngOnDestroy() {
        this.form = null;
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    protected abstract goBack(): void;

    public canDeactivate(): Observable<boolean> {
        if (this.form != null && this.form.touched) {
            return this.confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

    get isLoading() {
        return this.shellSrv.getLoading();
    }

    public loadEntity(id: number): Observable<T> {
        this.id = id || 0;
        if (id == null) {
            this.shellSrv.goBack();
            return of(null);
        }
        if (id === 0) {
            const a: any = {
                id: 0
            };
            return of(a);
        }
        return this.entitySrv.get(id);
    }

    public finishLoading(e: T) {
        this.shellSrv.setLoading(false);
        this.form = this.setupForm(e);
        if (!this.isEditable && this.form) {
            this.form.disable();
        }
    }

    cancel() {
        this.canDeactivate()
            .subscribe(res => res ? this.goBack() : {});
    }

    public abstract setupForm(e: T): UntypedFormGroup;
}

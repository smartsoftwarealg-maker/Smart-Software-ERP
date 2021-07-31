import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToolbarButton, ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, takeLast, tap } from 'rxjs/operators';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Directive()
export abstract class BaseEntityDetailComponent<T extends { id: number }> implements OnInit, OnDestroy {

    private queryId: number;
    public form: FormGroup = null;

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    constructor(
        public entitySrv: BaseEntityService<T>,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public title: string) {
    }

    public get id() {
        return this.queryId;
    }

    public set id(value: number) {
        this.queryId = value;
    }

    public ngOnInit() {
        this.shellSrv.setTitle(this.title); // set title save as list
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setButtons([this.saveButton]);
        this.load();
    }

    public ngOnDestroy() {
        this.shellSrv.reset();
    }

    /**
     * Overload this to load your own things. and tap to save your results
     */
    public preload(): Observable<any> {
        return null;
    }

    public load() {
        this.shellSrv.setLoading(true);
        const a = this.preload();
        const b = this.getRouteParam();
        const c = a == null
            ? b
            : a.pipe(
                switchMap(() => b)
            );
        const sub = c.subscribe(
            entity => {
                if (entity) {
                    this.finishLoading(entity);
                }
            },
            error => {
                this.shellSrv.showRetry(() => this.load());
                throw error;
            }
        );
    }

    protected getRouteParam(): Observable<any> {
        return this.route.params
            .pipe(
                switchMap(p => {
                    this.queryId = +p.id;
                    return this.loadEntity(this.queryId || 0);
                })
            );
    }

    //public assignQueryParams(p: any) {
    //    this.queryId = +p.id;
    //}

    public loadEntity(id: number): Observable<T> {
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
    }

    /** called with the new id to allow to upload attachement to this object */
    public uploadAttachments(id: number): Observable<any> {
        return of(null);
    }

    public save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val: T = this.readForm();
        val.id = this.queryId;
        let obs: Observable<any> = val.id === 0
            ? this.entitySrv.add(val).pipe(tap(i => { this.queryId = i; val.id = i; /* todo: navigate to the correct route using the new id*/ }))
            : this.entitySrv.update(val);
        obs = obs.pipe(switchMap(() => this.uploadAttachments(val.id)));
        this.shellSrv.setLoading(true);
        obs.subscribe(() => {
            this.shellSrv.setLoading(false);
            this.shellSrv.goBack();
            this.form.markAsUntouched();
            this.snackBarSrv.showSuccessMessage();
        }, err => {
            this.snackBarSrv.showFailureMessage();
            this.shellSrv.setLoading(false);
            throw err;
        })
    }

    public readForm(): T {
        return this.form.value;
    }

    public abstract setupForm(e: T): FormGroup;

    // use CanDeactivateService, it will look for this function and call it
    public canDeactivate() {
        if (this.form != null && this.form.touched) {
            return this.confirmationSrv.confirmDontSave();
        }
        return true;
    }

}

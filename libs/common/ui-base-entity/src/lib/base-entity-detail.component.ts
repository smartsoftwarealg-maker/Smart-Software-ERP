import {Directive, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DocRight} from '@ss/common/api-common';

@Directive()
export abstract class BaseEntityDetailComponent<T extends { id: number }> implements OnInit, OnDestroy {
    private queryId: number;
    protected subscriptions: Subscription[] = [];
    public form: UntypedFormGroup = null;
    isEditable = true;

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
        public formBuilder: UntypedFormBuilder,
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
        const rights = this.shellSrv.getCurrentNodeRights();
        this.isEditable = rights.edit;
        this.shellSrv.setTitle(this.title); // set title save as list
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setButtons([this.saveButton]);
        this.load();
    }

    public ngOnDestroy() {
        this.shellSrv.reset();
        this.form = null;
        this.subscriptions.forEach(s => s.unsubscribe());
    }


    /**
     * Overload this to load your own things. and tap to save your results
     */
    public preload(): Observable<any> {
        return of(null);
    }

    public load() {
        this.form = null;
        this.shellSrv.setLoading(true);

        this.preload()
            .pipe(
                switchMap(_ => this.shellSrv.loadUserRights()),
                tap(_ => {
                    const rights = this.shellSrv.getCurrentNodeRights();
                    this.saveButton.visible &&= rights.edit;
                    this.isEditable = rights.edit;
                }),
                switchMap(_ => this.getRouteParam()))
            .subscribe({
                next: entity => {
                    if (entity) {
                        this.finishLoading(entity);
                    } else {
                        throw new Error("BaseEntityDetail: Entity is null");
                    }
                },
                error: error => {
                    this.shellSrv.showRetry(() => this.load());
                    throw error;
                }
            });
    }

    protected getRouteParam(): Observable<any> {
        return this.route.params
            .pipe(
                switchMap(p => {
                    this.queryId = +p['id'];
                    return this.loadEntity(this.queryId || 0);
                })
            );
    }

    //public assignQueryParams(p: any) {
    //    this.queryId = +p['id'];
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
        if (!this.isEditable && this.form) {
            this.form.disable();
        }
    }

    /** called with the new id to allow to upload attachment to this object */
    public uploadAttachments(id: number): Observable<any> {
        return of(null);
    }

    protected goBack() {
        this.shellSrv.goBack();
    }

    public save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val: T = this.readForm();
        val.id = this.queryId;
        let obs: Observable<any> = val.id === 0 && false// TO SOLVE IDIOTS' PROBLEM
            ? this.entitySrv.add(val).pipe(tap(i => { this.queryId = i; val.id = i; /* todo: navigate to the correct route using the new id*/ }))
            : this.entitySrv.update(val)
                .pipe(tap(i => {
                    if (this.queryId == 0) {
                        this.queryId = i;
                        val.id = i;
                    }
                }));
        obs = obs.pipe(switchMap(() => this.uploadAttachments(val.id)));
        this.shellSrv.setLoading(true);
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
        })
    }

    public readForm(): T {
        return this.form.value;
    }

    public abstract setupForm(e: T): UntypedFormGroup;

    // use CanDeactivateService, it will look for this function and call it
    public canDeactivate(): Observable<boolean> {
        if (this.form != null && this.form.touched) {
            return this.confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

    get isLoading() {
        return this.shellSrv.getLoading();
    }
}

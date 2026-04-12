import { Directive, OnDestroy, OnInit, signal } from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { AbstractEntityComponent } from './abstract-entity.component';

@Directive()
export abstract class BaseEntityDetailComponent<T extends { id: number }> extends AbstractEntityComponent<T> implements OnInit, OnDestroy {
    public loaded = signal(false);


    protected constructor(
        public override entitySrv: BaseEntityService<T>,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public title: string) {
        super(entitySrv);
    }

    public override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setTitle(this.title); // set title save as list
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setButtons([this.saveButton]);
        this.load();
    }

    public override ngOnDestroy() {
        super.ngOnDestroy();
        this.shellSrv.reset();
    }

    /**
     * Overload this to load your own things. and tap to save your results
     */
    public preload(): Observable<unknown> {
        return of(null);
    }

    public postLod(): Observable<unknown> {
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
                    this.saveButton.visible &&= rights.edit || rights.write;
                    this.isEditable = rights.edit || rights.write;
                }),
                switchMap(_ => this.getRouteParam()),
                tap(p => this.queryId = +p['id'] || 0),
                switchMap(() => this.loadEntity(this.queryId || 0)))
            .subscribe({
                next: entity => {
                    if (entity) {
                        this.finishLoading(entity);
                    } else {
                        throw new Error('BaseEntityDetail: Entity is null');
                    }
                    this.loaded.set(true);
                },
                error: error => {
                    this.shellSrv.showRetry(() => this.load());
                    throw error;
                }
            });
    }

    protected getRouteParam(): Observable<any> {
        return this.route.params;
        // .pipe(
        //     switchMap(p => {
        //         this.queryId = +p['id'];
        //         return this.loadEntity(this.queryId || 0);
        //     })
        // );
    }

    /** called with the new id to allow to upload attachment to this object */
    public override uploadAttachments(id?: number): Observable<any> {
        return of(null);
    }


    protected override goBack() {
        this.shellSrv.goBack();
    }

    // use CanDeactivateService, it will look for this function and call it
}

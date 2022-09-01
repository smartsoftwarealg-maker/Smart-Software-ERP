import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { Room } from '../hotel-api';
import { Observable, of } from 'rxjs';
import { RoomsService } from './rooms.service';
import { AbstractEntityView } from '../../common/base-classes/abstract-entity-view';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoadingState } from '../../common/util';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';
import { isNumber, isString } from '@ss/common/api-common';

const roomsUrl = '/hotels/rooms';

@Component({
    selector: 'app-rooms-detail',
    templateUrl: './rooms-detail.component.html',
    styleUrls: ['./rooms-detail.component.scss']
})
export class RoomsDetailComponent extends AbstractEntityView<Room, BackendDataSource<Room>> implements OnInit, OnDestroy {

    public form: UntypedFormGroup = null;
    public saved = false;

    constructor(public router: Router,
        public activatedRoute: ActivatedRoute,
        public httpSrv: HttpService,
        public snackBarSrv: SnackBarService,
        public userSrv: UserService,
        private formBuilder: UntypedFormBuilder,
        private confirmationSrv: ConfirmationDialogService,
        public roomsSrv: RoomsService) {
        // entity: null
        super(new BackendDataSource(httpSrv, roomsUrl), userSrv.getRights(null), snackBarSrv);
    }

    ngOnInit() {
        const entity = this.roomsSrv.activeEntity;
        this.roomsSrv.activeEntity = null;
        //
        const observable: Observable<any> = this.roomsSrv.load();
        const routeId = this.getIdFromRoute();
        if (entity == null || (entity.id + '') !== routeId) {
            if (routeId === '0') {
                observable.subscribe(
                    () => this.load({
                        id: 0,
                        bedCount: null,
                        centerId: this.userSrv.context.center,
                        number: null,
                        options: [],
                        roomType: null,
                        state: null
                    }),
                    err => {
                        this.loadingState = LoadingState.ERROR;
                        throw err;
                    }
                );
            } else {
                observable.pipe(
                    switchMap(() => this.dataSrc.getById(this.getIdFromRoute()))
                ).subscribe(
                    e => this.load(e),
                    err => {
                        this.loadingState = LoadingState.ERROR;
                        throw err;
                    }
                );
            }
        } else {
            observable.subscribe(
                () => this.load(entity),
                err => {
                    this.loadingState = LoadingState.ERROR;
                    throw err;
                }
            );
        }
    }

    ngOnDestroy(): void {
    }

    getIdFromRoute(): string {
        return this.activatedRoute.snapshot.params.id;
    }

    load(rec: Room): void {
        this.form = this.formBuilder.group({
            id: [rec.id],
            number: [
                rec.number,
                Validators.compose([Validators.required, Validators.maxLength(8)])
            ],
            roomType: [
                rec.roomType,
                Validators.compose([Validators.required])
            ],
            bedCount: [rec.bedCount, Validators.required],
            state: [rec.state, Validators.required],
            centerId: [rec.centerId],
            options: [rec.options]
        }
        );
        this.loadingState = LoadingState.COMPLETE;
    }

    public canBeDeactivated(): Observable<boolean> | boolean {
        if (this.saved) {
            return true;
        }
        return this.confirmationSrv.confirmDontSave();
    }

    close(confirm: boolean): void {
        this.saved = !confirm;
        this.activatedRoute.queryParams.subscribe(params => {
            const cmd = params.referer;
            if (cmd) {
                this.router.navigate([cmd]);
            } else {
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            }
        });
    }

    saveRoom(): void {
        const record = this.form.value;
        this.save(record, success => {
            if (success) {
                this.close(false);
            }
        });
    }

    optionToString = (i: number) => this.roomsSrv.roomOptions[i];
    filterOptionsFn = x => this.filterOptions(x);
    optionSetter = (i: any) => of(i == null ? null : isNumber(i) ? i : i.id);
    optionGetter = i => i;

    filterOptions(f: number | string): Observable<number[]> {
        if (isString(f)) {
            let r = this.roomsSrv.roomOptionsArray
                .filter(o =>
                    o.description.toLowerCase().indexOf((f as string).toLowerCase()) >= 0
                ).map(o => o.id);
            if (r.length > 5) {
                r = r.slice(0, 5);
            }
            return of(r);
        } else if (isNumber(f)) {
            return of([(f as number)]);
        }
        return of([]);
    }

}

export class CanDeactivateService implements CanDeactivate<RoomsDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: RoomsDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}

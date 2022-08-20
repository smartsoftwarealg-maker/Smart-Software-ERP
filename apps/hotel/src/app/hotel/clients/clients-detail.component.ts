import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../common/snack-bar.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { AbstractEntityView } from '../../common/base-classes/abstract-entity-view';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { ClientsService } from './clients.service';
import { LoadingState } from '../../common/util';
import { switchMap } from 'rxjs/operators';
import { Agent } from '../../smart-lib/common/models';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';

const agentsUrl = '/agents';

@Component({
    selector: 'app-htl-client-detail',
    templateUrl: './clients-detail.component.html',
    styleUrls: ['./clients-detail.component.scss']
})
export class ClientsDetailComponent extends AbstractEntityView<Agent, BackendDataSource<Agent>> implements OnInit, OnDestroy {

    saved = false;
    public form: UntypedFormGroup = null;

    private record: Agent;

    constructor(
        public httpSrv: HttpService,
        public snackBarSrv: SnackBarService,
        private formBuilder: UntypedFormBuilder,
        public userSrv: UserService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private confirmationSrv: ConfirmationDialogService,
        private clientsSrv: ClientsService) {
        // entity: null
        super(new BackendDataSource(httpSrv, agentsUrl), userSrv.getRights(null), snackBarSrv);
    }

    ngOnInit(): void {
        const entity = this.clientsSrv.getActiveEntity();
        //
        const observable: Observable<any> = this.clientsSrv.load();
        const routeId = this.getIdFromRoute();
        if (entity == null || (entity.id + '') !== routeId) {
            if (routeId === '0') {
                observable.subscribe(
                    () => this.load({
                        id: 0,
                        agentType: 0,
                        denomination: null,
                        address: { address: null, city: null, fax: null, mobile: null, phone: null },
                        code: null,
                        license: null,
                        blocked: false
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

    load(rec: Agent): void {
        this.record = rec;
        this.form = this.formBuilder.group({
            code: [
                rec.code,
                Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(6)])
            ],
            denomination: [
                rec.denomination,
                Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(48)])
            ],
            phone: [rec.address.phone, Validators.maxLength(12)],
            mobile: [rec.address.mobile, Validators.maxLength(12)],
            fax: [rec.address.fax, Validators.maxLength(12)],
            address: [rec.address.address, Validators.maxLength(80)],
            blocked: rec.blocked
        });
        this.loadingState = LoadingState.COMPLETE;
    }

    getIdFromRoute(): string {
        return this.activatedRoute.snapshot.params.id;
    }

    saveAgent(): void {
        const formData = this.form.value;
        this.record.code = formData.code;
        this.record.denomination = formData.denomination;
        this.record.address.phone = formData.phone;
        this.record.address.fax = formData.fax;
        this.record.address.mobile = formData.mobile;
        this.record.address.address = formData.address;
        this.record.blocked = formData.blocked;
        // console.log(this.record);
        this.record.code = formData.code;
        this.save(this.record, success => {
            if (success) {
                this.close(false);
            }
        });
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

    public canBeDeactivated(): Observable<boolean> | boolean {
        if (this.saved) {
            return true;
        }
        return this.confirmationSrv.confirmDontSave();
    }

}

export class CanDeactivateService implements CanDeactivate<ClientsDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: ClientsDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}


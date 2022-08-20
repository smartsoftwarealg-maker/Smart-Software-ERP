import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { AbstractEntityView } from '../../common/base-classes/abstract-entity-view';
import { FoyerArticle } from '../hotel-api';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { switchMap } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoadingState } from '../../common/util';
import { AccountsACModel } from './foyer-api';
import { ImageInputComponent } from '../../common/image-input/image-input.component';
import { FoyerArticlesService } from './foyer-articles.service';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';

const foyerArticlesUrl = '/hotels/foyerArticles';
const foyerAppCode = 14;

@Component({
    selector: 'app-foyer-article-dtl',
    templateUrl: './foyer-articles-detail.component.html',
    styleUrls: ['./foyer-articles-detail.component.scss']
})
// tslint:disable-next-line:max-line-length
export class FoyerArticlesDetailComponent extends AbstractEntityView<FoyerArticle, BackendDataSource<FoyerArticle>> implements OnInit, OnDestroy {

    public form: UntypedFormGroup = null;
    public saved = false;
    public accountsACModel: AccountsACModel;
    id: number;

    @ViewChild('imageInput', { static: false }) imageInput: ImageInputComponent;

    constructor(
        public httpSrv: HttpService,
        public snackBarSrv: SnackBarService,
        private formBuilder: UntypedFormBuilder,
        public userSrv: UserService,
        public foyerSrv: FoyerArticlesService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private confirmationSrv: ConfirmationDialogService) {
        super(new BackendDataSource(httpSrv, foyerArticlesUrl), userSrv.getRights(null), snackBarSrv);
        this.accountsACModel = new AccountsACModel(httpSrv);
    }

    ngOnInit(): void {
        const entity = this.foyerSrv.activeEntity;
        this.foyerSrv.activeEntity = null;
        //
        const observable: Observable<any> = this.foyerSrv.load();
        const routeId = this.getIdFromRoute();
        if (entity == null || (entity.id + '') !== routeId) {
            if (routeId === '0') {
                observable.subscribe(
                    () => this.load({
                        id: 0,
                        accountno: null,
                        appCode: null, // this value will be overridden anyway
                        description2: null,
                        price: null,
                        reference: null,
                        vat: null
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

    load(rec: FoyerArticle): void {
        this.id = rec.id;
        this.form = this.formBuilder.group({
            id: [rec.id],
            reference: [
                rec.reference,
                Validators.compose([Validators.required, Validators.maxLength(16)])
            ],
            description2: [
                rec.description2,
                Validators.compose([Validators.required, Validators.maxLength(64)])
            ],
            price: [rec.price, Validators.required],
            vat: [rec.vat, Validators.required],
            accountno: [rec.accountno],
            appCode: [foyerAppCode]
        });
        this.loadingState = LoadingState.COMPLETE;
    }

    saveArticle(): void {
        const record = this.form.value;
        this.save(record, success => {
            if (success) {
                this.imageInput.upload(record.id, error => {
                    if (error) {
                        throw error;
                    }
                    this.id = record.id;
                    this.close(false);
                });
            }
        });
    }

    getIdFromRoute(): string {
        return this.activatedRoute.snapshot.params.id;
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

export class CanDeactivateService implements CanDeactivate<FoyerArticlesDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: FoyerArticlesDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}

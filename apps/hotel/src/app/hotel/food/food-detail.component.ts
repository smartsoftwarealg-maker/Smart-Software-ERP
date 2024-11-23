import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { AbstractEntityView } from '../../common/base-classes/abstract-entity-view';
import { Food } from '../hotel-api';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { SnackBarService } from '../../common/snack-bar.service';
import { FoodService } from './food.service';
import { switchMap } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingState } from '../../common/util';
import { AccountsACModel } from './food-api';
import { ImageInputComponent } from '../../common/image-input/image-input.component';
import { HttpService } from '../../smart-lib/common/http.service';
import { UserService } from '../../smart-lib/components/login/user.service';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { NgIf, NgFor } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { AutoCompleteComponent } from '../../common/auto-complete/auto-complete.component';
import { SaveBarComponent } from '../../common/save-bar/save-bar.component';

const foodUrl = '/hotels/food';
const foodAppCode = 12;

@Component({
    selector: 'app-food-dtl',
    templateUrl: './food-detail.component.html',
    styleUrls: ['./food-detail.component.scss'],
    standalone: true,
    imports: [TranslateDirective, NgIf, LoadingSpinnerComponent, FatalErrorComponent, FormsModule, ReactiveFormsModule, ImageInputComponent, MatFormField, MatLabel, MatInput, MatSelect, NgFor, MatOption, AutoCompleteComponent, SaveBarComponent]
})
export class FoodDetailComponent extends AbstractEntityView<Food, BackendDataSource<Food>> implements OnInit, OnDestroy {

    public form: UntypedFormGroup = null;
    public saved = false;
    public accountsACModel: AccountsACModel;
    id: number;

    @ViewChild('imageInput', { static: false }) imageInput: ImageInputComponent;

    constructor(
        public httpSrv: HttpService,
        public override snackBarSrv: SnackBarService,
        private formBuilder: UntypedFormBuilder,
        public userSrv: UserService,
        public foodSrv: FoodService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private confirmationSrv: ConfirmationDialogService) {
        // entity: null
        super(new BackendDataSource(httpSrv, foodUrl), userSrv.getRights(null), snackBarSrv);
        this.accountsACModel = new AccountsACModel(httpSrv);
    }

    ngOnInit(): void {
        const entity = this.foodSrv.getActiveEntity();
        //
        const observable: Observable<any> = this.foodSrv.load();
        const routeId = this.getIdFromRoute();
        if (entity == null || (entity.id + '') !== routeId) {
            if (routeId === '0') {
                observable.subscribe(
                    () => this.load({
                        id: 0,
                        accountno: null,
                        appCode: null, // this value will be overridden anyway
                        description2: null,
                        foodType: null,
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

    load(rec: Food): void {
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
            foodType: [
                rec.foodType,
                Validators.compose([Validators.required])
            ],
            price: [rec.price, Validators.required],
            vat: [rec.vat, Validators.required],
            accountno: [rec.accountno],
            appCode: [foodAppCode]
        });
        this.loadingState = LoadingState.COMPLETE;
    }

    saveFood(): void {
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
                this.router.navigate([cmd]).then();
            } else {
                this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
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

export class CanDeactivateService implements CanDeactivate<FoodDetailComponent> {

    // tslint:disable-next-line:max-line-length
    canDeactivate(component: FoodDetailComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canBeDeactivated();
    }

}

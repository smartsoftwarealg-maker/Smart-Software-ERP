import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {CCGroup, LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {User, UserService} from "@ss/common/api-users";
import {Delivery, DeliveryService} from "@ss/sales/api-delivery";
import {fillObject, LoginService} from "@ss/common/api-common";
import {DatePipe} from "@angular/common";


@Component({
    selector: 'ss-delivery-detail',
    styleUrls: ['./delivery-detail.component.scss'],
    templateUrl: './delivery-detail.component.html'
})
export class DeliveryDetailComponent extends BaseEntityDetailComponent<Delivery> {
    private delivery: Delivery = null;
    public isManager = false;
    public groups: CCGroup[];
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)

    constructor(
        public deliveryService: DeliveryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserService,
        public lookupsSrv: LookupsService,
        private loginService: LoginService) {
        super(deliveryService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SALES_EDIT_DELIVERY');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(b: Delivery) {
        // Make sure to update the template if you edit the configuration here
        if (!b.id) {
            b.id = 0;
            b.number = 0;
            b.userID = this.loginService.userSrv.userInfo.user.id;
            b.dealer = b.userID;
            b.date = new DatePipe("en").transform(new Date(), "dd/MM/yyyy");
        }
        this.delivery = b;
        this.isManager = this.loginService.userSrv.userInfo.user.manager;
        return this.formBuilder.group({
            id: [b.id],
            document: [0],
            center: [0],
            date: [b.date, Validators.required],
            number: [b.number, Validators.required],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            dealer: [{ value: b.dealer, disabled: !this.isManager }, Validators.required],
        });
    }
    readForm(): Delivery {
        const form =  super.readForm();
        fillObject(this.delivery, form)
        return form;
    }
}

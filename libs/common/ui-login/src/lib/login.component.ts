import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ABS_INDEX_URL, LoginService, LoginType} from '@ss/common/api-common';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';

@Component({
    selector: 'ss-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private readonly USER_DATA = 'USER_DATA';
    public user: { username: string, password: string } = {username: '', password: ''};
    public license: string = null;
    readonly isPhone: boolean;
    form: UntypedFormGroup = null;
    loading = false;
    updating = false;

    constructor(public loginSrv: LoginService,
                private formBuilder: UntypedFormBuilder,
                public router: Router,
                protected deviceSrv: DeviceDetectorService) {
        const os = this.deviceSrv.getDeviceInfo().os.toLocaleLowerCase();
        this.isPhone = this.deviceSrv.isMobile() || this.deviceSrv.isTablet() || os === 'android' || os === 'ios';
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            user: [null, Validators.required],
            pass: [null],
            license: [null]
        });
        const storage = localStorage.getItem(this.USER_DATA);
        if (storage) {
            try {
                this.user = JSON.parse(storage);
            } catch (e) {
                alert(e);
                this.user = {username: '', password: ''};
            }
        }
        if (this.loginSrv.isLoggedIn) {
            this.router.navigate([ABS_INDEX_URL]).then();
        }
    }

    public onSubmit() {
        const tmp = this.form.value;
        this.user.username = tmp.user;
        this.user.password = tmp.pass;
        //
        this.loading = true;
        if (this.loginSrv.customerLogin === LoginType.CUSTOMER) {
            this.loginSrv.agentLogin(this.user, this.isPhone, this.onLoadingFinished);
        } else {
            if (this.loginSrv.customerLogin === LoginType.USER) {
                this.loginSrv.userLogin(this.user, this.isPhone, this.onLoadingFinished);
            } else {
                this.loginSrv.userOrCustomerLogin(this.user, this.isPhone, this.onLoadingFinished);
            }
        }
        localStorage.setItem(this.USER_DATA, JSON.stringify(this.user));
    }

    onLoadingFinished = () => {
        this.loading = false;
    }
}

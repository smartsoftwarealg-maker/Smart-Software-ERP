import { Component, inject, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ABS_INDEX_URL, LoginService, LoginType} from '@ss/common/api-common';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';
import { ThemeService } from '@ss/common/ui-theme';

type User = {
    username: string, password: string
}
@Component({
    selector: 'ss-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private themeSrv = inject(ThemeService);
    private formBuilder = inject(UntypedFormBuilder);
    private router = inject(Router);
    protected deviceSrv = inject(DeviceDetectorService);
    private readonly USER_DATA = 'USER_DATA';

    protected loginSrv = inject(LoginService);
    public user: User = {username: '', password: ''};

    public license: string = null;
    readonly isPhone: boolean;

    currentTheme: string = 'string-1';
    screenCSS = new Map<string, string>([
        ['theme-1', 'screen'],
        ['theme-2', 'screen_2'],
        ['theme-3', 'screen_3'],
        ['theme-4', 'screen_4'],
    ]);

    shape2CSS = new Map<string, string>([
        ['theme-1', 'screen__background__shape2'],
        ['theme-2', 'screen__background__shape2_2'],
        ['theme-3', 'screen__background__shape2_3'],
        ['theme-4', 'screen__background__shape2_4'],
    ]);

    shape3CSS = new Map<string, string>([
        ['theme-1', 'screen__background__shape3'],
        ['theme-2', 'screen__background__shape3_2'],
        ['theme-3', 'screen__background__shape3_3'],
        ['theme-4', 'screen__background__shape3_4'],
    ]);

    shape4CSS = new Map<string, string>([
        ['theme-1', 'screen__background__shape4'],
        ['theme-2', 'screen__background__shape4_2'],
        ['theme-3', 'screen__background__shape4_3'],
        ['theme-4', 'screen__background__shape4_4'],
    ]);

    form = this.formBuilder.group({
        user:    ['', Validators.required],
        pass:    [''],
        license: ['']
    });
    loading = false;
    updating = false;

    constructor() {
        const os = this.deviceSrv.getDeviceInfo().os.toLocaleLowerCase();
        this.isPhone = this.deviceSrv.isMobile() || this.deviceSrv.isTablet() || os === 'android' || os === 'ios';
    }

    ngOnInit(): void {
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
        this.currentTheme = this.themeSrv.getCurrentThemeName();
        console.log(this.currentTheme);
    }

    public onSubmit() {
        const tmp = this.form.value;
        this.user.username = tmp.user;
        this.user.password = tmp.pass;
        //
        this.loading = true;
        if (this.loginSrv.customerLogin === LoginType.CUSTOMER) {
            this.loginSrv.agentLogin('/customers/login', this.user, this.isPhone, this.onLoadingFinished);
        } else {
            if (this.loginSrv.customerLogin === LoginType.USER) {
                this.loginSrv.userLogin(this.user, this.isPhone, this.onLoadingFinished);
            } else {
                this.loginSrv.agentLogin('/persons/login', this.user, this.isPhone, this.onLoadingFinished);
            }
        }
        localStorage.setItem(this.USER_DATA, JSON.stringify(this.user));
    }

    onLoadingFinished = () => {
        this.loading = false;
    };

    onTheme(e: string) {
        this.currentTheme = e;
    }
}

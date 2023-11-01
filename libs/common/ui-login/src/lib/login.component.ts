import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private time = 0;
    private themeSrv = inject(ThemeService);
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    protected deviceSrv = inject(DeviceDetectorService);
    private readonly USER_DATA = 'USER_DATA';

    protected loginSrv = inject(LoginService);
    public user: User = {username: '', password: ''};

    public license: string = null;
    readonly isPhone: boolean;

    currentTheme: string = 'string-1';

    form = this.formBuilder.group({
        user:    ['', Validators.required],
        pass:    [''],
        license: [''],
        keep:    [true]
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
    }

    public onSubmit() {
        const tmp = this.form.value;
        this.user.username = tmp.user;
        this.user.password = tmp.pass;
        const keep = tmp.keep;
        if (!keep) {
            window.onload = () => this.resetTimer();
            document.onmousemove = () => this.resetTimer();
            document.onkeydown = () => this.resetTimer();
        }
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
    private resetTimer() {
        clearTimeout(this.time);
        this.time = window.setTimeout(() => this.loginSrv.logout().then(), 20 * 60 * 1000) as number;
    }
    onLoadingFinished = () => {
        this.loading = false;
    };

    onTheme(e: string) {
        this.currentTheme = e;
    }
}

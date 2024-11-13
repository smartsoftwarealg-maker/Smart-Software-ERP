import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ABS_INDEX_URL, LoginService, LoginType} from '@ss/common/api-common';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';
import { ThemeService } from '@ss/common/ui-theme';
import { ShellService } from '@ss/common/ui-shell';

type User = {
    username: string, password: string
}
@Component({
    selector: 'ss-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private shellSrv = inject(ShellService);
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
    loading = signal(false);
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
                this.user = {username: '', password: ''};
            }
        }
        if (this.loginSrv.isLoggedIn) {
            this.router.navigate([ABS_INDEX_URL]).then();
        }
        this.currentTheme = this.themeSrv.getCurrentThemeName();
        if (this.time) {
            clearTimeout(this.time);
        }
    }

    public onSubmit() {
        this.loading.set(true);
        const tmp = this.form.value;
        this.user.username = tmp.user;
        this.user.password = tmp.pass;
        const keep = tmp.keep;
        if (!keep) {
            document.onmousemove = () => this.resetTimer();
            document.onkeydown = () => this.resetTimer();
        }
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
        if (this.time) {
            clearTimeout(this.time);
        }
        this.time = window.setTimeout(() => this.loginSrv.logout().then(() => {
            document.onmousemove = null;
            document.onkeydown   = null;
        }),  20 * 60 * 1000);
    }
    onLoadingFinished = () => {
        this.loading.set(false);
        this.shellSrv.filterSideNav();
    };

    onTheme(e: string) {
        this.currentTheme = e;
    }
}

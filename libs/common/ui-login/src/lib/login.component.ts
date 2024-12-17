import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ABS_INDEX_URL, LoginService, LoginType} from '@ss/common/api-common';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';
import { ThemeService } from '@ss/common/ui-theme';
import { ShellService } from '@ss/common/ui-shell';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { LanguageSelectComponent } from '@ss/common/ui-lang';
import { LoadingSpinnerComponent } from '../../../ui-loading-spinner/src';

type User = {
    username: string, password: string
}
@Component({
    selector: 'ss-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateDirective,
        LanguageSelectComponent,
        TranslatePipe,
        LoadingSpinnerComponent,
    ],
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
    public user: User = { username: '', password: '' };

    public license: string = null;
    readonly isPhone: boolean;

    form = this.formBuilder.group({
        user: ['', Validators.required],
        pass: [''],
        license: [''],
        keep: [true],
    });
    loading = signal(false);

    constructor() {
        const os = this.deviceSrv.getDeviceInfo().os.toLocaleLowerCase();
        this.isPhone =
            this.deviceSrv.isMobile() ||
            this.deviceSrv.isTablet() ||
            os === 'android' ||
            os === 'ios';
    }

    ngOnInit(): void {
        const storage = localStorage.getItem(this.USER_DATA);
        if (storage) {
            try {
                this.user = JSON.parse(storage);
            } catch (e) {
                this.user = { username: '', password: '' };
            }
        }
        if (this.loginSrv.isLoggedIn) {
            this.loading.set(true);
            this.router.navigate([ABS_INDEX_URL]).then();
        }
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
            this.loginSrv.agentLogin(
                '/customers/login',
                this.user,
                this.isPhone,
                this.onLoadingFinished,
            );
        } else {
            if (this.loginSrv.customerLogin === LoginType.USER) {
                this.loginSrv.userLogin(
                    this.user,
                    this.isPhone,
                    this.onLoadingFinished,
                );
            } else {
                this.loginSrv.agentLogin(
                    '/persons/login',
                    this.user,
                    this.isPhone,
                    this.onLoadingFinished,
                );
            }
        }
        localStorage.setItem(this.USER_DATA, JSON.stringify(this.user));
    }

    private resetTimer() {
        if (this.time) {
            clearTimeout(this.time);
        }
        this.time = window.setTimeout(
            () =>
                this.loginSrv.logout().then(() => {
                    document.onmousemove = null;
                    document.onkeydown = null;
                }),
            20 * 60 * 1000,
        );
    }
    onLoadingFinished = () => {
        this.loading.set(false);
        this.shellSrv.filterSideNav();
    };
}

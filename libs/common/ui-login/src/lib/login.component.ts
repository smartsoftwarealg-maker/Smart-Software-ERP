import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ABS_INDEX_URL,
    CompanySelectorService,
    HttpService,
    LoginService,
    LoginType,
    MaterialModule
} from '@ss/common/api-common';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';
import { ShellService } from '@ss/common/ui-shell';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { LanguageSelectComponent } from '@ss/common/ui-lang';
import { LoadingSpinnerComponent } from '@ss/common/ui-loading-spinner';
import { Preferences } from '@capacitor/preferences';
import { BackendSelectComponent } from '@ss/common/ui-backend-select';
import { MatIconButton } from '@angular/material/button';

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
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective,
        LanguageSelectComponent,
        TranslatePipe,
        LoadingSpinnerComponent,
        BackendSelectComponent,
        MatIconButton,
    ]
})
export class LoginComponent implements OnInit {
    #DEFAULT_COMPANY = 'DEFAULT_COMPANY';
    #httpSrv = inject(HttpService);
    #companySelectorSrv = inject(CompanySelectorService);
    #shellSrv = inject(ShellService);
    #time = 0;
    #formBuilder = inject(FormBuilder);
    #router = inject(Router);
    protected deviceSrv = inject(DeviceDetectorService);
    protected multiCompany = signal(false);

    protected loginSrv = inject(LoginService);
    public user: User = { username: '', password: '' };

    public license: string = null;
    readonly isPhone: boolean;
    readonly cSpace = signal(this.#companySelectorSrv.spaceCompany);
    readonly missingBackend = computed(() => this.#companySelectorSrv.missingBackend() );

    form = this.#formBuilder.group({
        user: ['', [Validators.required, Validators.min(3)]],
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
        if (this.loginSrv.isLoggedIn) {
            this.loading.set(true);
            this.#router.navigate([ABS_INDEX_URL]).then();
        }
        if (this.#time) {
            clearTimeout(this.#time);
        }
        if (this.#companySelectorSrv.multiCompany) {
            this.multiCompany.set(true);
            this.#companySelectorSrv.spaceCompany = localStorage.getItem(this.#DEFAULT_COMPANY);
            if (!this.deviceSrv.isDesktop()) {
                const checkName = async () => {
                    const { value } = await Preferences.get({
                        key: this.#DEFAULT_COMPANY,
                    });
                    this.#companySelectorSrv.spaceCompany = value;
                };
            }
            if (
                this.loginSrv.customerLogin === LoginType.CUSTOMER &&
                this.#companySelectorSrv.spaceCompany
            ) {
                this.#httpSrv.selectCompany(
                    this.#companySelectorSrv.spaceCompany,
                );
            }
        }
        this.cSpace.set(this.#companySelectorSrv.spaceCompany);
    }

    public onSubmit() {
        // this.loading.set(true);
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
    }

    private resetTimer() {
        if (this.#time) {
            clearTimeout(this.#time);
        }
        this.#time = window.setTimeout(
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
        this.#shellSrv.filterSideNav();
    };

    onSelectedCompany(company: string) {
        this.#companySelectorSrv.select(company);
        this.cSpace.set(company);
    }

    clearStorage() {
        localStorage.removeItem(this.#DEFAULT_COMPANY);
        this.#companySelectorSrv.spaceCompany = null;
    }
}

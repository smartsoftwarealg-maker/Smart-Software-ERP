import { LoginService } from './login.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OnInit } from '@angular/core';
export declare class LoginComponent implements OnInit {
    loginSrv: LoginService;
    protected deviceSrv: DeviceDetectorService;
    private readonly USER_DATA;
    user: {
        username: string;
        password: string;
    };
    license: string;
    updating: boolean;
    loading: boolean;
    private readonly isPhone;
    onLoadingFinished: any;
    constructor(loginSrv: LoginService, deviceSrv: DeviceDetectorService);
    onSubmit(): void;
    ngOnInit(): void;
    loadingFinished(): void;
}

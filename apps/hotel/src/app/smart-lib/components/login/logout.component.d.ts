import { LoginService } from './login.service';
export declare class LogoutComponent {
    loginSrv: LoginService;
    constructor(loginSrv: LoginService);
    logout(): void;
    click(): void;
}

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { HttpService } from "../../common/http.service";
export declare class CanActivateService implements CanActivate {
    router: Router;
    protected httpSrv: HttpService;
    private loginSrv;
    private userSrv;
    constructor(router: Router, httpSrv: HttpService, loginSrv: LoginService, userSrv: UserService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    private canRead;
}

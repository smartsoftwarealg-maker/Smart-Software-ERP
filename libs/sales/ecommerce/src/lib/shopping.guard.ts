import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CartService} from './cart.service';

@Injectable({
    providedIn: 'root'
})
export class ShoppingGuard implements CanActivate {
    private router = inject(Router)
    private service = inject(CartService)

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log(this.service.cartCount);
        return this.service.cartCount > 0? true : this.router.navigate(['/main-page']);
    }
}

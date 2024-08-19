import { inject, Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ASSET_DOCUMENT_URL,
    UNIDENTIFIED_INVENTORY_URL,
    UnidentifiedInventory
} from '../assets-api';
import {HttpService} from '@ss/common/api-common';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetUnidentifiedInventoryService extends BaseEntityService<UnidentifiedInventory> {
    private router    = inject(Router);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, UNIDENTIFIED_INVENTORY_URL, ASSET_DOCUMENT_URL);
        this.setParentId(0);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getParentId() > 0 ? true : this.router.createUrlTree(['/app/assets-app/unidentified-inventory']);
    }

}

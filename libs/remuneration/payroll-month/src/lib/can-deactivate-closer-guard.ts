import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MonthCloserComponent} from './closer/month-closer.component';

export class CanDeactivateCloserGuard implements CanDeactivate<MonthCloserComponent> {
    canDeactivate(component: MonthCloserComponent,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }
}

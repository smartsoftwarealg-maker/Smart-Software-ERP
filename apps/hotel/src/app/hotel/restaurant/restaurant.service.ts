import {Injectable} from '@angular/core';
import {HttpService} from 'smart-shared';
import {PaginationModel} from '@ss/common/ui-pagination';
import {Observable, of} from 'rxjs';
import {Agent} from 'smart-shared';
import {map, switchMap, tap} from 'rxjs/operators';
import {Food, FoodType, FullService, PaymentMethod} from '../hotel-api';
import {SafeResourceUrl} from '@angular/platform-browser';
import {Vat} from '../../common/vat/vat-api';

const agentsUrl = '/agents';
const vatsUrl = '/articles/vats';

// todo: change this to 50
const defaultPageSize = 49;
const foodTypesUrl = '/articles/foodTypes';
const foodUrl = '/hotels/food';
const payMethodsUrl = '/paymethods';

@Injectable()
export class RestaurantService {

    clientNamesCache: { [key: number]: string; } = {};
    public pagination = PaginationModel.newInstance();
    public activeEntity: FullService;
    // cache
    public foodTypes: FoodType[];
    public food: Food[];
    public vats: { [id: number]: number; };
    public foodIndex: { [key: number]: Food; } = {};
    public imagesMap: { [key: number]: SafeResourceUrl; } = {};
    public paymentMethods: PaymentMethod[];

    constructor(private httpSrv: HttpService) {
    }

    public getAgentName(id: number): Observable<string> {
        const name = this.clientNamesCache[id];
        if (name) {
            return of(name);
        }
        return this.httpSrv.get<Agent>(agentsUrl + '/' + id)
            .pipe(
                map<Agent, string>(s => s.denomination)
            );
    }

    public load(reload: boolean = false): Observable<any> {
        if (!reload && this.food != null && this.foodTypes != null && this.paymentMethods != null && this.vats != null) {
            return of(null);
        }
        this.foodIndex = {};
        this.imagesMap = {};
        this.vats = {};
        return this.httpSrv.getData<FoodType[]>(foodTypesUrl, 0, defaultPageSize)
            .pipe(
                tap(types => this.foodTypes = types),
                switchMap(() => this.httpSrv.getData<PaymentMethod[]>(payMethodsUrl, 0, defaultPageSize)),
                tap(methods => this.paymentMethods = methods),
                switchMap(() => this.loadFood(0, null)),
                tap(() => this.food.forEach(f => this.foodIndex[f.id] = f)),
                switchMap(() => this.httpSrv.getData<Vat[]>(vatsUrl, 0, 49)),
                tap((vats: Vat[]) => vats.forEach(v => this.vats[v.id] = v.value))
            );
    }

    private loadFood(page: number, totalCount: number): Observable<any> {
        if (page === 0) {
            return this.httpSrv.getData<Food[]>(foodUrl, 0, defaultPageSize)
                .pipe(
                    tap(food => this.food = food),
                    switchMap(() => this.loadFood(1, this.httpSrv.itemCount))
                );
        }
        if (this.food.length < totalCount) {
            return this.httpSrv.getData<Food[]>(foodUrl, page, defaultPageSize)
                .pipe(
                    tap(food => this.food.push(...food)),
                    switchMap(() => this.loadFood(page + 1, this.httpSrv.itemCount))
                );
        }
        return of(null);
    }
}

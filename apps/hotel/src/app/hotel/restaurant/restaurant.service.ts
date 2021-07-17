import { Injectable } from '@angular/core';
import { PaginationModel } from '../../common/pagination/pagination.component';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Food, FoodType, FullService, PaymentMethod } from '../hotel-api';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Vat } from '../../common/vat/vat-api';
import { Agent } from '../../smart-lib/common/models';
import { HttpService } from '../../smart-lib/common/http.service';

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
        return this.httpSrv.getData<FoodType>(foodTypesUrl, 0, defaultPageSize)
            .pipe(
                tap((types: { itemCount: number, body: FoodType[] }) => this.foodTypes = types.body),
                switchMap(() => this.httpSrv.getData<PaymentMethod>(payMethodsUrl, 0, defaultPageSize)),
                tap((methods: { itemCount: number, body: PaymentMethod[] }) => this.paymentMethods = methods.body),
                switchMap(() => this.loadFood(0, null)),
                tap(() => this.food.forEach(f => this.foodIndex[f.id] = f)),
                switchMap(() => this.httpSrv.getData<Vat>(vatsUrl, 0, 49)),
                tap((vats: {body: Vat[]}) => vats.body.forEach(v => this.vats[v.id] = v.value))
            );
    }

    private loadFood(page: number, totalCount: number): Observable<any> {
        if (page === 0) {
            return this.httpSrv.getData<Food>(foodUrl, 0, defaultPageSize)
                .pipe(
                    tap((food: { itemCount: number, body: Food[] }) => this.food = food.body),
                    switchMap((res: { itemCount: number, body: Food[] }) => this.loadFood(1, res.itemCount))
                );
        }
        if (this.food.length < totalCount) {
            return this.httpSrv.getData<Food>(foodUrl, page, defaultPageSize)
                .pipe(
                    tap((food: { itemCount: number, body: Food[] }) => this.food.push(...food.body)),
                    switchMap((res: { itemCount: number, body: Food[] }) => this.loadFood(page + 1, res.itemCount))
                );
        }
        return of(null);
    }
}

import {Injectable} from '@angular/core';
import {HttpService} from 'smart-shared';
import {Vat} from '../../common/vat/vat-api';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Food, FoodType} from '../hotel-api';
import {PaginationModel} from '@ss/common/ui-pagination';

const vatsUrl = '/articles/vats';
const foodTypesUrl = '/articles/foodTypes';

@Injectable()
export class FoodService {

    vatsMap: { [key: number]: string; } = {};
    vats: Vat[] = [];
    foodTypesMap: { [key: number]: string; } = {};
    foodTypes: FoodType[] = [];

    public activeEntity: Food;
    public pagination = PaginationModel.newInstance();
    private nextLoadTime = 0;

    constructor(private httpSrv: HttpService) {
    }

    public load(): Observable<any> {
        if (Date.now() > this.nextLoadTime) {
            return this.httpSrv.getData<Vat[]>(vatsUrl, 0, 49)
                .pipe(
                    tap(vats => {
                        this.vats = vats;
                        this.vatsMap = {};
                        vats.forEach(v => this.vatsMap[v.id] = v.value + '%');
                    }),
                    switchMap(() => this.httpSrv.getData<FoodType[]>(foodTypesUrl, 0, 49)),
                    tap(types => {
                        this.foodTypes = types;
                        this.foodTypesMap = {};
                        types.forEach(t => this.foodTypesMap[t.id] = t.description);
                        this.nextLoadTime = Date.now() + 60000;
                    }),
                );
        }
        return of(null);
    }

    getActiveEntity(): Food {
        const e = this.activeEntity;
        this.activeEntity = null;
        return e;
    }
}

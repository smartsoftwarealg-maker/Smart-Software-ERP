import { Component, OnInit } from '@angular/core';
import { HotelOptions } from './options';
import { switchMap, tap, map } from 'rxjs/operators';
import { SnackBarService } from '../../common/snack-bar.service';
import { Vat } from '../../common/vat/vat-api';
import { Observable } from 'rxjs';
import { HttpService } from '../../smart-lib/common/http.service';

@Component({
    selector: 'app-hotel-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

    readonly vatsUrl = '/articles/vats';
    readonly hotelOptionsUrl = '/hotels/options';

    NO_VAT = { id: -1, value: 0.0 };
    vats = [this.NO_VAT];
    record: HotelOptions = {
        roomRef: '',
        roomVat: this.NO_VAT.id,
        roomTax: 0.0,
        gymRef: '',
        gymVat: this.NO_VAT.id,
        gymCost: 0.0,

        roomArticleId: 0,
        roomTaxArticleId: 0,
        gymArticleId: 0
    };

    public isLoading = true;

    constructor(protected snackBarSrv: SnackBarService, protected httpSrv: HttpService) {
    }

    ngOnInit() {
        this.refresh();
    }

    submit() {
        this.snackBarSrv.showResult(this.updateHotelOptions(this.httpSrv, this.record));
    }

    refresh() {
        this.isLoading = true;
        this.httpSrv.getData<Vat>(this.vatsUrl, 0, 50)
            .pipe(
                map((r: any) => r.body),
                tap<Vat[]>(r => {
                    this.vats = r;
                    this.vats.unshift(this.NO_VAT);
                }),
                switchMap(() => this.getHotelOptions(this.httpSrv))
            )
            .subscribe(o => {
                this.record = o;
                this.isLoading = false;
            });
    }

    updateHotelOptions(httpSrv: HttpService, o: HotelOptions): Observable<any> {
        return httpSrv.put(this.hotelOptionsUrl, o);
    }

    getHotelOptions(httpSrv: HttpService): Observable<HotelOptions> {
        // too dangerous to cache
        return httpSrv.get<HotelOptions>(this.hotelOptionsUrl);
    }
}

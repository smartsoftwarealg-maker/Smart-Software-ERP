import {Injectable} from "@angular/core";
import {HttpService, LanguageService} from "@ss/common/api-common";
import {MiniLine, Option} from "./option.class";
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';

export const OPTION_URL = '/logistics/options';

@Injectable({
    providedIn: 'root'
})

export class OptionService extends BaseEntityExtendedService<Option> {
    private datePipe: DatePipe = new DatePipe(this.langSrv.defaultLanguage);
    constructor(protected override httpSrv: HttpService, private langSrv: LanguageService) {
        super(httpSrv, OPTION_URL);
    }

    recalculatePrice(since: Date): Observable<MiniLine> {
        const date = this.datePipe.transform(since, 'dd-MM-yyyy');
        return this.httpSrv.put(`/reception/recalculate?date=${date}`);
    }
}


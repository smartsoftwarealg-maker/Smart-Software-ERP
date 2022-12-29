import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CheckBook, CHECK_BOOK_URL } from './check-books-api';


@Injectable({
    providedIn: 'root'
})
export class CheckBookService extends BaseEntityExtendedService<CheckBook> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CHECK_BOOK_URL);
    }
}

import { Injectable, signal } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';
import {
    PRODUCTION_RECYCLING_LINES_URL,
    PRODUCTION_RECYCLING_URL,
} from './production-recycling-api';

@Injectable({
    providedIn: 'root',
})
export class ProductionRecyclingLinesService extends TransactionLinesClass {
    executionCount = signal(0);

    constructor(protected override httpSrv: HttpService) {
        super(
            httpSrv,
            PRODUCTION_RECYCLING_LINES_URL,
            PRODUCTION_RECYCLING_URL,
        );
    }

    executed() {
        this.executionCount.update((c) => c + 1);
    }
}

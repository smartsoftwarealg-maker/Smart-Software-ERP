import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { ProductionConsumption } from '../api/mrp-api';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ProductionConsumptionService } from '../services/production-consumption.service';
import { MatSort, Sort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { of, switchMap } from 'rxjs';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-production-consumption',
    imports: [
        CommonModule,
        MaterialModule,
        MatSort,
        PaginationComponent,
        TranslateDirective
    ],
    templateUrl: './production-consumption.component.html',
    styleUrl: './production-consumption.component.scss',
    standalone: true
})
export class ProductionConsumptionComponent implements OnInit {
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);
    #consumptionSrv = inject(ProductionConsumptionService);

    public pagination = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0 });
    public data: ProductionConsumption[] = [];

    displayedColumns: string[] = [
        'reference',
        'description',
        'qty',
        'price',
        'value'
    ];

    constructor() {
        this.pagination.onChange = () => this.refresh();
    }


    ngOnInit(): void {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('STOCK_CONSUMPTION');
        this.refresh();
    }

    sort(event: Sort) {
        this.#consumptionSrv.sortColumn = event;
        this.refresh();
    }

    private refresh() {
        this.data = [];
        this.#route
            .queryParams
            .pipe(
                switchMap(param => {
                    const prodDetail = +param['prodDetail'];
                    const params = new HttpParams().set('lineId', prodDetail||0);
                    return this.#consumptionSrv.getPage(this.pagination, null, this.#consumptionSrv.sortColumn, params);
                })
            ).subscribe({
            next: (data) => {
                this.data = data;
                this.#shellSrv.setLoading(false);
            },
            error: err => {
                this.#shellSrv.setLoading(false);
                throw err;
            }
        });
    }

    protected readonly Math = Math;
}

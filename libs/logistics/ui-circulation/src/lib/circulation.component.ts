import {Component, inject, OnInit, signal,} from '@angular/core';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {Circulation, CirculationService} from '@ss/logistics/api-circulation';
import {LoginService, MaterialModule, PaginationModel} from '@ss/common/api-common';
import {LanguageService} from '@ss/common/api-common';
import {Observable, switchMap, tap} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {OptionService} from '@ss/logistics/ui-options';

@Component({
    selector: 'ss-circulation',
    styleUrls: ['./circulation.component.scss'],
    templateUrl: './circulation.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        PaginationComponent
    ]

})
export class CirculationComponent implements OnInit {
    #loginSrv = inject(LoginService);
    #optionSrv = inject(OptionService);
    #circulationSrv = inject(CirculationService);
    #route = inject(ActivatedRoute);

    public readonly pagination = PaginationModel.newInstance();

    data: Circulation[];
    articleReference: string;
    articleId: number;
    storeName = signal('STOCK_STORE');


    displayedColumns = [
        'document',
        'number',
        'date',
        'qty',
        'price',
        'pPrice',
        'customer',
        'storeName',
        'store'
    ];


    ngOnInit() {
        this.#optionSrv
            .get(this.#loginSrv.appCtx.center)
            .pipe(tap(res => {
                this.displayedColumns = this.displayedColumns.filter(c => res.usesLots || c !== 'storeName');
                this.storeName.set(res.usesLots? 'STOCK_LOT' : 'STOCK_STORE');
            }),
            switchMap(() => this.#route.queryParams))
            .subscribe(x => {
                // if no reference found go for id
                this.articleReference = x['articleReference'];
                this.articleId = +x['articleId'];
                this.loadCirculation();
            });

        this.pagination.onChange = () => this.loadCirculation();
    }

    loadCirculation() {
        const loader: Observable<Circulation[]> = this.articleReference ?
            this.loadByReference(this.articleReference) : this.loadById(this.articleId || 0);
        this.load(loader);
    }

    loadById(id: number): Observable<Circulation[]> {
        this.#circulationSrv.setParentId(id);
        return this.#circulationSrv.getPage(this.pagination, null, null, null);
    }

    loadByReference(reference: string) {
        return this.#circulationSrv.loadByReference(this.pagination, null, null, reference);
    }

    load(observable: Observable<Circulation[]>) {
        observable.subscribe((x: Circulation[]) => this.data = x);
    }
}

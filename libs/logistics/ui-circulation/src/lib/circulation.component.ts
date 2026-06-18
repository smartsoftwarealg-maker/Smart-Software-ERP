import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.Eager,
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

    loading = signal(true);
    data: Circulation[] = [];
    articleReference: string;
    articleId: number;
    storeName = signal('STOCK_STORE');


    displayedColumns = signal<string[]>([
        'document',
        'number',
        'date',
        'qtyIn',
        'qtyOut',
        'price',
        'pPrice',
        'customer',
        'storeName',
        'store'
    ]);


    ngOnInit() {
        this.data = [];
        this.#optionSrv
            .get(this.#loginSrv.appCtx.center)
            .pipe(
                tap(res => {
                    this.displayedColumns.update(v => v.filter(c => res.usesLots || c !== 'storeName'));
                    this.storeName.set(res.usesLots? 'STOCK_LOT' : 'STOCK_STORE');
                }),
                switchMap(() => this.#route.queryParams),
                tap(x => {
                    // if no reference found go for id
                    this.articleReference = x['articleReference'];
                    this.articleId = +x['articleId'];
                }),
                switchMap(() => this.articleReference? this.loadByReference(this.articleReference): this.loadById(this.articleId || 0))
            ).subscribe((x: Circulation[]) => {
                this.data = x;
                this.loading.set(false);
            });

        this.pagination.onChange = () => this.loadCirculation();
    }

    loadCirculation() {
        this.loading.set(true);
        const loader: Observable<Circulation[]> = this.articleReference ?
            this.loadByReference(this.articleReference) :
            this.loadById(this.articleId || 0);
        loader.subscribe((x: Circulation[]) => {
            this.data = x;
            this.loading.set(false);
        })
    }

    loadById(id: number): Observable<Circulation[]> {
        this.#circulationSrv.setParentId(id);
        return this.#circulationSrv.getPage(this.pagination, null, null, null);
    }

    loadByReference(reference: string) {
        return this.#circulationSrv.loadByReference(this.pagination, null, null, reference);
    }

}

import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Location, LocationService } from '@ss/master-data/api-article';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { LoginService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MarkService, StoreService } from '@ss/common/api-lookup';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Sort } from '@angular/material/sort';
import { OptionService } from '@ss/logistics/ui-options';

@Component({
    selector: 'ss-article-search',
    imports: [CommonModule, MaterialModule, TranslateDirective, PaginationComponent, TranslatePipe, UiAutoCompleteComponent],
    templateUrl: './article-search-dlg.component.html',
    styleUrl: './article-search-dlg.component.scss',
})
export class ArticleSearchDlg implements OnInit {
    #markSrv = inject(MarkService);
    #storeSrv = inject(StoreService);
    #locationSrv = inject(LocationService);
    #destroyRef = inject(DestroyRef);
    #dialogRef = inject(MatDialogRef<ArticleSearchDlg>);
    #fb = inject(FormBuilder);
    #loginSrv = inject(LoginService);
    #optionSrv =  inject(OptionService);


    location: Location|null = null;
    storeLookup = new DefaultAutoCompleteModel(this.#storeSrv);
    markLookup = new DefaultAutoCompleteModel(this.#markSrv);

    form = this.#fb.group({
        reference: [''],
        store:     [0],
        mark:      [0],
        stock:     [1],
    });
    displayedColumns = ['reference', 'description', 'storeName', 'lotNumber', 'expirationDate', 'stock', 'markDescription'];
    pagination = PaginationModel.newInstance({page: 0, pageSize: 5, elementCount: 0});
    data =  signal<Location[]>([]);


    ngOnInit() {
        this.pagination.onChange = () => this.refresh();
        this.#optionSrv
            .get(this.#loginSrv.appCtx.center)
            .subscribe(res => this.displayedColumns = this.displayedColumns.filter(e => res.usesLots || (e !== 'lotNumber' && e !== 'expirationDate') ));
        this.form
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => this.refresh());
    }

    cancel() {
        this.#dialogRef.close();
    }

    select() {
        this.#dialogRef.close(this.location);
    }

    selectItem(location: Location) {
        this.location = location;
    }

    private refresh() {
        const value = this.form.getRawValue();
        this.#locationSrv
            .getLots(value.reference, this.pagination, '', value.store, value.stock, value.mark)
            .subscribe(res => {
                this.data.set(res.body);
                this.pagination.elementCount = res.itemCount;
            });
    }

    sort(e: Sort) {
        this.#locationSrv.sortColumn = e;
        this.refresh();
    }
}

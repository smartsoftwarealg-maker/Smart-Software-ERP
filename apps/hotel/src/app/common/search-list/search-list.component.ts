import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchListModel } from './search-list-model';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnDestroy, OnInit {

    intMenuWidth = 304;
    strMenuWidth = this.intMenuWidth + 'px';

    @Input()
    set menuWidth(n: number) {
        this.intMenuWidth = 304;
        this.strMenuWidth = this.intMenuWidth + 'px';
    }

    subscription: Subscription;
    filterControl = new FormControl();

    list: any[] = [];

    model: SearchListModel<any>;

    @Input()
    set listModel(model: SearchListModel<any>) {
        if (model) {
            model.paginationModel.onChange = () => this.refresh();
        }
        if (this.model) {
            this.model.paginationModel.onChange = null;
        }
        this.model = model;
    }

    constructor() {
        this.subscription = this.filterControl
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(v => this.filterChanged(v));
    }

    private filterChanged(filter: string): void {
        this.refresh(filter);
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public refresh(filter?: string) {
        if (this.model) {
            this.model.refresh(filter ? filter : this.filterControl.value)
                .subscribe(e => this.list = e);
        }
    }

}

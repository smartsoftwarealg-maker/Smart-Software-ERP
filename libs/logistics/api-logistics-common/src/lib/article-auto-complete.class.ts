import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article, ArticleService} from '@ss/stock/api-article';
import {EventEmitter} from '@angular/core';
import {Store, LotsService} from "@ss/common/api-lookup";


export class ArticleAutoCompleteModel extends DefaultAutoCompleteModel<Article> {
    readonly evenEmitter = new EventEmitter<string>();

    constructor(public articleSrv: ArticleService) {
        super(articleSrv, 'reference', 'description2');
    }

    onValueChanged = (art: string) => {
        this.evenEmitter.emit(art);
    }
}

export class LotAutoCompleteModel extends DefaultAutoCompleteModel<Store> {
    readonly evenEmitter = new EventEmitter<number>();

    constructor(public storeNameSrv: LotsService) {
        super(storeNameSrv);
    }

    onValueChanged = (id: number) => {
        this.evenEmitter.emit(id);
    }
}


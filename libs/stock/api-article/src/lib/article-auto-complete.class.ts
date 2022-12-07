import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article, ArticleService} from '@ss/stock/api-article';
import {EventEmitter} from '@angular/core';
import {Store, LotsService} from '@ss/common/api-lookup';


export class ArticleAutoCompleteModel extends DefaultAutoCompleteModel<Article> {
    readonly evenEmitter = new EventEmitter<number | string>();

    constructor(public articleSrv: ArticleService) {
        super(articleSrv, 'reference', 'description2');
    }

    onValueChanged = (art: string | number) => {
        this.evenEmitter.emit(art);
    }

    toString = (x: any) => x ? `${x[this.idField]} ${x[this.descriptionField]}`.substring(0, 50) : null;
}

export class LotAutoCompleteModel extends DefaultAutoCompleteModel<Store> {
    readonly evenEmitter = new EventEmitter<number | string>();

    constructor(public storeNameSrv: LotsService) {
        super(storeNameSrv);
    }

    onValueChanged = (id: number | string) => {
        this.evenEmitter.emit(id);
    }
}


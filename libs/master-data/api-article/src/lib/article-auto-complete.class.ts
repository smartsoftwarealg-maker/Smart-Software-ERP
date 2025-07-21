import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article} from '../index';
import {EventEmitter} from '@angular/core';
import {Lot, LotsService} from '@ss/common/api-lookup';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';


export class ArticleAutoCompleteModel extends DefaultAutoCompleteModel<Article> {
    readonly evenEmitter = new EventEmitter<number | string>();

    constructor(public articleSrv: BaseEntityExtendedService<Article>) {
        super(articleSrv, 'reference', 'description2');
    }

    override onValueChanged = (art: string | number) => {
        this.evenEmitter.emit(art);
    };

    override toString = (x: Article) => x ? `${x.reference} ${x.description2}`.substring(0, 50) : null;
}

export class LotAutoCompleteModel extends DefaultAutoCompleteModel<Lot> {
    readonly evenEmitter = new EventEmitter<number | string>();

    constructor(public storeNameSrv: LotsService) {
        super(storeNameSrv);
    }

    override onValueChanged = (id: number | string) => {
        this.evenEmitter.emit(id);
    };

    override toString = (x: Lot) => x?
        (!x.storeDescription || x.description === x.storeDescription? x.description : `${x.storeDescription}, ${x.description}`) :
        '';
}

export class ArticleIdAutoCompleteModel extends DefaultAutoCompleteModel<Article> {
    readonly evenEmitter = new EventEmitter<number | string>();

    constructor(public articleSrv: BaseEntityExtendedService<Article>) {
        super(articleSrv, 'id', 'description2');
    }

    override onValueChanged = (art: string | number) => {
        this.evenEmitter.emit(art);
    };

    override toString = (x: Article) => x ? `${x.reference} ${x.description2}`.substring(0, 50) : null;
}

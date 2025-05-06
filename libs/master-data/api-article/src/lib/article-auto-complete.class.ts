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

    override toString = (x: any) => x ? `${x[this.idField]} ${x[this.descriptionField]}`.substring(0, 50) : null;
}

export class LotAutoCompleteModel extends DefaultAutoCompleteModel<Lot> {
    readonly evenEmitter = new EventEmitter<number | string>();

    constructor(public storeNameSrv: LotsService) {
        super(storeNameSrv);
    }

    override onValueChanged = (id: number | string) => {
        this.evenEmitter.emit(id);
    };
}


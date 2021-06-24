import { Pipe, PipeTransform } from '@angular/core';

import { LanguageService } from '../../../api-common/src/lib/language.service';

@Pipe({
    name: 'translate',
    pure: true
})
export class TranslatePipe implements PipeTransform {

    constructor(protected langSrv: LanguageService) { }

    public transform(key: string, args?: any): string | null {
        if (key == null || key === "") return null;
        return this.langSrv.translate(key, args);
    }

}

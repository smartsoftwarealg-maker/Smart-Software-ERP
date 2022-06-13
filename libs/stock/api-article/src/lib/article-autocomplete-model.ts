import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article} from './article-api';
import {ArticleService} from './article.service';

export class ArticleAutocompleteModel extends DefaultAutoCompleteModel<Article> {
    constructor(public articleSrv: ArticleService) {
        super(articleSrv, 'reference', 'description2');
        this.filterLoadedData = (x: Article[]) => x.map(e => {
            e.description2 = e.description2.substring(0, 50);
            return e;
        });
    }

    toString = (x: any) => x ? `${x[this.idField]} ${x[this.descriptionField]}` : null;


}

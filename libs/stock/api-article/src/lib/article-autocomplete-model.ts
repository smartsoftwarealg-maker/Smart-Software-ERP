import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article, ArticleService} from '@ss/stock/api-article';

export class ArticleAutocompleteModel extends DefaultAutoCompleteModel<Article> {
  constructor(public articleSrv: ArticleService) {
      super(articleSrv, 'reference', 'description2');
  }

    toString = x => x ?  `${x[this.idField]} ${x[this.descriptionField]}` : null;
}

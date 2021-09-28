import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article} from './article-api';
import {ArticleService} from './article.service';

export class ArticleAutocompleteModel extends DefaultAutoCompleteModel<Article> {
  constructor(public articleSrv: ArticleService) {
      super(articleSrv, 'reference', 'description2');
  }

    toString = x => x ?  `${x[this.idField]} ${x[this.descriptionField]}` : null;
}

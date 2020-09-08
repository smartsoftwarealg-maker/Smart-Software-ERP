import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockUiArticleModule } from '@ss/stock/ui-article';
import { routes } from './routes';

@NgModule({
    imports: [
        StockUiArticleModule,
        RouterModule.forChild(routes)
    ]
})
export class StockModule {}

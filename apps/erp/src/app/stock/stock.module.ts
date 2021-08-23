import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockUiArticleModule } from '@ss/stock/ui-article';
import {mainRoutes} from './routes';

@NgModule({
    imports: [
        StockUiArticleModule,
        RouterModule.forChild(mainRoutes)
    ],
})
export class StockModule {}

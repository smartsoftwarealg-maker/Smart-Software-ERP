import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockUiArticleModule } from '@ss/stock/ui-article';
import {mainRoutes} from './routes';
import {FileOpener} from "@ionic-native/file-opener";
import {DeviceDetectorService} from "ngx-device-detector";

@NgModule({
    imports: [
        StockUiArticleModule,
        RouterModule.forChild(mainRoutes)
    ],
})
export class StockModule {}

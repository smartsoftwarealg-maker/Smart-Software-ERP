import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import { TreasuryUiChecksModule } from '@ss/treasury/ui-checks';

@NgModule({
    imports: [
        TreasuryUiChecksModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class TreasuryModule {}

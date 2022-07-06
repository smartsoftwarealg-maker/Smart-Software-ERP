import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import { TreasuryUiChecksModule } from '@ss/treasury/ui-checks';
import { TreasuryUiCheckBooksModule } from '@ss/treasury/ui-check-books';

@NgModule({
    imports: [
        TreasuryUiChecksModule,
        TreasuryUiCheckBooksModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class TreasuryModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './routes';
import { TreasuryUiChecksModule } from '@ss/treasury/ui-checks';
import { TreasuryUiCheckBooksModule } from '@ss/treasury/ui-check-books';
import { TreasuryUiJournalModule } from '@ss/treasury/ui-journal';

@NgModule({
    imports: [
        TreasuryUiChecksModule,
        TreasuryUiCheckBooksModule,
        TreasuryUiJournalModule,
        RouterModule.forChild(mainRoutes)
    ]
})
export class TreasuryModule {}

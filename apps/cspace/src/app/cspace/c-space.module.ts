import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { cSpaceRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(cSpaceRoutes)
    ]
})
export class CSpaceModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { viewerRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(viewerRoutes)
    ]
})
export class ArchiveViewerModule {
}

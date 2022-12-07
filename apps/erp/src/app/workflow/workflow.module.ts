import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { workflowRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(workflowRoutes)
    ]
})
export class WorkflowModule { }

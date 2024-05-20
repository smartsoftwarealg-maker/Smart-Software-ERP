import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { socialRoutes } from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(socialRoutes)
    ]
})
export class SocialModule { }

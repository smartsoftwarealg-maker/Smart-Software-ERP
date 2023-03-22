import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {attendanceRoutes} from './routes';

@NgModule({
    imports: [
        RouterModule.forChild(attendanceRoutes)
    ]
})
export class AttendanceModule { }

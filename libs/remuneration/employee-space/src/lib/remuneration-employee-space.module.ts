import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalPaySlipComponent } from './personal-pay-slip/personal-pay-slip.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatProgressBarModule, MatSelectModule, MaterialModule, ReactiveFormsModule, PersonalPaySlipComponent],
})
export class RemunerationEmployeeSpaceModule {}

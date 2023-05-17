import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { Auth2FAConfirmationComponent } from './code-confirmation/auth2-f-a-confirmation.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
    declarations: [PasswordUpdateComponent, Auth2FAConfirmationComponent],
    imports: [CommonModule,
        CommonUiLangModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule]
})
export class Auth2FAModule {}

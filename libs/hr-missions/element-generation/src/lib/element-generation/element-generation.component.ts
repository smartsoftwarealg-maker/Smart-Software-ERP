import {Component, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { ElementGenerationService } from '../element-generation.service';
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {TranslateDirective} from "@ss/common/ui-lang";
import {Element} from "../element-generation.api";
import {ActivatedRoute} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {LoginService} from "@ss/common/api-common";

@Component({
    selector: 'ss-element-generation',
    imports: [
        CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatTable,
        MatHeaderCellDef,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatCheckbox,
        TranslateDirective,
        MatButton,
    ],
    templateUrl: './element-generation.component.html',
    styleUrl: './element-generation.component.scss',
    standalone: true,
})
export class ElementGenerationComponent implements OnInit {
    elementGenerationSrv = inject(ElementGenerationService);
    private route = inject(ActivatedRoute);
    shellSrv = inject(ShellService);
    snackBarSrv = inject(SnackBarService);
    data: Element[] = null;
    loaded = signal(false);

    displayedColumns = [
        'checkBox',
        'number',
        'lastName',
        'firstName',
        'route',
        'period',
    ];

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('MISSION_ELEMENTS_GENERATOR')
        this.refresh();
    }

    refresh(){
        this.loaded.set(false)
        this.elementGenerationSrv.getReports().subscribe({
            next: (res) => {
                this.data = res;
                this.loaded.set(true);
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            },
        });
    }

    selected: number[] = [];

    selectId(isExist: boolean, id: number) {
        if (isExist) {
            this.selected.push(id);
        } else {
            this.selected = this.selected.filter((n) => n !== id);
        }
    }

    save(){
        this.elementGenerationSrv.generate(this.selected).subscribe({
            next:()=>{
                this.snackBarSrv.showSuccessMessage()
            },
            error:(err)=>{
                this.snackBarSrv.showFailureMessage()
                throw err
            }
        })
    }

}

import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {SnackBarService} from '@ss/common/ui-shell';
import {Attrib, AttribTempl, PARENT_AGENT, PARENT_ARTICLE, PARENT_ASSET, PARENT_TRANSAC} from '../attributes';
import {AttributesService} from '../attributes.service';
import {ChildAttributesService} from '../child-attributes.service';
import {AttributeLookupService} from '../attribute-lookup.service';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { DatePipe } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-child-attributes',
    templateUrl: './child-attributes.component.html',
    styleUrls: ['./child-attributes.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFormField, MatLabel, MatSelect, FormsModule, ReactiveFormsModule, MatOption, MatInput, UiAutoCompleteComponent, DatePickerComponent, TranslatePipe]
})
export class ChildAttributesComponent implements OnInit, OnDestroy {
    private attribSrv  = inject(AttributesService);
    private attribLookupSrv  = inject(AttributeLookupService);
    private childAttribSrv  = inject(ChildAttributesService);
    private confirmationSrv  = inject(ConfirmationDialogService);
    private snackBarSrv  = inject(SnackBarService);

    // private langSrv = inject(LanguageService);
    private datePipe = new DatePipe('en');
    private _parentId: 1 | 2 | 3 | 4 = 2;
    private subscriptions: Subscription[] = [];

    @Input() editable = true;
    attributeCtrl = new UntypedFormControl();
    childAttributes: Attrib[] = [];
    selectedAttributeCtrl = new UntypedFormControl();
    attributeColumns = ['attribName', 'value'];
    selectedAttribute: Attrib = null;
    attributeType = 0;
    $childAttributes: AttribTempl[] = [];
    attributeLookup = new DefaultAutoCompleteModel(this.attribLookupSrv);


    @Input()
    set parentId(pId: 1 | 2 | 3 | 4) {
        this._parentId = pId;
    }

    @Input()
    set childAttribute(child: string) {
        this.childAttribSrv.setParentURL(child);
    }

    @Input()
    set attributeId(id: number) {
        this.childAttribSrv.setParentId(id || 0);
        this.refresh();
    }

    private refresh() {
        this.childAttribSrv
            .getList(0, 50)
            .subscribe(res => {
                this.childAttributes = res.body;
                this.childAttributes
                    .forEach(e => e.value = e.stringVal ||
                        e.numericVal?.toLocaleString() ||
                        e.valueName ||
                        (e.dateVal? this.datePipe.transform(e.dateVal, 'dd/MM/YYYY') : ''));
            });
    }
    ngOnInit(): void {
        const subs = this.attributeCtrl
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(v => this.onAttribute(v));
        this.subscriptions.push(subs);
        this.attribSrv
            .getChildAttributes(this._parentId)
            .subscribe(res => this.$childAttributes = res);
    }

    private onAttribute(a: AttribTempl) {
        if (this.selectedAttribute && !this.selectedAttribute.id) {
            this.attributeType = a.attType;
            this.attribLookupSrv.setParentId(a.id);
            this.selectedAttributeCtrl.setValue(null);
        }
    }

    addAttribute() {
        this.selectedAttributeCtrl.setValue('');
        this.selectedAttribute = {id: 0, attribCode: 1};
    }

    deleteAttribute() {
        const id = this.selectedAttribute?.id;
        if (id) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(res => res? this.childAttribSrv.remove(id) : of(res)))
                .subscribe(res => {
                    if (typeof res === 'object') {
                        if (res.count > 0) {
                            this.snackBarSrv.showSuccessMessage();
                            this.childAttributes = this.childAttributes.filter(e => e.id !== id);
                        }
                    }
                });
        }
    }

    selectAttribute(attrib: Attrib) {
        this.selectedAttribute = attrib;
        this.selectedAttributeCtrl.setValue(null);
        const selectedAttrib = this.$childAttributes.find(e => e.id === attrib.attribCode);
        this.attributeType = selectedAttrib?.attType;
        this.attribLookupSrv.setParentId(attrib.attribCode || 0);
    }

    saveAttribute() {
        switch (this.attributeType) {
        case this.attribSrv.TEXT:
            this.selectedAttribute.stringVal  = this.selectedAttributeCtrl.value;
            this.selectedAttribute.numericVal = null;
            this.selectedAttribute.lookupVal  = null;
            this.selectedAttribute.dateVal    = null;
            break;

        case this.attribSrv.DECIMAL:
            this.selectedAttribute.numericVal = this.selectedAttributeCtrl.value;
            this.selectedAttribute.stringVal  = null;
            this.selectedAttribute.lookupVal  = null;
            this.selectedAttribute.dateVal    = null;
            break;

        case this.attribSrv.LOOKUP:
            this.selectedAttribute.lookupVal  = this.selectedAttributeCtrl.value;
            this.selectedAttribute.stringVal  = null;
            this.selectedAttribute.numericVal = null;
            this.selectedAttribute.dateVal    = null;
            break;

        case this.attribSrv.DATE:
            this.selectedAttribute.dateVal   = this.selectedAttributeCtrl.value;
            this.selectedAttribute.lookupVal = null;
            this.selectedAttribute.stringVal = null;
            this.selectedAttribute.numericVal = null;
            break;
        }

        switch (this._parentId) {
        case PARENT_ARTICLE:
            this.selectedAttribute.articleId = this.childAttribSrv.getParentId();
            break;

        case PARENT_ASSET:
            this.selectedAttribute.assetId = this.childAttribSrv.getParentId();
            break;

        case PARENT_AGENT:
            this.selectedAttribute.agentId = this.childAttribSrv.getParentId();
            break;

        case PARENT_TRANSAC:
            this.selectedAttribute.transacId = this.childAttribSrv.getParentId();
            break;
        }
        if (!this.selectedAttribute.id) {
            this.selectedAttribute.attribCode = this.attributeCtrl.value?.id;
        }
        this.childAttribSrv
            .save(this.selectedAttribute)
            .subscribe(res => {
                if (!this.selectedAttribute.id) {
                    this.selectedAttribute.id = res;
                    // this.childAttributes.push(this.selectedAttribute);
                }
                this.snackBarSrv.showSuccessMessage();
                this.selectedAttribute = null;
                this.selectedAttributeCtrl.setValue(null);
                this.refresh();
            });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}

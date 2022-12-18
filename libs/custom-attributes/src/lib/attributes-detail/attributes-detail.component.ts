import { Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AttribTempl, AttribVal} from '../attributes';
import {AttributesService} from '../attributes.service';
import {PaginationModel} from '@ss/common/api-common';
import {of, switchMap} from 'rxjs';

@Component({
  selector: 'ss-attributes-detail',
  templateUrl: './attributes-detail.component.html',
  styleUrls: ['./attributes-detail.component.scss']
})
export class AttributesDetailComponent extends BaseEntityDetailComponent<AttribTempl> {
    private paginator = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0});
    private parentId = 0;
    lookupValues: AttribVal[] = [];
    selectedValue: AttribVal = null;
    selectedItem = new UntypedFormControl();
    isLookupType   = false;

    constructor(
        public override entitySrv: AttributesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_ATTRIBUTES');
        this.paginator.onChange = () => this.loadLookupValues();
    }

    public override setupForm(b: AttribTempl) {
        const form = this.formBuilder.group({
            id: [b.id],
            attType: [{ value: b.attType, disabled: false}, Validators.required],
            moduleId: [b.moduleId, Validators.required],
            description: [b.description, Validators.required],
        });
        this.parentId = b.id;
        this.isLookupType = b.attType === this.entitySrv.LOOKUP;
        this.loadLookupValues();
        return form;
    }

    private loadLookupValues() {
        this.lookupValues = [];
        this.entitySrv
            .getValueList(this.parentId, this.paginator.page - 1, this.paginator.pageSize)
            .subscribe(res => {
                this.lookupValues = res.body;
                this.paginator.elementCount = res.itemCount;
                if (this.lookupValues.length > 0) {
                    this.form.controls['attType'].disable();
                }
            });
    }
    selectValue(v: AttribVal) {
        this.selectedValue = v;
        this.selectedItem.setValue(v.description);
    }

    addItem() {
        this.selectedValue = {id: 0, code: this.parentId, description: ''};
        this.selectedItem.setValue('');
    }

    deleteItem() {
        if (this.selectedValue) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(res => res ? this.entitySrv.deleteLookupValue(this.selectedValue) : of(res)))
                .subscribe(res => {
                    if (typeof res !== 'boolean') {
                        this.snackBarSrv.showMessage('COMMON_SUCCESS');
                        this.lookupValues = this.lookupValues.filter(e => e.id !== this.selectedValue.id);
                    }
                });
        }
    }

    saveItem() {
        this.selectedValue.description = this.selectedItem.value;
        this.entitySrv
            .saveLookupValue(this.selectedValue)
            .subscribe(res => {
                if (res > 0) {
                    if (this.selectedValue.id) {
                        this.lookupValues.find(e => e.id === this.selectedValue.id).description = this.selectedValue.description;
                    } else {
                        this.selectedValue.id = res;
                        this.lookupValues.push(this.selectedValue);
                    }
                    this.selectedValue = null;
                    this.selectedItem.setValue('');
                    this.snackBarSrv.showSuccessMessage();
                }
            })
    }

    override readForm(): AttribTempl {
        const value = super.readForm();
        value.attType = this.lookupValues.length > 0? this.entitySrv.LOOKUP : value.attType;
        return value;
    }
}

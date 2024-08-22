import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import {ExtendedPaginationModel, isString, LanguageService, PaginationModel} from '@ss/common/api-common';



@Component({
    selector: 'ss-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    public langSrv = inject(LanguageService);

    @Input()
    set paginationModel(model: PaginationModel) {
        this.unbindModel();
        this.model = model as ExtendedPaginationModel;
        this.bindModel();
        const page = this.calculatePageCount();
        if (page) {
            // this will fire the event
            this.model.page = page;
        }
        this.pageInput.nativeElement.value = this.model.page;
    }

    // @Output() paginationChanged = new EventEmitter<PaginationModel>();


    model: ExtendedPaginationModel = new ExtendedPaginationModel(1, 5, 5);
    // lastModel: ExtendedPaginationModel = this.model.copy() as ExtendedPaginationModel;
    lastPage = 0;
    @ViewChild('container', { static: true }) container: ElementRef;
    @ViewChild('pageInput', { static: true }) pageInput: ElementRef;

    readonly pageSizes = [5, 10, 15, 20, 30, 40, 50];

    @Input()
        minContainerWidth: number = null;

    ngOnInit(): void {
        const f = (evt: KeyboardEvent) => {
            const key = evt.key.toUpperCase();
            if (key === 'A' || key === 'V' || key === 'C' || key === 'X') {
                // select all, copy, cut, paste
                return evt.ctrlKey;
            }
            return /[0-9]|Delete|Backspace|Arrow(Righ|Lef)t|Shift|Control|Alt/.test(evt.key);
        };
        this.pageInput.nativeElement.onkeypress = f;
        this.pageInput.nativeElement.onkeydown = f;
        this.pageInput.nativeElement.onpaste = (evt: ClipboardEvent) => {
            const data = evt.clipboardData.getData('text/plain').trim();
            if (data != null && data !== '') {
                if (/^[0-9]+$/.test(data)) {
                    evt.target['value'] = +data;
                }
            }
            return false;
        };
    }

    private bindModel() {
        if (this.model == null) {
            return;
        }
        this.model.onPageSizeChange = () => {
            this.model.mPage = 1;
            const page = this.calculatePageCount();
            if (page) {
                // change it quietly, because the event
                // is fired later anyway
                this.model.mPage = page;
            }
            this.emitModelChangedEvent();
        };
        this.model.onElementCountChange = () => {
            const page = this.calculatePageCount();
            if (page) {
                // this will fire an event
                this.model.page = page;
            }
            this.pageInput.nativeElement.value = this.model.page;
        };
        this.model.onPageChange = () => {
            this.emitModelChangedEvent();
        };
    }

    private unbindModel() {
        if (this.model == null) {
            return;
        }
        this.model.onPageChange = null;
        this.model.onPageSizeChange = null;
        this.model.onElementCountChange = null;
    }

    private calculatePageCount(): number {
        let pageCount = Math.floor(this.model.elementCount / this.model.pageSize);
        if (pageCount * this.model.pageSize < this.model.elementCount) {
            pageCount++;
        }
        this.lastPage = pageCount;
        if (pageCount > 0) {
            if (this.model.page > pageCount) {
                return pageCount; // go to this page
            }
            if (this.model.page < 1) {
                return 1; // go to this page
            }
        }
        return 0; // do not go anywhere, stay where you are
    }

    onPageButtonClick(n: number) {
        this.model.page = n;
        this.emitModelChangedEvent();
    }

    prevPage(): void {
        if (this.model.page > 1) {
            this.model.page--;
        }
    }

    isRightButtonDisabled(): boolean {
        return this.langSrv.rtl
            ? this.model.page <= 1
            : this.model.page >= this.lastPage;
    }

    isLeftButtonDisabled(): boolean {
        return this.langSrv.rtl
            ? this.model.page >= this.lastPage
            : this.model.page <= 1;
    }

    nextPage(): void {
        if (this.model.page < this.lastPage) {
            this.model.page++;
        }
    }

    onRightButtonClick() {
        if (this.langSrv.rtl) {
            this.prevPage();
        } else {
            this.nextPage();
        }
    }

    onRightPlusButtonClick() {
        if (this.langSrv.rtl) {
            this.model.page = 1;
        } else {
            this.model.page = this.lastPage;
        }
    }

    onLeftButtonClick() {
        if (this.langSrv.rtl) {
            this.nextPage();
        } else {
            this.prevPage();
        }
    }

    onLeftPlusButtonClick() {
        if (this.langSrv.rtl) {
            this.model.page = this.lastPage;
        } else {
            this.model.page = 1;
        }
    }

    emitModelChangedEvent() {
        this.pageInput.nativeElement.value = this.model.page;
        if (this.model.onChange != null) {
            this.model.fireChangeEvent();
        }
    }

    // input handling

    // isValueNotValid() {
    //     return !/^[0-9]+$/.test(this.pageInput.nativeElement.value);
    // }

    onGoToPage(): void {
        let val = this.pageInput.nativeElement.value;
        if (isString(val)) {
            val = +val;
        }
        if (Number.isNaN(val) || !Number.isFinite(val)) {
            this.pageInput.nativeElement.value = '';
        } else if (this.lastPage > 0) {
            if (val < 1) {
                val = 1;
                this.pageInput.nativeElement.value = val;
            } else if (val > this.lastPage) {
                val = this.lastPage;
                this.pageInput.nativeElement.value = val;
            }
            this.model.page = val;
        }
    }

}

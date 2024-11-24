import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LanguageService, isString } from '@ss/common/api-common';
import { MatIconButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';

interface PageButton {
    page: number;
    width: number;
    widthStyle: string; // css style
}

interface SizeLimit {
    size: number;
    min: number;
    max: number;
}


export abstract class PaginationModel {

    public abstract get page(): number;
    public abstract set page(p: number);

    public abstract get pageSize(): number;
    public abstract set pageSize(s: number);

    public abstract get elementCount(): number;
    public abstract set elementCount(c: number);

    public onChange: () => void = null;

    public static newInstance(conf?: { page: number, pageSize: number, elementCount: number }): PaginationModel {
        const c = conf == null
            ? { page: 1, pageSize: 5, elementCount: 0 }
            : conf;
        return new ExtendedPaginationModel(c.page, c.pageSize, c.elementCount);
    }

    public abstract copyModel(that: PaginationModel): void;
}

export class ExtendedPaginationModel extends PaginationModel {

    public propagatedPage;
    public propagatedPageSize;
    public propagatedElementCount;

    constructor(public mPage: number, public mPageSize: number, public mElementCount: number) {
        super();
        this.propagatedPage = mPage;
        this.propagatedPageSize = this.mPageSize;
        this.propagatedElementCount = mElementCount;
    }

    public onPageChange: () => void;
    public onPageSizeChange: () => void;
    public onElementCountChange: () => void;

    public get page(): number {
        return this.mPage;
    }

    public set page(p: number) {
        if (this.mPage === p) {
            return;
        }
        this.mPage = p;
        if (this.onPageChange != null) {
            this.onPageChange();
        }
    }

    public get pageSize(): number {
        return this.mPageSize;
    }

    public set pageSize(s: number) {
        if (this.mPageSize === s) {
            return;
        }
        this.mPageSize = s;
        if (this.onPageSizeChange != null) {
            this.onPageSizeChange();
        }
    }

    public get elementCount(): number {
        return this.mElementCount;
    }

    public set elementCount(c: number) {
        if (this.mElementCount === c) {
            return;
        }
        this.mElementCount = c;
        this.propagatedElementCount = c;
        if (this.onElementCountChange != null) {
            this.onElementCountChange();
        }
    }

    public fireChangeEvent(): void {
        if (this.propagatedPage === this.mPage
            && this.propagatedPageSize === this.mPageSize
            && this.propagatedElementCount === this.mElementCount) {
            return;
        }
        this.propagatedElementCount = this.mElementCount;
        this.propagatedPageSize = this.mPageSize;
        this.propagatedPage = this.mPage;
        if (this.onChange != null) {
            this.onChange();
        }
    }

    public copyModel(thatModel: PaginationModel): void {
        if (thatModel == null) {
            return;
        }
        const that: ExtendedPaginationModel = (thatModel as ExtendedPaginationModel);
        this.mPage = that.mPage;
        this.mPageSize = that.mPageSize;
        this.mElementCount = that.mElementCount;
        this.propagatedPage = that.propagatedPage;
        this.propagatedPageSize = that.propagatedPageSize;
        this.propagatedElementCount = that.propagatedElementCount;
    }
}

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports: [MatIconButton, NgFor, MatMenuTrigger, TranslateDirective, NgIf, MatMenu, MatMenuItem]
})
export class PaginationComponent implements OnInit {

    static readonly buttonSizeLimit: SizeLimit[] = [
        { size: 32, min: null, max: 999 },
        { size: 44, min: 1000, max: 9999 },
        { size: 48, min: 10000, max: 99999 },
        { size: 56, min: 100000, max: 999999 },
        { size: 64, min: 1000000, max: null },
    ];

    @Input()
    set paginationModel(model: PaginationModel) {
        this.unbindModel();
        this.model = model as ExtendedPaginationModel;
        this.bindModel();
        const page = this.calculatePageCount();
        if (page) {
            // this will generate the buttons and fire the event
            this.model.page = page;
        } else {
            // changing the page will cause button generation
            // so this should only happen here (inside the else block)
            this.generateButtons();
        }
    }

    @Input()
    forceWidth: number = null;

    // @Output() paginationChanged = new EventEmitter<PaginationModel>();

    constructor(public langSrv: LanguageService) {
    }

    model: ExtendedPaginationModel = new ExtendedPaginationModel(1, 5, 5);
    // lastModel: ExtendedPaginationModel = this.model.copy() as ExtendedPaginationModel;
    lastPage: number;
    @ViewChild('container', { static: true }) container: ElementRef;
    @ViewChild('pageInput', { static: true }) pageInput: ElementRef;
    lastContainerSize = 0;

    readonly pageSizes = [5, 10, 15, 20, 30, 40, 50];

    buttons: PageButton[] = [];

    @Input()
    showPagesSizes = true;

    @Input()
    minContainerWidth: number = null;

    @Input()
    goToLabel = 'GOTO_PAGE';

    @Input()
    perPageLabel = 'PER_PAGE';

    @Input()
    firstPageLabel = 'FIRST_PAGE';

    @Input()
    lastPageLabel = 'LAST_PAGE';

    @Input()
    pageCountLabel = 'TOTAL_PAGES';

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
                    (evt.target as any).value = +data;
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
            this.generateButtons();
            this.emitModelChangedEvent();
        };
        this.model.onElementCountChange = () => {
            const page = this.calculatePageCount();
            this.generateButtons();
            if (page) {
                // this will fire an event
                this.model.page = page;
            }
        };
        this.model.onPageChange = () => {
            this.generateButtons();
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
        return 0; // do not go anywhere
    }

    private getParentWidth(): number {
        if (this.forceWidth != null) {
            return this.forceWidth - 64; // 32 right & 32 left nav buttons
        }
        let w = this.container.nativeElement.scrollWidth;
        if (!w) {
            w = 320;
        }
        if (this.minContainerWidth && w < this.minContainerWidth) {
            w = this.minContainerWidth;
        }
        return w;
    }

    private pageNumberToButton(p: number): PageButton {
        const size = PaginationComponent.buttonSizeLimit
            .filter(l => (l.min == null || l.min <= p) && (l.max == null || p <= l.max))[0].size;
        return { page: p, width: size, widthStyle: size + 'px' };
    }

    private resizeButtons(): void {
        // todo: use this later to resize shit when the component changes size
        const remainingWidth = this.getParentWidth();
        this.lastContainerSize = remainingWidth;
        if (Math.abs(remainingWidth - this.lastContainerSize) < 5) {
            return;
        }
        this.generateButtons();
    }

    private generateButtons(): void {
        const currentPage = this.model.page;
        let remainingWidth = this.getParentWidth();
        this.lastContainerSize = remainingWidth;
        this.buttons = [
            this.pageNumberToButton(currentPage)
        ];
        remainingWidth -= this.buttons[0].width;
        let i = currentPage;
        let j = currentPage;
        let odd = true;
        let rightTooBig = false;
        let leftTooBig = false;
        while (true) {
            if (i >= this.lastPage && j <= 1) {
                // all pages are show
                break;
            }
            if (remainingWidth < 1) {
                // no more space
                break;
            }
            if (odd && !leftTooBig) {
                // if <odd> & <less or eq to last page> then add to the right
                if (i < this.lastPage) {
                    i++;
                    const btn = this.pageNumberToButton(i);
                    if (btn.width > remainingWidth) {
                        leftTooBig = true;
                    } else {
                        this.buttons.push(btn);
                        remainingWidth -= btn.width;
                    }
                }
            }
            if (!odd && !rightTooBig) {
                // if <even> & <greater than 0> then add to the left
                if (j > 1) {
                    j--;
                    const btn = this.pageNumberToButton(j);
                    if (btn.width > remainingWidth) {
                        rightTooBig = true;
                    } else {
                        this.buttons.unshift(btn);
                        remainingWidth -= btn.width;
                    }
                }
            }
            if ((rightTooBig || j <= 1) && (leftTooBig || i >= this.lastPage)) {
                // can not add another button.
                break;
            }
            odd = !odd;
        }
    }

    onPageButtonClick(n: number) {
        this.model.page = n;
        // this.emitModelChangedEvent();
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

    onLeftButtonClick() {
        if (this.langSrv.rtl) {
            this.nextPage();
        } else {
            this.prevPage();
        }
    }

    emitModelChangedEvent() {
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

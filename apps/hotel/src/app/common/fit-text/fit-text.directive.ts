import {
    AfterViewInit,
    Directive,
    Renderer2,
    ElementRef,
    Input,
    HostListener,
    OnInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

/**
 * @author: Muaaz (PS: If any flaws are found, I am not the author, must be someone else)
 */
@Directive({
    selector: '[appFitText]',
})
export class FitTextDirective implements AfterViewInit, OnInit, OnChanges {

    @Input() fitText?= true;
    @Input() fitTextCompression?= 1;
    @Input() fitTextActivateOnResize?= true;
    @Input() fitTextMinFontSize?: number | 'inherit' = 0;
    @Input() fitTextMaxFontSize?: number | 'inherit' = Number.POSITIVE_INFINITY;
    @Input() fitTextDelay?= 100;

    private fitTextParent: HTMLElement;
    private fitTextElement: HTMLElement;
    private minFontSize: number;
    private maxFontSize: number;
    private computed: CSSStyleDeclaration;
    private newlines: number;
    private lineHeight: string;
    private display: string;
    private calcSize = 10;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
        this.fitTextElement = el.nativeElement;
        this.fitTextParent = this.fitTextElement.parentElement;
        this.computed = window.getComputedStyle(this.fitTextElement);
        this.newlines = this.fitTextElement.childElementCount > 0 ? this.fitTextElement.childElementCount : 1;
        this.lineHeight = this.computed['line-height'];
        this.display = this.computed.display;
    }

    @HostListener('window:resize')
    public onWindowResize = (): void => {
        if (this.fitTextActivateOnResize) {
            this.setFontSize();
        }
    }

    public ngOnInit() {
        this.minFontSize = this.fitTextMinFontSize === 'inherit' ? this.computed['font-size'] : this.fitTextMinFontSize;
        this.maxFontSize = this.fitTextMaxFontSize === 'inherit' ? this.computed['font-size'] : this.fitTextMaxFontSize;
    }

    public ngAfterViewInit() {
        this.setFontSize();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.fitTextCompression && !changes.fitTextCompression.firstChange) {
            this.setFontSize();
        }
    }

    private setFontSize = (): void => {
        setTimeout(
            (() => {
                if (this.fitTextElement.offsetHeight * this.fitTextElement.offsetWidth !== 0) {
                    // reset to default
                    this.setStyles(this.calcSize, 1, 'inline-block');
                    // set new
                    this.setStyles(this.calculateNewFontSize(), this.lineHeight, this.display);
                }
            }).bind(this),
            this.fitTextDelay
        );
    }

    private calculateNewFontSize = (): number => {
        const ratio = (this.calcSize * this.newlines) / this.fitTextElement.offsetWidth / this.newlines;

        return 0.9 * Math.max(
            Math.min(
                (this.fitTextParent.offsetWidth -
                    (parseFloat(getComputedStyle(this.fitTextParent).paddingLeft) +
                        parseFloat(getComputedStyle(this.fitTextParent).paddingRight)) -
                    6) *
                ratio *
                this.fitTextCompression,
                this.maxFontSize
            ),
            this.minFontSize
        );
    }

    private setStyles = (fontSize: number, lineHeight: number | string, display: string): void => {
        this.renderer.setStyle(this.fitTextElement, 'fontSize', fontSize.toString() + 'px');
        this.renderer.setStyle(this.fitTextElement, 'lineHeight', lineHeight.toString());
        this.renderer.setStyle(this.fitTextElement, 'display', display);
    }

}

import {
    AfterContentChecked,
    AfterViewChecked,
    Directive,
    ElementRef, HostListener, Input,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges
} from "@angular/core";


@Directive({
    selector: '[ssVCenter]'
})
export class VCenterDirective implements OnInit, AfterViewChecked {

    @Input() childHeight = null;
    lastHeight = 0;
    lastParentHeight = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.el.nativeElement.parentElement.onresize = this.resize.bind(this);
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        this.resize();
    }

    private resize(): void {
        try {
            const e = this.el.nativeElement;
            const p = e.parentElement;
            const height = this.childHeight ? this.childHeight : e.scrollHeight;
            const parentHeight = p.scrollHeight;
            if (height != this.lastHeight || this.lastParentHeight != parentHeight) {
                const marginTop = (parentHeight - height) / 2;
                this.lastParentHeight = parentHeight;
                this.lastHeight = height;
                this.renderer.setStyle(e, 'margin-top', marginTop + 'px');
            }
        } catch (ex) {
        }
    }

    ngAfterViewChecked(): void {
        this.resize();
    }
}

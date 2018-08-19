import { Directive, OnInit, ElementRef, Input } from '@angular/core';

const BALANCER = 4; 

/** 
 * Generic Exemple :
 *      appMargin = [x1?, x2?, x3?, x4?]
 *      margin-top : x1 * BALANCER px;
 *      margin-right : x2 * BALANCER px;
 *      margin-bottom : x3 * BALANCER px;
 *      margin-left : x4 * BALANCER px;
 */

@Directive({
  selector: '[appMargins]'
})
export class MarginsDirective implements OnInit {
  
    @Input('appMargins') marginParams: string;

    constructor(private el: ElementRef) {

    }
    ngOnInit(): void {
        console.log(this.marginParams);
        const margins = this.marginParams.split('-');

        this.el.nativeElement.style['margin-top'] =
            margins[0] ? `${BALANCER*parseInt(margins[0])}px` : 
            this.el.nativeElement.style['margin-top'];
        
        this.el.nativeElement.style['margin-right'] = 
            margins[1] ? `${BALANCER*parseInt(margins[1])}px` : 
            this.el.nativeElement.style['margin-right'];
     
        this.el.nativeElement.style['margin-bottom'] =
            margins[2] ? `${BALANCER*parseInt(margins[2])}px` : 
            this.el.nativeElement.style['margin-bottom'];

        this.el.nativeElement.style['margin-left'] = 
            margins[3] ? `${BALANCER*parseInt( margins[3])}px` : 
            this.el.nativeElement.style['margin-left'];
    }
}
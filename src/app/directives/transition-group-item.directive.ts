import {Directive, ElementRef} from "@angular/core";

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: "[transitionGroupItem]"
})
/**
 * Based on https://stackoverflow.com/a/49706664/217490
 */
export class TransitionGroupItemDirective {
  prevPos: any;
  newPos: any;
  el: HTMLElement;
  moved: boolean;
  moveCallback: any;

  constructor(elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }
}

import {AfterViewInit, Component, ContentChildren, Input, QueryList} from "@angular/core";
import {TransitionGroupItemDirective} from "../directives/transition-group-item.directive";

@Component({
  /* tslint:disable-next-line:component-selector */
  selector: "[transition-group]",
  template: "<ng-content></ng-content>"
})
/**
 * Based on https://stackoverflow.com/a/49706664/217490
 */
export class TransitionGroupComponent implements AfterViewInit {
  /* tslint:disable-next-line:no-input-rename */
  @Input("transition-group") class;

  @ContentChildren(TransitionGroupItemDirective) items: QueryList<TransitionGroupItemDirective>;

  ngAfterViewInit() {
    setTimeout(() => this.refreshPosition("prevPos"), 0); // save init positions on next "tick"

    this.items.changes.subscribe(items => {
      items.forEach(item => item.prevPos = item.newPos || item.prevPos);
      items.forEach(this.runCallback);
      this.refreshPosition("newPos");
      items.forEach(item => item.prevPos = item.prevPos || item.newPos); // for new items

      const animate = () => {
        items.forEach(this.applyTranslation);
        this["_forceReflow"] = document.body.offsetHeight; // force reflow to put everything in position
        this.items.forEach(this.runTransition.bind(this));
      };

      const willMoveSome = items.some((item) => {
        const dx = item.prevPos.left - item.newPos.left;
        const dy = item.prevPos.top - item.newPos.top;
        return dx || dy;
      });

      if (willMoveSome) {
        animate();
      } else {
        setTimeout(() => { // for removed items
          this.refreshPosition("newPos");
          animate();
        }, 0);
      }
    });
  }

  runCallback(item: TransitionGroupItemDirective) {
    if (item.moveCallback) {
      item.moveCallback();
    }
  }

  runTransition(item: TransitionGroupItemDirective) {
    if (!item.moved) {
      return;
    }
    const cssClass = this.class + "-move";
    const el = item.el;
    const style: any = el.style;
    el.classList.add(cssClass);
    style.transform = style.WebkitTransform = style.transitionDuration = "";
    el.addEventListener("transitionend", item.moveCallback = (e: any) => {
      if (!e || /transform$/.test(e.propertyName)) {
        el.removeEventListener("transitionend", item.moveCallback);
        item.moveCallback = null;
        el.classList.remove(cssClass);
      }
    });
  }

  refreshPosition(prop: string) {
    this.items.forEach(item => {
      item[prop] = item.el.getBoundingClientRect();
    });
  }

  applyTranslation(item: TransitionGroupItemDirective) {
    item.moved = false;
    const dx = item.prevPos.left - item.newPos.left;
    const dy = item.prevPos.top - item.newPos.top;
    if (dx || dy) {
      item.moved = true;
      const style: any = item.el.style;
      style.transform = style.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      style.transitionDuration = "0s";
    }
  }
}

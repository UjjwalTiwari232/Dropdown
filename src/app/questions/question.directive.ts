import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appOptionsHost]',
})
export class OptionsHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

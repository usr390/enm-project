import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCenterContainer]'
})
export class CenterContainerDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() { this.centerContainer(); }

  @HostListener('window:resize', ['$event']) onResize() { this.centerContainer(); }

  centerContainer() {
    const containerElement = this.el.nativeElement;
    const topPosition = (window.innerHeight - containerElement.offsetHeight) / 2;
    containerElement.style.position = 'relative';
    containerElement.style.top = `${topPosition}px`;
  }
}

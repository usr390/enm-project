import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'enm';
  private lastTapTime = 0;
  private tapCount = 0;
  private globalClickListener!: Function;
  private globalTouchListener!: Function;

  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.globalClickListener = this.renderer.listen('document', 'click', (event) => {
      this.handleTap(event, 'click');
    });

    this.globalTouchListener = this.renderer.listen('document', 'touchend', (event) => {
      this.handleTap(event, 'touch');
    });
  }

  handleTap(event: Event, type: 'click' | 'touch'): void {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.lastTapTime;

    if (timeDiff < 50 && type === 'click') { 
      // probably the same physical tap, so ignore
      return;
    }

    // reset tap count if more than 300ms has passed since the last tap
    if (timeDiff > 300) {
      this.tapCount = 0;
    }

    this.lastTapTime = currentTime;
    this.tapCount++;

    if (this.tapCount === 5) {
      this.tapCount = 0;
      this.handleFiveTaps();
    }
  }

  handleFiveTaps() { this.router.navigateByUrl('/add-event/venue') }

  ngOnDestroy() {
    if (this.globalClickListener) this.globalClickListener();
    if (this.globalTouchListener) this.globalTouchListener();
  }
}

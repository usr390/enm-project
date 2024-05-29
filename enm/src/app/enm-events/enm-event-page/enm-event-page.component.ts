// angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// 3rd party imports
import { Store } from '@ngrx/store';
import { combineLatest, map, take } from 'rxjs';
// enm imports
import { AppState } from 'src/app/state/app.state';
import * as EnmEventsSelectors from './../../state/enmEvents/enmEvents.selectors';
import * as RouterSelectors from './../../state/router/router.selectors';
import { MessageService } from 'primeng/api';
import * as AuthSelectors from './../../state/auth/auth.selectors';
import * as enmEventsActions from './../../state/enmEvents/enmEvents.actions';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-enm-event-page',
  templateUrl: './enm-event-page.component.html',
  styleUrls: ['./enm-event-page.component.less']
})
export class EnmEventPageComponent implements OnInit {

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private messageService: MessageService,
    private viewportScroller: ViewportScroller
  ) { }

  lastCopyTimestamp: number = 0;
  isCopying: boolean = false;
  isMobile!: boolean;
  currentUser$ = this.store$.select(AuthSelectors.selectUser);


  enmEvent$ = combineLatest([this.store$.select(EnmEventsSelectors.selectAll), this.store$.select(EnmEventsSelectors.selectSelectedEventId)]).pipe(
    map(([enmEvents, spotlightEnmEventId]) => enmEvents.filter(enmEvent => enmEvent._id === spotlightEnmEventId)[0]),
  );

  ngOnInit(): void { 
    this.checkDeviceType();
    this.store$.select(RouterSelectors.selectCurrentRoute)
    .pipe(
      take(1),
      map(route => route && route.params['id']),
    )
    .subscribe(eventId => {
      if (eventId) {
        this.store$.dispatch(enmEventsActions.selectEventFromEventList({_id: eventId as string}))
      }
    });
    this.store$.dispatch(enmEventsActions.enmEventListRequest())
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
    // Additionally, ensure compatibility with Safari
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  goBack() {
    this.router.navigate(['/']); 
  }

  copyAddress(event: MouseEvent) {
    event.stopPropagation(); // Prevent navigating to another route
  
    // rate limiting logic
    const now = Date.now();
    const timeSinceLastCopy = now - this.lastCopyTimestamp;
    if (timeSinceLastCopy < 2000) {  // 2-second limit
      return;
    }
    this.lastCopyTimestamp = now;
    this.isCopying = true;
  
    // initialize variables to hold the text elements
    let textToCopy = '';
    const target = event.target as HTMLElement;
  
    // function to recursively search for parent with a specific class
    function findParentWithClass(element: HTMLElement, className: string): HTMLElement | null {
      while (element && !element.classList.contains(className)) {
        if (element.parentElement) {
          element = element.parentElement;
        } else {
          return null;
        }
      }
      return element;
    }
  
    // ensure that the target is an HTMLElement before trying to access innerText
    if (target) {
      const clickableArea = findParentWithClass(target, 'click-to-copy');
  
      // check if the clicked area or its children have the address classes
      if (clickableArea) {
        const addressElement = clickableArea.querySelector('.card-text.address-text');
        const venueAddressElement = clickableArea.querySelector('.card-text.venue-address-text');
  
        if (addressElement && addressElement instanceof HTMLElement) {
          textToCopy = addressElement.innerText.trim();
        } else if (venueAddressElement && venueAddressElement instanceof HTMLElement) {
          textToCopy = venueAddressElement.innerText.trim();
        }
      }
    }
  
    // copy the text if found
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.messageService.add({ key: 'addressCopied', severity: 'info', summary: "Address Copied", detail: 'Ready To Paste' });
      }).catch(err => {
        console.error('Failed to copy: ', err);
        this.messageService.add({ key: 'addressCopiedError', severity: 'error', summary: "Error", detail: 'Could Not Copy Address To Clipboard' });
      });
    } else {
      alert('No address to copy.');
    }
  
    // reset the isCopying flag
    setTimeout(() => this.isCopying = false, 2000); // Reset after a short delay
  }

  checkDeviceType(){
    const userAgent = window.navigator.userAgent;
    const screenWidth = window.innerWidth;

    // very basic way to identify a mobile device. might want to use a more robust approach
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || screenWidth < 768;
  }

}


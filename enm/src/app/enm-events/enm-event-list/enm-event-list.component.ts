// angular
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// 3rd party
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { DateTime } from 'luxon';
// enm
import { EnmEvent } from '../../models/enm-event.model';
import { AppState } from 'src/app/state/app.state';
import * as AuthSelectors from './../../state/auth/auth.selectors';
import * as fromEnmEvent from './../../state/enmEvents/enmEvents.selectors';
import * as enmEventsActions from './../../state/enmEvents/enmEvents.actions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-enm-event-list',
  templateUrl: './enm-event-list.component.html',
  styleUrls: ['./enm-event-list.component.less']
})
export class EnmEventListComponent implements OnInit {

  @ViewChild('addressText') addressTextElement!: ElementRef;
  @ViewChild('venueAddressText') venueAddressElement!: ElementRef;

  // Initialize lastCopyTimestamp with 0 or some suitable default value
  lastCopyTimestamp: number = 0;
  lastToastTimestamp: number = 0;

  isVisible: boolean = true;
  isCopying: boolean = false;
  isMobile!: boolean;

  hideElementTemporarily() {
    this.checkDeviceType();
    this.isVisible = false;
    setTimeout(() => this.isVisible = true, 200); // 500 ms = half a second
  }


  constructor(
    private store$: Store<AppState>,
    private messageService: MessageService
  ) { }

  user$ = this.store$.select(AuthSelectors.selectUser); // for distinguishing between regular and plus users
  listLoading$ = this.store$.select(fromEnmEvent.selectLoading); // for displaying loading animation
  listLoaded$ = this.store$.select(fromEnmEvent.selectLoaded); // for deciding whether to dispatch init action
  filterText$ = this.store$.select(fromEnmEvent.selectFilter) // for giving user feedback when filter doesn't return results


  filteredEnmEventList$ = this.store$.select(fromEnmEvent.selectFiltered);
  
  groupedByDateEnmEventList$ = this.filteredEnmEventList$.pipe(
    map((events) => {
      const enmEventsGroupedByDate = new Map<string, EnmEvent[]>();
      events.forEach(event => {
        let dateTime = DateTime.fromISO(event.dateTime);
        const dateKey = dateTime.toFormat('yyyy') + dateTime.toFormat('LL') + dateTime.toFormat('dd');
        if (!enmEventsGroupedByDate.has(dateKey)) enmEventsGroupedByDate.set(dateKey, []);
        enmEventsGroupedByDate.get(dateKey)!.push(event);
      });
      return enmEventsGroupedByDate;
    }),
  );

  ngOnInit() {
    this.hideElementTemporarily()
    this.listLoaded$.pipe(take(1), filter(loaded => !loaded),).subscribe(_ => {
      this.store$.dispatch(enmEventsActions.enmEventListRequest())
    });
  }

  onEnmEventListSelection(_id: string | undefined) { 
    this.store$.dispatch(enmEventsActions.selectEventFromEventList({_id: _id as string}))
  }

  copyAddress(event: MouseEvent) {
    event.stopPropagation();  // Prevent the event from bubbling up

    // Initialize the text variable
    let textToCopy = '';
    const target = event.target as HTMLElement;

    // Function to recursively search for parent with a specific class
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

    // Check if the target is within the clickable area
    if (target) {
      const clickableArea = findParentWithClass(target, 'click-to-copy');

      // Extract the text if the clicked area is correct
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

    // Copy the text if found
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Display the toast only if enough time has passed
        const now = Date.now();
        if (now - this.lastToastTimestamp >= 2000) { // 2-second limit for toasts
          this.lastToastTimestamp = now;
          this.messageService.add({ key: 'addressCopied', severity: 'info', summary: "Address Copied", detail: "Ready to paste" });
        }
      }).catch(err => {
        // Handle copy errors
        console.error('Failed to copy: ', err);
      });
    } else {
      alert('No address to copy.');
    }

    // Prevent navigation for a longer period
    this.isCopying = true;
    setTimeout(() => this.isCopying = false, 100);  // Match this with your toast rate limit
  }
  

  checkDeviceType(){
    const userAgent = window.navigator.userAgent;
    const screenWidth = window.innerWidth;

    // very basic way to identify a mobile device. might want to use a more robust approach
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || screenWidth < 768;
  }

  refreshlist() {
    setTimeout(() => {
      this.store$.dispatch(enmEventsActions.enmEventListRequest())
    }, 500);
  }
}


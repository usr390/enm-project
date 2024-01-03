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

  isVisible: boolean = true;
  isCopying: boolean = false;

  hideElementTemporarily() {
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
    event.stopPropagation();
    this.isCopying = true;
  
    let textToCopy = this.addressTextElement?.nativeElement.innerText || this.venueAddressElement?.nativeElement.innerText;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.messageService.add({ key: 'addressCopied', severity: 'success', summary: "Success", detail: 'Address Copied To Clipboard' });
      }).catch(err => {
        console.error('Failed to copy: ', err);
        this.messageService.add({ key: 'addressCopiedError', severity: 'error', summary: "Error", detail: 'Could Not Copy Address To Clipboard' });
        alert('Unable to copy. Please manually copy the text.');
      });
    } else {
      alert('No address to copy.');
    }
  
    setTimeout(() => this.isCopying = false, 100); 
  }
}


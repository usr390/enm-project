import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EnmEventService } from './../../core/services/enm-event.service';

@Component({
  selector: 'app-enm-event-list-filter',
  templateUrl: './enm-event-list-filter.component.html',
  styleUrls: ['./enm-event-list-filter.component.less']
})
export class EnmEventListFilterComponent implements OnInit {

  enmEventListFilterForm = this.fb.group({ filter: '' });

  constructor(private enmEventService: EnmEventService, private fb: FormBuilder) { }

  ngOnInit() {}

  filterResults() { this.enmEventService.updateEnmEventListFilter(this.enmEventListFilterForm.value.filter?.trim() as string); }

  clearFilter() {
    this.enmEventListFilterForm.patchValue({ filter: ''});
    this.filterResults(); 
  }
}


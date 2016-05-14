import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router, RouterLink, RouteParams} from '@angular/router-deprecated';

import {EntryService} from '../services/entry.service';

@Component({
  selector: 'entries',
  directives: [CORE_DIRECTIVES, RouterLink],
  templateUrl: 'app/components/entries.component.html'
})
export class EntriesComponent implements OnInit {

  private entries:Object;
  private loading:boolean;

  constructor(private entryService:EntryService) {}

  ngOnInit():void {
    this.loading = true;
    this.entryService
      .getAll()
      .subscribe((res:any) => {
        this.entries = res.json().elements;
        this.loading = false;
      });
  }

}
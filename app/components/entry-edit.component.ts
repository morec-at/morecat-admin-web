import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, ControlGroup, FormBuilder} from '@angular/common';
import {RouteParams} from '@angular/router-deprecated';

import {EntryService} from '../services/entry.service';

@Component({
  selector: 'entry-detail',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'app/components/entry-edit.component.html'
})
export class EntryEditComponent implements OnInit {

  form:ControlGroup;

  private entry:Object;
  private availableFormats:String[];
  private availableStates:String[];

  constructor(private routeParams:RouteParams,
              private entryService:EntryService,
              private formBuilder:FormBuilder) {
    this.form = formBuilder.group({
      'title': [],
      'content': [],
      'permalink': [],
      'tags': [],
      'state': [],
      'format': [],
    });
  }

  ngOnInit():void {
    this.entryService
      .get(Number(this.routeParams.get('id')))
      .subscribe((res:any) => {
        this.entry = res.json();
      });

    this.entryService
      .getAvailableFormats()
      .subscribe((res:any) => {
        this.availableFormats = res.json();
      });


    this.entryService
      .getAvailableStates()
      .subscribe((res:any) => {
        this.availableStates = res.json();
      });
  }

  onSubmit(form:any):void {
    this.entryService.update(Number(this.routeParams.get('id')), form)
      .subscribe();
  }

  goBack():void {
    window.history.back();
  }

}
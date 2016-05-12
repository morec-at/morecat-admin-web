import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EntryService {

  constructor(private http:Http) {}

  getAll() {
    return this.http.get('http://localhost:8080/admin/entries');
  }

  get(id: Number) {
    return this.http.get(`http://localhost:8080/admin/entries/${id}`)
  }

  getAvailableFormats() {
    return this.http.get(`http://localhost:8080/admin/entries/available-formats`)
  }

  getAvailableStates() {
    return this.http.get(`http://localhost:8080/admin/entries/available-states`)
  }

}
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EntryService {

  constructor(private http:Http) {}

  getAll() {
    return this.http.get('http://localhost:8080/admin/entries');
  }

  get(id:Number) {
    return this.http.get(`http://localhost:8080/admin/entries/${id}`)
  }

  getAvailableFormats() {
    return this.http.get(`http://localhost:8080/admin/entries/available-formats`)
  }

  getAvailableStates() {
    return this.http.get(`http://localhost:8080/admin/entries/available-states`)
  }

  update(id:Number, form:any) {
    let body = JSON.stringify({
      'title': form.title,
      'content': form.content,
      'permalink': form.permalink,
      'tags': form.tags.replace(/\s+/g,'').split(','),
      'state': form.state,
      'format': form.format
    });

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(`http://localhost:8080/admin/entries/${id}`, body, options);
  }

}
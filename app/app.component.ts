import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

@Component({
  selector: 'app',
  template: `<h1>{{title}}</h1>`
})
export class AppComponent {
  title = 'morecat admin web';
}

import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {HomeComponent} from './home.component';
import {NewEntryComponent} from './new_entry.component';
import {EntriesComponent} from './entries.component';
import {EntryEditComponent} from './entry-edit.component';
import {MediaComponent} from './media.component';
import {AccountComponent} from './account.component';
import {UsersComponent} from './users.component';
import {ConfigurationComponent} from './configuration.component';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <ul>
        <li><a [routerLink]="['Home']">Home</a></li>
        <li><a [routerLink]="['NewEntry']">New Entry</a></li>
        <li><a [routerLink]="['Entries']">Entries</a></li>
        <li><a [routerLink]="['Media']">Media</a></li>
        <li><a [routerLink]="['Account']">Account</a></li>
        <li><a [routerLink]="['Users']">Users</a></li>
        <li><a [routerLink]="['Configuration']">Configuration</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>`
})
@RouteConfig([
  {path: '/', name: 'Home', component: HomeComponent},
  {path: '/entries/new', name: 'NewEntry', component: NewEntryComponent},
  {path: '/entries', name: 'Entries', component: EntriesComponent},
  {path: '/entries/:id', name: 'EntryEdit', component: EntryEditComponent},
  {path: '/media', name: 'Media', component: MediaComponent},
  {path: '/account', name: 'Account', component: AccountComponent},
  {path: '/users', name: 'Users', component: UsersComponent},
  {path: '/configuration', name: 'Configuration', component: ConfigurationComponent}
])
export class AppComponent {
  title = 'morecat web admin';
}

import {bootstrap} from '@angular/platform-browser-dynamic';

import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './components/app.component';
import {EntryService} from './services/entry.service';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(EntryService, {useClass: EntryService})
]);
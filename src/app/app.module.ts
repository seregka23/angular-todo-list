import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { userReducer } from './store/reducers/user.reducer';
import { USER_FEATURE_KEY } from './store/selectors/user.selector';
import { ItemComponent } from './components/item/item.component';
import { ITEM_FEATURE_KEY } from './store/selectors/item.selector';
import { itemReducer } from './store/reducers/item.reducer';
import { ItemsService } from './services/items.service';
import { ItemEffect } from './store/effects/item.effect';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      [USER_FEATURE_KEY]: userReducer,
      [ITEM_FEATURE_KEY]: itemReducer
    }),
    EffectsModule.forRoot([ItemEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

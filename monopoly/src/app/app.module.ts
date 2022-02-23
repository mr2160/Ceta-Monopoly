import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VodovaStranComponent } from './vodova-stran/vodova-stran.component';
import { ModeratorStranComponent } from './moderator-stran/moderator-stran.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PosestCardComponent } from './partials/posest-card/posest-card.component';
import { VodCardComponent } from './partials/vod-card/vod-card.component';
import { PrijavaComponent } from './prijava-stran/prijava.component';
import { TransakcijaTextPipe } from './pipes/transakcija-text.pipe';
import { DbComponent } from './db/db.component';


@NgModule({
  declarations: [
    AppComponent,
    VodovaStranComponent,
    ModeratorStranComponent,
    PosestCardComponent,
    VodCardComponent,
    PrijavaComponent,
    TransakcijaTextPipe,
    DbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

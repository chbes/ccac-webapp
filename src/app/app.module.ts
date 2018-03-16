import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StatsComponent } from './stats/stats.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { FooterComponent } from './footer/footer.component';

import { TransactionService } from './services/transaction.service';
import { WebsocketService } from './services/websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatsComponent,
    AddComponent,
    ListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [TransactionService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

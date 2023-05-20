import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BoardComponent } from './components/pages/board/board.component';
import { ButtonComponent } from './components/elements/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

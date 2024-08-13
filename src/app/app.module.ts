import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsModule } from './questions/questions.module';
import { HeaderModule } from './header/header.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { OptionModule } from './option/option.module';
import { AddCorrectOptionsComponent } from './add-correct-options/add-correct-options.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    QuestionsModule,
    OptionModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

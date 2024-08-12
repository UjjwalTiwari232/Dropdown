import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { FormsModule } from '@angular/forms';
import { OptionModule } from '../option/option.module';
import { CoreModule } from '../shared/core.module';



@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OptionModule,
    CoreModule,
    QuestionsRoutingModule
  ],
  
})
export class QuestionsModule { }

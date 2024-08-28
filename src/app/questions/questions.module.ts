import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { FormsModule } from '@angular/forms';
import { OptionModule } from '../option/option.module';
import { CoreModule } from '../shared/core.module';
import { TokenModule } from '../token/token.module';
import { AddCorrectOptionsModule } from '../add-correct-options/add-correct-options.module';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from '../common-components/header/header.module';


@NgModule({
  declarations: [
    QuestionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    OptionModule,
    TokenModule,
    MatIconModule,
    AddCorrectOptionsModule,
    HeaderModule,
    CoreModule,
    QuestionsRoutingModule
  ],
  
})
export class QuestionsModule { }

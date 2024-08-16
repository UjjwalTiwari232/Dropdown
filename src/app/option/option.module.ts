import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './option.component';
import { FormsModule } from '@angular/forms';
import { FilterTextboxComponent } from './filter-textbox.components';



@NgModule({
  declarations: [
    OptionComponent,
    FilterTextboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[OptionComponent]
})
export class OptionModule { }

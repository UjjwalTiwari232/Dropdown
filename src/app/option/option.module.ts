import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTextboxComponent } from './filter-textbox.components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    OptionComponent,
    FilterTextboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports:[OptionComponent]
})
export class OptionModule { }

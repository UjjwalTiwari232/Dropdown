import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './option.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[OptionComponent]
})
export class OptionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCorrectOptionsComponent } from './add-correct-options.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddCorrectOptionsComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [AddCorrectOptionsComponent]
})
export class AddCorrectOptionsModule { }

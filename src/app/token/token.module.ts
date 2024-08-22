import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { FormsModule } from '@angular/forms';
import { OptionModule } from '../option/option.module';



@NgModule({
  declarations: [ TokenComponent ],
  imports: [
    CommonModule,
    FormsModule,
    OptionModule
  ],
  exports:[TokenComponent]
})
export class TokenModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewWindowComponent } from './preview-window.component';
import { PreviewWindowRoutingModule } from './preview-window-routing.module';
import { HeaderModule } from '../common-components/header/header.module';



@NgModule({
  declarations: [
    PreviewWindowComponent,
    
  ],
  imports: [
    CommonModule,
    HeaderModule,
    PreviewWindowRoutingModule,
]
})
export class PreviewWindowModule { }

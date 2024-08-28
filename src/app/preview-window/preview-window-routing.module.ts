import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewWindowComponent } from './preview-window.component';

const routes: Routes = [
  {path:"preview", component:PreviewWindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PreviewWindowRoutingModule { }

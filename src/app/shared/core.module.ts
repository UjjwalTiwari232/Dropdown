import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppService } from './DataService';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ AppService ]
})
export class CoreModule { }
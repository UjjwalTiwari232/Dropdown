// import { ChangeDetectorRef, Component, Input, OnInit, ViewContainerRef } from '@angular/core';
// import { IOption } from '../shared/interface';
// import { AppService } from '../shared/DataService';

// @Component({
//   selector: 'app-option',
//   templateUrl:'./option.component.html' ,
//   styleUrls:['./option.component.css']
// })
// export class OptionComponent implements OnInit {
//   optionsList:IOption[] = [];
//   _filter: string = "";
//   current_Option:IOption | null= null ;
//   @Input() get filter() {
//       return this._filter;
//   }
  
//   set filter(val: string) { 
//       this.option.option = val;
//       console.log(this.option)
//       this.appService.updateOption(this.option);

      
//   }

//   constructor(private  appService: AppService, viewRef: ViewContainerRef, cd:ChangeDetectorRef) {
//     this.appService.viewRef = viewRef;
//     this.appService.optionsList$.subscribe(options => {
//       this.optionsList = options;
//     });
    
//     console.log("Constructor of Option called");
    
//   }

//   ngOnInit(): void {
//     this.optionsList = this.appService.getOptions();
//     console.log("Console: ",this.appService.getOptions());
//   }
//   @Input() option: IOption = { id: 0, option: '', isCorrect: false }; // Default value


//   deleteToken(id:number){
//     this.appService.deleteOptionById(id);
//   }
// }

// import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
// import { IOption } from '../shared/interface';
// import { AppService } from '../shared/DataService';

// @Component({
//   selector: 'app-option',
//   templateUrl: './option.component.html',
//   styleUrls: ['./option.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush // Add this line
// })
// export class OptionComponent implements OnInit {
  
//   optionsList: IOption[] = [];
  
  
//   @Input() option: IOption = { id: 0, option: '', isCorrect: false }; // Default value

 

//   @Output() changed: EventEmitter<IOption> = new EventEmitter<IOption>();

//   set filter(val:string) {
//     this.option.option = val;
//     console.log("setting: ",this.option)
//     this.appService.updateOption(this.option); 

    
//   }
 
//   constructor(private appService: AppService, viewRef: ViewContainerRef) {
//     console.log("Options Constructor Called")
//     this.appService.viewRef = viewRef;
//     this.appService.optionsList$.subscribe(options => {
//       this.optionsList = options;
//     });
//   }

//   ngOnInit(): void {
//     this.optionsList = this.appService.getOptions();
//   }

//   deleteToken(id: number) {
//     this.appService.deleteOptionById(id);
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { IOption } from '../shared/interface';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Input() option: IOption = { id: 0, option: '', isCorrect: false }; // Default value

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  deleteToken(id: number) {
    this.appService.deleteOptionById(id);
  }
}


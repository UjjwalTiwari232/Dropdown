import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { IOption } from '../shared/interface';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-option',
  template: `
    <div class="option">
      <div>
        <p>Option ID: {{ option.id }}</p>
        <input class="option-text" type="text" [(ngModel)]="option.option" placeholder="Enter Option" />
      </div>
      <div class="icons">
        <i class="fa-solid fa-location-dot"></i>
        <i class="fa-solid fa-trash" (click)="deleteToken(option.id)"></i>
        Delete
      </div>

      
      
    </div>
  `,styleUrls:['./option.component.css']
})
export class OptionComponent implements OnInit {
  optionsList:IOption[] = [];
  constructor(private  appService: AppService, viewRef: ViewContainerRef) {
    this.appService.viewRef = viewRef;
    
  }

  ngOnInit(): void {
    // this.optionsList = this.appService.getOptions();
  }
  @Input() option: IOption = { id: 0, option: '', isCorrect: false }; // Default value


  deleteToken(id:number){
    this.appService.deleteOptionById(id);
  }
}


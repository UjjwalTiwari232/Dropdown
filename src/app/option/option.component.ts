import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOption, IToken } from '../shared/interface';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  // optionsList: IOption[] = [];
  @Input() option!: IOption 
  @Input() optionList!: IOption[] 

  @Output() changesInOptionList: EventEmitter<IOption[]> = new EventEmitter<IOption[]>();
  // @Input()
  // token!: IToken;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // this.optionList = this.appService.getOptions();
  }

  deleteToken(id: number) {
    // this.appService.deleteOptionById(id);
    console.log("Length of List:" ,this.optionList.length);
    console.log("id of option to delete",id);
    
    this.optionList = this.optionList.filter(option => option.id !== id);
    this.optionList.forEach((value, index) => {
        value.id = index + 1;
    });
    this.changesInOptionList.emit(this.optionList)
    console.log("Length of List:" ,this.optionList.length);
    // console.log("id of option to delete",id);
  }

  addToken() {
    const newOption: IOption = {
      id: this.optionList.length + 1,
      option: '',
      isCorrect: false
    };

    // this.appService.addOption(newOption);
    // this.optionList = this.appService.getOptions(); // Refresh the options list
  }
}


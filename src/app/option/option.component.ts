import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOption, IToken } from '../shared/interface';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Input() option!: IOption 
  @Input() optionList!: IOption[] 

  @Output() changesInOptionList: EventEmitter<IOption[]> = new EventEmitter<IOption[]>();


  constructor(private appService: AppService) {}

  ngOnInit(): void {
 
  }

  deleteToken(id: number) {
    if(this.optionList.length>2){
      this.optionList = this.optionList.filter(option => option.id !== id);
      this.optionList.forEach((value, index) => {
          value.id = index + 1;
      });
      this.changesInOptionList.emit(this.optionList)

    }
    else{
      throw alert("There Should Atleat be Two Option for a Token")
    }

  }

  addToken() {
    const newOption: IOption = {
      id: this.optionList.length + 1,
      option: '',
      isCorrect: false
    };
  }
}


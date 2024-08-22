import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOption, IToken } from '../shared/interface';
import { AppService } from '../shared/DataService';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent  implements OnInit  {
  optionsList: IOption[] = [];


  @Input() token!: IToken;

  @Output() changesInToken: EventEmitter<IToken> = new EventEmitter<IToken>();

  constructor (private appService: AppService) {
    // console.log("Length of Token:" ,this.token.optionList.length);
    
  }

  ngOnInit(): void {
    // this.optionsList = this.appService.getOptions();
    // this.appService.options$.subscribe(options => {
    //   this.optionsList = options;
    // });
    
  }
  // addToken() {
    
  //   const newOption: IOption = {
  //     id: this.token.optionList.length + 1,
  //     option: '',
  //     isCorrect: false
  //   };
  //   this.token.optionList.push(newOption);
  //   console.log("Length of List:" ,this.token.optionList.length);
  //   // this.appService.addOption(newOption);
  // }
  addOptions() {
    
    const newOption: IOption = {
      id: this.token.optionList.length + 1,
      option: '',
      isCorrect: false
    };
    this.token.optionList.push(newOption);
    this.changesInToken.emit(this.token);
    console.log("Length of List:" ,this.token.optionList.length);
  }

  updateTheList(newOptionList:IOption[]){
    this.token.optionList = newOptionList;
    this.changesInToken.emit(this.token);
    console.log("send the Token",this.token.id," for updation");
    
  }
}

import { Component, Input, OnInit } from '@angular/core';
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


  @Input()
  token!: IToken;

  constructor (private appService: AppService) {
    // console.log("Length of Token:" ,this.token.optionList.length);
    
  }

  ngOnInit(): void {
    // this.optionsList = this.appService.getOptions();
    // this.appService.options$.subscribe(options => {
    //   this.optionsList = options;
    // });
    
  }
  addToken() {
    
    const newOption: IOption = {
      id: this.optionsList.length + 1,
      option: '',
      isCorrect: false
    };
    this.token.optionList.push(newOption);
    // this.appService.addOption(newOption);
  }

}

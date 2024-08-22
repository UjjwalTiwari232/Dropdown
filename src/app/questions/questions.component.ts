import { Component, OnInit } from '@angular/core';
import { IOption, IQuestions, IToken } from '../shared/interface';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  questionsList: IQuestions[] = [];
  optionsList: IOption[] = [];
  TokenList:IToken[] = [{
    id: 1,
    optionList: [{
      id:  1,
      option: '',
      isCorrect: false
    },{
      id: 2,
      option: '',
      isCorrect: false
    }]
  }];
  Tokens: string[] = ['Token1', 'Token2', 'Token3']; 
  correctOptionsCount = 1;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    console.log("Questions OnInit Called");

    this.questionsList = this.appService.getQuestions();
    this.appService.options$.subscribe(options => {
      this.optionsList = options;
    });
  }

  addQuestion() {
    const newQuestion: IQuestions = {
      id: this.questionsList.length + 1,
      Question: 'New Question', 
      OptionsList: [],
      CorrectOptionList: []
    };

    this.appService.addQuestion(newQuestion);
  }

  addToken() {
    const newToken: IToken = {
      id: this.TokenList.length + 1,
      optionList: [{
        id:  1,
        option: '',
        isCorrect: false
      },{
        id: 2,
        option: '',
        isCorrect: false
      }]
    };
    
    this.TokenList.push(newToken);
    console.log(this.TokenList.length);
  }

  addOptions(id:number) {
    
    const newOption: IOption = {
      id: this.optionsList.length + 1,
      option: '',
      isCorrect: false
    };
    this.TokenList.forEach((value, index) =>{
      if(value.id == id){
        value.optionList.push(newOption);
      }
    })
    // this.optionsList.push()
    // this.appService.addOption(newOption);
  }
  addAnotherCorrecOption(){
    this.correctOptionsCount++;
  }
}

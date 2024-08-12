

import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IOption, IQuestions } from '../shared/interface';
import { OptionsHostDirective } from './question.directive';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [AppService]
})
export class QuestionsComponent implements OnInit {

  questionsList: IQuestions[] = [];
  optionsList:IOption[] = [];
  Tokens: string[] = ['Token1', 'Token2', 'Token3']; // Example tokens

  constructor(private  appService: AppService, viewRef: ViewContainerRef) {
    this.appService.viewRef = viewRef;
    
  }

  ngOnInit(): void {
    
    this.appService.questionsList$.subscribe(questions => {
      this.questionsList = questions; 
    });
    this.appService.optionsList$.subscribe(options => {
      this.optionsList = options;
    });
    // localStorage.setItem("questionList",JSON.stringify(this.questionsList));
    // localStorage.setItem("optionList",JSON.stringify(this.optionsList));
    if(this.questionsList.length || this.questionsList.length==0){
       console.log(JSON.parse(localStorage.getItem("questionList")!));
    }
    if(this.optionsList.length || this.optionsList.length == 0){
      console.log(this.optionsList = JSON.parse(localStorage.getItem("optionList")!));
    }
  }
  


  addToken() {
    const newOption: IOption = {
      id: this.optionsList.length + 1,
      option: '',
      isCorrect: false
    };

   
    this.appService.addOption(newOption);
    
    
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
}

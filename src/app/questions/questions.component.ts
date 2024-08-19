

// import { ChangeDetectorRef,ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
// import { IOption, IQuestions } from '../shared/interface';
// import { OptionsHostDirective } from './question.directive';
// import { AppService } from '../shared/DataService';


// @Component({
//   selector: 'app-questions',
//   templateUrl: './questions.component.html',
//   styleUrls: ['./questions.component.css'],
//   providers: [AppService],
// })
// export class QuestionsComponent implements OnInit {
  
//   questionsList: IQuestions[] = [];
//   optionsList:IOption[] = [];
//   Tokens: string[] = ['Token1', 'Token2', 'Token3']; // Example tokens

//   constructor(private  appService: AppService, viewRef: ViewContainerRef) {
//     this.appService.viewRef = viewRef;
//     console.log("question constructor called");
//   }

//   ngOnInit(): void {
//     console.log("Question OnInit Called")
//     this.appService.questionsList$.subscribe(questions => {
//       this.questionsList = questions; 
//     });
//     this.appService.optionsList$.subscribe(options => {
//       this.optionsList = options;
//     });
//     if(this.questionsList.length || this.questionsList.length==0){
//        console.log(JSON.parse(localStorage.getItem("questionList")!));
//     }
//     if(this.optionsList.length || this.optionsList.length == 0){
//       console.log(this.optionsList = JSON.parse(localStorage.getItem("optionList")!));
//     }
//   }
  


//   addToken() {
//     const newOption: IOption = {
//       id: this.optionsList.length + 1,
//       option: '',
//       isCorrect: false
//     };

   
//     this.appService.addOption(newOption);
    
    
//   }

//   addQuestion() {
//     const newQuestion: IQuestions = {
//       id: this.questionsList.length + 1,
//       Question: 'New Question', 
//       OptionsList: [],
//       CorrectOptionList: []
//     };

   
//     this.appService.addQuestion(newQuestion);
    
    
//   }
// }


import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IOption, IQuestions } from '../shared/interface';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [AppService]
})
export class QuestionsComponent implements OnInit {
  
  questionsList: IQuestions[] = [];
  optionsList: IOption[] = [];
  Tokens: string[] = ['Token1', 'Token2', 'Token3']; // Example tokens

  constructor(private appService: AppService, private viewRef: ViewContainerRef) {
    // this.appService.viewRef = viewRef;
    console.log("Questions constructor called");
  }

  ngOnInit(): void {
    console.log("Questions OnInit Called");

    // Fetch current state from the service
    this.questionsList = this.appService.getQuestions();
    this.optionsList = this.appService.getOptions();
    
    // Check for existing localStorage data (if needed)
    // const storedQuestions = localStorage.getItem("questionList");
    // const storedOptions = localStorage.getItem("optionList");

    // if (storedQuestions) {
    //   this.questionsList = JSON.parse(storedQuestions);
    // }

    // if (storedOptions) {
    //   this.optionsList = JSON.parse(storedOptions);
    // }
  }

  addToken() {
    const newOption: IOption = {
      id: this.optionsList.length + 1,
      option: '',
      isCorrect: false
    };

    this.appService.addOption(newOption);
    this.optionsList = this.appService.getOptions(); // Refresh the options list
  }

  addQuestion() {
    const newQuestion: IQuestions = {
      id: this.questionsList.length + 1,
      Question: 'New Question', 
      OptionsList: [],
      CorrectOptionList: []
    };

    this.appService.addQuestion(newQuestion);
    this.questionsList = this.appService.getQuestions(); // Refresh the questions list
  }
}


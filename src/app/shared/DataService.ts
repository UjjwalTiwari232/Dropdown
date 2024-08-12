import { Injectable } from '@angular/core';
import { OptionComponent } from '../option/option.component';
import { ViewContainerRef } from '@angular/core';
import { IOption, IQuestions } from './interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {

    viewRef!: ViewContainerRef;

    private questionsListSubject = new BehaviorSubject<IQuestions[]>([]);
    private optionsListSubject = new BehaviorSubject<IOption[]>([]);
  
    questionsList$ = this.questionsListSubject.asObservable();
    optionsList$ = this.optionsListSubject.asObservable();
  
    addQuestion(question: IQuestions) {
        const currentQuestions = this.questionsListSubject.value;
        this.questionsListSubject.next([...currentQuestions, question]);
        localStorage.setItem("questionList",JSON.stringify(this.questionsListSubject.value));
    }
  
    addOption(option: IOption) {
        const currentOptions = this.optionsListSubject.value;
        this.optionsListSubject.next([...currentOptions, option]);
        localStorage.setItem("optionList",JSON.stringify(this.questionsListSubject.value));
    }

      // New method to delete an option by its ID
    deleteOptionById(id: number) {
        const currentOptions = this.optionsListSubject.value;
        const updatedOptions = currentOptions.filter(option => option.id !== id);
        this.optionsListSubject.next(updatedOptions);
        updatedOptions.forEach((value,index)=>{
            value.id = index+1;
        })
        localStorage.setItem("optionList",JSON.stringify(this.questionsListSubject.value));
    }

    createComponent() {
        this.viewRef.createComponent(OptionComponent);
    }


    // Method to get questions list
    // getQuestions(): IQuestions[] {
    //     return this.questionsList;
    // }

    // // Method to add a question
    // addQuestion(question: IQuestions) {
    //     this.questionsList.push(question);
    // }

    // Method to get options list
    // getOptions(): IOption[] {
    //     return this.optionsList;
    // }

    // Method to add an option
    // addOption(option: IOption) {
    //     this.optionsList.push(option);
    // }
}
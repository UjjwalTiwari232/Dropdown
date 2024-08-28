import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOption, IQuestions, IToken } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

    private questionsList: IQuestions[] = [];
    private optionsList: IOption[] = [{
        id:  1,
        option: '',
        isCorrect: false
      },{
        id: 2,
        option: '',
        isCorrect: false
      }];
    
    private optionsSubject = new BehaviorSubject<IOption[]>([]);
    options$ = this.optionsSubject.asObservable();

    constructor() {
        this.optionsSubject.next(this.optionsList); // Initialize subject with current options list
    }

    private TokenList:IToken[] = [];
    private question!:HTMLElement

    setTokenList(val:IToken[],val1:HTMLElement):void {
        this.TokenList = val;
        this.question = val1;
    }

    getQuestionElement():HTMLElement{
        return this.question;
    }
    getTokenList():IToken[]{
        return [...this.TokenList];
    }

    getQuestions(): IQuestions[] {
        return [...this.questionsList];
    }

    getOptions(): IOption[] {
        return [...this.optionsList];
    }

    addQuestion(question: IQuestions) {
        this.questionsList.push(question);
        
    }

    addOption(option: IOption) {
        this.optionsList.push(option);
        this.optionsSubject.next(this.optionsList); // Update the subject with new options list
        
    }

    deleteOptionById(id: number) {
        this.optionsList = this.optionsList.filter(option => option.id !== id);
        this.optionsList.forEach((value, index) => {
            value.id = index + 1;
        });
        this.optionsSubject.next(this.optionsList); 
        
    }

    updateOption(updatedOption: IOption) {
        const index = this.optionsList.findIndex(option => option.id === updatedOption.id);
        if (index !== -1) {
            this.optionsList[index] = updatedOption;
            this.optionsSubject.next(this.optionsList); 
            
        }
    }

   
}

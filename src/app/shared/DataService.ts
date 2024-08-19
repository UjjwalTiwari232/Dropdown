// import { Injectable } from '@angular/core';
// import { OptionComponent } from '../option/option.component';
// import { ViewContainerRef } from '@angular/core';
// import { IOption, IQuestions } from './interface';
// import { BehaviorSubject } from 'rxjs';

// @Injectable()
// export class AppService {

//     viewRef!: ViewContainerRef;

//     private questionsListSubject = new BehaviorSubject<IQuestions[]>([]);
//     private optionsListSubject = new BehaviorSubject<IOption[]>([]);
  
//     questionsList$ = this.questionsListSubject.asObservable();
//     optionsList$ = this.optionsListSubject.asObservable();
  
//     addQuestion(question: IQuestions) {
//         const currentQuestions = this.questionsListSubject.value;
//         this.questionsListSubject.next([...currentQuestions, question]);
//         // localStorage.setItem("questionList",JSON.stringify(this.questionsListSubject.value));
//     }
  
//     addOption(option: IOption) {
//         const currentOptions = this.optionsListSubject.value;
//         this.optionsListSubject.next([...currentOptions, option]);
//         // localStorage.setItem("optionList",JSON.stringify(this.questionsListSubject.value));
//     }

//       // New method to delete an option by its ID
//     deleteOptionById(id: number) {
//         const currentOptions = this.optionsListSubject.value;
//         const updatedOptions = currentOptions.filter(option => option.id !== id);
//         this.optionsListSubject.next(updatedOptions);
//         updatedOptions.forEach((value,index)=>{
//             value.id = index+1;
//         })
//         localStorage.setItem("optionList",JSON.stringify(this.questionsListSubject.value));
//     }

//     createComponent() {
//         this.viewRef.createComponent(OptionComponent);
//     }

//     updateOption(updatedOption:IOption){
//         const currentOptions = this.optionsListSubject.value;
        
//         for(let i = 0 ;i<currentOptions.length;i++){
//             if(currentOptions[i].id == updatedOption.id){
//                 currentOptions[i] = updatedOption;
//                 console.log("hello",currentOptions[i]);
//             }
//         }
//         this.optionsListSubject.next([...currentOptions]);
//         console.log(this.optionsListSubject.value);
//     }

//     // Method to get questions list
//     // getQuestions(): IQuestions[] {
//     //     return this.questionsList;
//     // }

//     // // Method to add a question
//     // addQuestion(question: IQuestions) {
//     //     this.questionsList.push(question);
//     // }

//     // Method to get options list
//     getOptions(): IOption[] {
//         return this.optionsListSubject.value;
//     }

//     // Method to add an option
//     // addOption(option: IOption) {
//     //     this.optionsList.push(option);
//     // }
// }
import { Injectable, ChangeDetectorRef } from '@angular/core';
import { IOption, IQuestions } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

    private questionsList: IQuestions[] = [];
    private optionsList: IOption[] = [];

    // Inject ChangeDetectorRef
    constructor(private cdr: ChangeDetectorRef) {}

    // Get a copy of the questions list
    getQuestions(): IQuestions[] {
        return [...this.questionsList];
    }

    // Get a copy of the options list
    getOptions(): IOption[] {
        return [...this.optionsList];
    }

    // Add a question
    addQuestion(question: IQuestions) {
        this.questionsList.push(question);
        this.triggerDataChange(); // Notify components of data change
    }

    // Add an option
    addOption(option: IOption) {
        this.optionsList.push(option);
        this.triggerDataChange(); // Notify components of data change
    }

    // Delete an option by its ID
    deleteOptionById(id: number) {
        this.optionsList = this.optionsList.filter(option => option.id !== id);
        // Optional: Reorder IDs if needed
        this.optionsList.forEach((value, index) => {
            value.id = index + 1;
        });
        this.triggerDataChange(); // Notify components of data change
    }

    // Update an option
    updateOption(updatedOption: IOption) {
        const index = this.optionsList.findIndex(option => option.id === updatedOption.id);
        if (index !== -1) {
            this.optionsList[index] = updatedOption;
            this.triggerDataChange(); // Notify components of data change
        }
    }

    // Manual change detection
    private triggerDataChange() {
        this.cdr.detectChanges();
    }
}


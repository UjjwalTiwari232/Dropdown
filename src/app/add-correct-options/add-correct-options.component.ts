// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { AppService } from '../shared/DataService';
// import { IOption, IToken } from '../shared/interface';

// @Component({
//   selector: 'app-add-correct-options',
//   templateUrl: './add-correct-options.component.html',
//   styleUrls: ['./add-correct-options.component.css']
// })
// export class AddCorrectOptionsComponent implements OnInit {
//   optionsList:string[] = ["Select"];

//   @Input() token!: IToken;

//   @Output() changesInToken: EventEmitter<IToken> = new EventEmitter<IToken>();

//   constructor(private appService:AppService) {    
//   }

//   ngOnInit(): void {
 
//     this.token.optionList.forEach(element => {
//       this.optionsList.push(element.option);
//     }); 
//   }

// }
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppService } from '../shared/DataService';
import { IOption, IToken } from '../shared/interface';

@Component({
  selector: 'app-add-correct-options',
  templateUrl: './add-correct-options.component.html',
  styleUrls: ['./add-correct-options.component.css']
})
export class AddCorrectOptionsComponent implements OnChanges {
  optionsList: string[] = [];
  selectedOption: string = '';

  @Input() token!: IToken;

  @Output() changesInToken: EventEmitter<IToken> = new EventEmitter<IToken>();

  constructor(private appService: AppService) {    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['token']) {
     
      
      this.updateOptionsList();
    }
  }

  updateOptionsList(): void {
    if (this.token && this.token.optionList) {
      this.optionsList = ["Select"];  // Reset options list
      this.token.optionList.forEach(element => {
        this.optionsList.push(element.option);
      });
    }
  }

  onOptionChange(event: any) {
    const selectedOption = event.target.options[event.target.selectedIndex].value;
    let targetIndex = event.target.selectedIndex ;
    if(targetIndex === 0 ){
      this.selectedOption = 'Select';
      
    }
    // else{
    
    this.token.optionList.forEach( (value,index) => {
      if(value.isCorrect && value.id !== targetIndex){
        value.isCorrect = false;
      }
      else if(value.id === targetIndex ){
        value.isCorrect = true;
        this.selectedOption = this.token.optionList[index].option;
      }
    })
    this.changesInToken.emit(this.token);

    }
  // }
  
}

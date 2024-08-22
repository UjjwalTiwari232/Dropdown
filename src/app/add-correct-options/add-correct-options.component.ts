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
  optionsList: string[] = ["Select"];
  selectedOption: string = '';

  @Input() token!: IToken;

  // @Output() changesInToken: EventEmitter<IToken> = new EventEmitter<IToken>();

  constructor(private appService: AppService) {    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['token']) {
      console.log("Hellowwwwwwwwwwwwwwwwww");
      
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

  onOptionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;

    console.log("Selected Value", this.selectedOption);
    
    // Emit changes if needed
    // this.changesInToken.emit(this.token);
  }
}

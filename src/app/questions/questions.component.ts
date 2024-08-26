import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IOption, IQuestions, IToken } from '../shared/interface';
import { AppService } from '../shared/DataService';
import { verifyHostBindings } from '@angular/compiler';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  questionsList: IQuestions[] = [];
  
  optionsList: IOption[] = [];
  questionString: string = 'Enter the Question';
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
  isFocused :boolean = false;
  isFocusedButton :boolean = false;
  correctOptionsCount = 1;
  @ViewChild('input')input!: ElementRef;
  @Input() token!: IToken;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    console.log("Questions OnInit Called");
  }

  onFocus() {
    this.isFocused = true;
    this.isFocusedButton = false; 
 
  }

  onFocusButton() {
    this.isFocusedButton = true;

  }

  onBlur() {
    setTimeout(() => {
      if (!this.isFocusedButton) {
        this.isFocused = false;
      }
    }, 0);
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
    
  }


  updateTheList(updatedToken:IToken){
    this.TokenList.forEach( (value,index) =>{
      if(value.id === updatedToken.id){
        value.optionList = updatedToken.optionList;
        console.log("Token",updatedToken.id,"is updated and has OptionList length of",value.optionList);
      }
    });
  }




  // ngAfterViewInit() {
  //   // Attach the keydown listener to handle backspace
  //   this.input.nativeElement.addEventListener('keydown', this.handleKeydown.bind(this));
  // }

 
  
  addText() {
    const el = this.input.nativeElement;
    const sel = window.getSelection();
  
    if (!sel || sel.rangeCount === 0) return;
  
    const range = sel.getRangeAt(0);
    console.log(el.innerHTML);
    // Create the new span element with non-editable styles
    const span = document.createElement('span');
    span.style.backgroundColor = '#f0f0f0';
    span.style.border = '1px solid #ccc';
    span.style.padding = '2px 4px';
    span.style.margin = '2px';
    span.style.cursor = 'pointer';
    span.textContent = 'Token';
  
    // Make the span non-editable
    span.setAttribute('contenteditable', 'false');
  
    // inserting the Token 
    range.deleteContents(); // if any text selected Removing that  
    range.insertNode(span);
  
    // moving the cursor to the end of the newly inserted Token
    range.setStartAfter(span);
    range.collapse(true);
  
    // final updation
    sel.removeAllRanges();
    sel.addRange(range);
  }
  

  // handleKeydown(event: KeyboardEvent) {
  //   if (event.key === 'Backspace') {
  //     const sel = window.getSelection();
  //     if (!sel || sel.rangeCount === 0) return;

  //     const range = sel.getRangeAt(0);
  //     const startNode = range.startContainer;
  //     const parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode as HTMLElement : startNode as HTMLElement;

  //     // Handle backspace at the beginning of a Token-text span
  //     if (parentElement && parentElement.classList.contains('Token-text') && range.startOffset === 0) {
  //       parentElement.remove();
  //       event.preventDefault(); // Prevent default backspace action
  //     } else {
  //       // Handle cursor directly before or at the end of a Token-text span
  //       const previousNode = range.startContainer.previousSibling as HTMLElement;
  //       if (previousNode && previousNode.classList.contains('Token-text')) {
  //         previousNode.remove();
  //         event.preventDefault(); // Prevent default backspace action
  //       }
  //     }
  //   }
  // }
}

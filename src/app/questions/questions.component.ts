import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IOption, IQuestions, IToken } from '../shared/interface';
import { AppService } from '../shared/DataService';
import { verifyHostBindings } from '@angular/compiler';
import { event } from 'jquery';
import { elementAt } from 'rxjs';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { NonNullableFormBuilder } from '@angular/forms';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionsList: IQuestions[] = [];

  optionsList: IOption[] = [];
  questionString: string = 'Enter the Question';
  TokenElement: number[] = [];
  TokenList: IToken[] = [{
    id: 1,
    pos: 1,
    optionList: [ {
      id: 1,
      option: '',
      isCorrect: false
    },
    {
      id: 2,
      option: '',
      isCorrect: false
    }
  ]}];
  isFocused: boolean = false;
  isFocusedButton: boolean = false;
  correctOptionsCount = 1;
  daalnakuch?: HTMLElement[];
  @ViewChild('input') input!: ElementRef;
  @ViewChild('data-id') span!: ElementRef;
  @Input() token!: IToken;
  private spanTokeSelected!:HTMLElement;
  // editor: EditorC;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
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
      pos: this.TokenList.length + 1,
      optionList: [{
        id: 1,
        option: '',
        isCorrect: false
      },
      {
        id: 2,
        option: '',
        isCorrect: false
      }
    ]
    };

    this.TokenList.push(newToken);
  }

  addOptions(id: number) {

    const newOption: IOption = {
      id: this.optionsList.length + 1,
      option: '',
      isCorrect: false
    };
    this.TokenList.forEach((value, index) => {
      if (value.id == id) {
        value.optionList.push(newOption);
      }
    })

  }


  updateTheList(updatedToken: IToken) {
    this.TokenList.forEach((value, index) => {
      if (value.id === updatedToken.id) {
        value.optionList = updatedToken.optionList;
      }
    });
  }




  ngAfterViewInit() {
    // Attach the keydown listener to handle backspace
    this.input.nativeElement.addEventListener('keydown', this.handleKeydown.bind(this));

    this.input.nativeElement.addEventListener('click', this.handleClick.bind(this));
  }


  addText() {
    const el = this.input.nativeElement;
    const sel = window.getSelection();

    if (!sel || sel.rangeCount === 0) return;

    
    const range = sel.getRangeAt(0);
    if((range.startContainer.parentElement?.className !== 'input-question') && (range.startContainer.parentElement?.className !== 'input-div') )  {
      
      return ;
    } 
    if((range.commonAncestorContainer.parentElement?.className!='input-question')  && (range.commonAncestorContainer.parentElement?.className!='input-div')) return; 

    // Create the new span element with non-editable styles
    const span = document.createElement('span');
    span.style.backgroundColor = '#f0f0f0';
    span.style.border = '1px solid #ccc';
    span.style.padding = '2px 4px';
    span.style.margin = '4px';
    span.style.cursor = 'pointer';
    span.textContent = 'Token';
    span.className = 'span-token';
    span.setAttribute('contentEditable', 'false');

    let currentToken = 0;
    // Add identifier to the span
    if (this.TokenList.length === 1 && this.TokenElement.length === 0) {
        currentToken = this.TokenList[0].id;
    } else {
        currentToken = this.TokenList.length + 1;
        this.addToken();
    }

    span.setAttribute('data-id', currentToken.toString());
    this.TokenElement.push(currentToken);

    // Inserting the Token
    range.deleteContents(); // if any text selected, remove it
    range.insertNode(span);


    // Move the cursor to the end of the newly inserted Token
    range.setStartAfter(span);
    range.collapse(true);

    // Final update
    sel.removeAllRanges();
    sel.addRange(range);

    const paragraph = this.input.nativeElement as HTMLElement;
    this.daalnakuch = [...Array.from(paragraph.children)] as HTMLElement[];
}




checkIfCorrrectOptionAdded():boolean{
  let outList = this.TokenList;
  for(let j=0;j<outList.length;j++){
    let anyoneselected = false;
    let list = outList[j].optionList;
    for(let i=0;i<list.length;i++){
      
      if(list[i].isCorrect){
        anyoneselected = true;
        break;
      }
    }
    if(anyoneselected === false){
      return true;
    }
  }
  return false;

}




  handleClick(event:MouseEvent){;
    const target = event.target as HTMLElement; // Cast target to HTMLElement
    this.isFocused = false;
    this.isFocusedButton = false;
    if(this.spanTokeSelected){

      this.spanTokeSelected.style.border = '1px solid white';
    }
    if(target.className === 'input-div'){
      this.isFocused = true;
      this.isFocusedButton = false; 
    }
    if(target.className === 'span-token'){
      this.isFocused = false;
      this.isFocusedButton = false;  
      
      target.style.border = '1px solid #FFA500'
      this.spanTokeSelected = target;
    }
    

  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const startContainer = range.startContainer;
      const findClosestTokenInParagraph = (paragraph: HTMLElement): number | null => {

        let deletedArray = paragraph.children;
        let originalArray = this.daalnakuch;
        for(let i=0;i<originalArray!.length;i++){
          let notFound = true;
          for(let j=0;j<deletedArray.length;j++){
            if(deletedArray[j].getAttribute('data-id') === originalArray![i].getAttribute('data-id')){
              notFound = false;
              break;
            }
          }
          if(notFound) return parseInt(originalArray![i].getAttribute('data-id')!);
        }
        return null;
      };

      // Find the paragraph element containing the selection
      const paragraph = this.input.nativeElement as HTMLElement;

      setTimeout(() => {
        const tokenId = findClosestTokenInParagraph(paragraph);
        if (tokenId) {
          this.TokenElement = this.TokenElement.filter(token => token !== tokenId)
          if(this.TokenList.length === 1){
            this.TokenList[0].optionList = [ {
              id: 1,
              option: '',
              isCorrect: false
            },
            {
              id: 2,
              option: '',
              isCorrect: false
            }
          ]
          }else{
            this.TokenList = this.TokenList.filter(token => token.id !== tokenId);
  
            this.TokenList.forEach((value, index) => {
              value.pos = index + 1;
            });

          }
          const paragraph = this.input.nativeElement as HTMLElement;
          this.daalnakuch = [...Array.from(paragraph.children)] as HTMLElement[];
          event.preventDefault();
        }
      },)

    }
  }

  saveData(){
    const paragraph = this.input.nativeElement as HTMLElement;
    if(this.TokenElement.length === 0 ){
      throw alert("Add Aleast One Token")
    }
    this.appService.setTokenList(this.TokenList,paragraph);
  }

}

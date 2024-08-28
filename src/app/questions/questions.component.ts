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
  TokenList: IToken[] = [];
  isFocused: boolean = false;
  isFocusedButton: boolean = false;
  correctOptionsCount = 1;
  daalnakuch?: HTMLElement[];
  @ViewChild('input') input!: ElementRef;
  @ViewChild('data-id') span!: ElementRef;
  @Input() token!: IToken;
  // editor: EditorC;
  constructor(private appService: AppService) { }

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
      pos: this.TokenList.length + 1,
      optionList: [{
        id: 1,
        option: '',
        isCorrect: false
      }, {
        id: 2,
        option: '',
        isCorrect: false
      }]
    };

    this.TokenList.push(newToken);
    console.log(this.TokenList.length);
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
        console.log("Token", updatedToken.id, "is updated and has OptionList length of", value.optionList);
      }
    });
  }




  ngAfterViewInit() {
    // Attach the keydown listener to handle backspace
    this.input.nativeElement.addEventListener('keydown', this.handleKeydown.bind(this));
  }



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

    // Add identifier to the span
    const currentToken = this.TokenList.length + 1;
    span.setAttribute('data-id', currentToken.toString());

    // this.TokenElement.push(currentToken.id);

    // inserting the Token 
    range.deleteContents(); // if any text selected Removing that  
    range.insertNode(span);

    // moving the cursor to the end of the newly inserted Token
    range.setStartAfter(span);
    range.collapse(true);

    // final updation
    sel.removeAllRanges();
    sel.addRange(range);

    const paragraph = this.input.nativeElement as HTMLElement;
    this.daalnakuch = [...Array.from(paragraph.children)] as HTMLElement[];
    // this.daalnakuch.
    console.log("out", this.daalnakuch);

    this.addToken();
  }
  

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const startContainer = range.startContainer;
      const findClosestTokenInParagraph = (paragraph: HTMLElement): number | null => {

        console.log("test", paragraph, paragraph.children);
        console.log("before timeout: ", this.daalnakuch![this.daalnakuch!.length-1].getAttribute('data-id')!);
        let deletedArray = paragraph.children;
        let originalArray = this.daalnakuch;
        // console.log("yoooooooooooo",deletedArray,originalArray)
        for(let i=0;i<originalArray!.length;i++){
          let notFound = true;
          for(let j=0;j<deletedArray.length;j++){
            // console.log("yoooooooooooo",deletedArray[j].getAttribute('data-id') , originalArray![i].getAttribute('data-id'));
            if(deletedArray[j].getAttribute('data-id') === originalArray![i].getAttribute('data-id')){
              notFound = false;
              // console.log("insideLoop",deletedArray[j].getAttribute('data-id') , originalArray![i].getAttribute('data-id'));
              break;
            }
          }
          if(notFound) return parseInt(originalArray![i].getAttribute('data-id')!);
        }

        return null;

      };

      // Find the paragraph element containing the selection
      const paragraph = this.input.nativeElement as HTMLElement;
      // const beforeTImeout = [...paragraph.children];
      setTimeout(() => {
        // Find the closest token element within the paragraph
        const tokenId = findClosestTokenInParagraph(paragraph);
        console.log(tokenId);
        if (tokenId) {
          // const tokenId = parseInt(tokenElement.getAttribute('data-id')!);
          console.log("id that we are getting", tokenId);


          // Remove the token from TokenList
          // console.log(this.TokenList);
          
          this.TokenList = this.TokenList.filter(token => token.id !== tokenId);
          //reset the id's for better UI
          this.TokenList.forEach((value, index) => {
            value.pos = index + 1;
          });
          const paragraph = this.input.nativeElement as HTMLElement;
          this.daalnakuch = [...Array.from(paragraph.children)] as HTMLElement[];
          // for(let i = 0;i<paragraph.children.length;i++){

          //   paragraph.children[i].setAttribute('data-id', i.toString()+1);

          // }
          // Remove the element from the DOM
          // tokenElement.remove();

          // Prevent default Backspace behavior
          event.preventDefault();

          console.log(`Token with ID ${tokenId} removed from list`);

        }
      },)

    }
  }

  saveData(){
    const paragraph = this.input.nativeElement as HTMLElement;
    console.log(paragraph)
    this.appService.setTokenList(this.TokenList,paragraph);
  }

}

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
    optionList: [{
      id: 1,
      option: 'Select',
      isCorrect: false
    }, {
      id: 2,
      option: '',
      isCorrect: false
    },
    {
      id: 3,
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
        option: 'Select',
        isCorrect: false
      }, {
        id: 2,
        option: '',
        isCorrect: false
      },
      {
        id: 3,
        option: '',
        isCorrect: false
      }
    ]
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

    this.input.nativeElement.addEventListener('click', this.handleClick.bind(this));
  }









//   addText() {
//     const el = this.input.nativeElement;
//     const sel = window.getSelection();
  
//     if (!sel || sel.rangeCount === 0) return;
    
//     const range = sel.getRangeAt(0);
    
//     // Check if the cursor is within an element with className "input-div"
//     if (!this.isCursorInInputDiv(range)) {
//       console.log('Cursor is not in an element with className "input-div".');
//       return;
//     }
    
//     console.log("Range", range, sel);
//     console.log(el.innerHTML);
    
//     // Create the new span element with non-clickable styles
//     const span = document.createElement('span');
//     span.style.backgroundColor = '#f0f0f0';
//     span.style.border = '1px solid #ccc';
//     span.style.padding = '2px 4px';
//     span.style.margin = '6px';
//     span.style.cursor = 'not-allowed';
//     span.style.pointerEvents = 'none'; // Make the span non-clickable
//     // span.style.userSelect ='none'
//     span.className = 'span-token'
//     span.textContent = 'Token';
//     span.setAttribute('contentEditable', 'false');
//     span.setAttribute('disabled', 'true');
//     // span.setAttribute('tabIndex','-1');
//     let currentToken = 0;
    
//     // Add identifier to the span
//     if (this.TokenList.length === 1 && this.TokenElement.length === 0) {
//       currentToken = this.TokenList[0].id;
//     } else {
//       currentToken = this.TokenList.length + 1;
//       this.addToken();
//     }
    
//     span.setAttribute('data-id', currentToken.toString());
//     this.TokenElement.push(currentToken);
    
//     // Insert the Token
//     range.deleteContents(); // Remove any selected text
//     range.insertNode(span);
    
//     // Move the cursor to the end of the newly inserted Token
//     range.setStartAfter(span);
//     // range.collapse(true);
    
//     // Final update
//     sel.removeAllRanges();
//     sel.addRange(range);
    
//     const paragraph = this.input.nativeElement as HTMLElement;
//     this.daalnakuch = [...Array.from(paragraph.children)] as HTMLElement[];
//     console.log("out", this.daalnakuch);
//   }
  
// // Function to check if the cursor is within an element with className "input-div"
// isCursorInInputDiv(range: Range): boolean {
//   let container: Node | null = range.startContainer;

//   while (container) {
//     const element = container as HTMLElement;
//     if (container.nodeType === Node.ELEMENT_NODE) {
//       if (element.classList.contains('input-div')) {
//         return true;
//       }
//     }
//     container = element.parentElement ?? null; // Explicitly handle potential null value
//   }

//   return false;
// }


  













  // addText() {
  //   const el = this.input.nativeElement;
  //   const sel = window.getSelection();

  //   if (!sel || sel.rangeCount === 0) return;
    
  //   const range = sel.getRangeAt(0);
  //   // if(range.startContainer.parentElement?.className !== 'input-div') return;
  //   console.log("Range",range,sel);
    

  //   console.log(el.innerHTML);
  //   // Create the new span element with non-editable styles
  //   const span = document.createElement('span');
  //   span.style.backgroundColor = '#f0f0f0';
  //   span.style.border = '1px solid #ccc';
  //   span.style.padding = '2px 4px';
  //   span.style.margin = '2px';
  //   span.style.cursor = 'pointer';
  //   span.textContent = 'Token';
  //   span.className = 'span-token'
  //   span.setAttribute('contentEditable', 'false');
   
  //   let currentToken = 0
  //   // Add identifier to the span
  //   if(this.TokenList.length === 1 && this.TokenElement.length===0){
  //     currentToken = this.TokenList[0].id;

  //   }
  //   else{
  //     currentToken = this.TokenList.length + 1;
  //     this.addToken();
  //   }
    
  //   span.setAttribute('data-id', currentToken.toString());

  //   this.TokenElement.push(currentToken);

  //   // inserting the Token 
  //   range.deleteContents(); // if any text selected Removing that  
  //   range.insertNode(span);

 
    
    

  //   // moving the cursor to the end of the newly inserted Token
  //   range.setStartAfter(span);
    
  //   range.collapse(true);

  //   // final updation
  //   sel.removeAllRanges();
  //   sel.addRange(range);

  //   const paragraph = this.input.nativeElement as HTMLElement;
  //   this.daalnakuch = [...Array.from(paragraph.children)] as HTMLElement[];

    
    
  // }
  


  addText() {
    const el = this.input.nativeElement;
    const sel = window.getSelection();

    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    // if(range.startContainer.parentElement?.className !== 'input-div') return;
    console.log("Range", range, sel);

    console.log(el.innerHTML);

    // Create the new span element with non-editable styles
    const span = document.createElement('span');
    span.style.backgroundColor = '#f0f0f0';
    span.style.border = '1px solid #ccc';
    span.style.padding = '2px 4px';
    span.style.margin = '2px';
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

    // Create and insert a non-breaking space or a regular text node for extra space
    const extraSpace = document.createTextNode(' '); // or use '\u00A0' for non-breaking space
    range.insertNode(extraSpace);

    // Move the cursor to the end of the newly inserted Token
    range.setStartAfter(extraSpace);
    range.collapse(true);

    // Final update
    sel.removeAllRanges();
    sel.addRange(range);

    const paragraph = this.input.nativeElement as HTMLElement;
    this.daalnakuch = [...Array.from(paragraph.children)] as HTMLElement[];
}









  handleClick(event:MouseEvent){
    // console.log("click kiya lavda",event.target);
    const target = event.target as HTMLElement; // Cast target to HTMLElement
  
    // if (target) { // Ensure target is not null
    //   console.log("Clicked element class name:", target.className);
    // } else {
    //   console.log("Clicked element is null.");
    // }
    if(target.className === 'span-token'){
      this.isFocused = false;
      this.isFocusedButton = false;  
      
    }
    

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

      setTimeout(() => {

        const tokenId = findClosestTokenInParagraph(paragraph);
        console.log(tokenId);
        if (tokenId) {
          console.log("id that we are getting", tokenId);
          this.TokenElement = this.TokenElement.filter(token => token !== tokenId)
          if(this.TokenList.length === 1){
            this.TokenList[0].optionList = [{
              id: 1,
              option: 'Select',
              isCorrect: false
            }, {
              id: 2,
              option: '',
              isCorrect: false
            },
            {
              id: 3,
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

          console.log(`Token with ID ${tokenId} removed from list`);

        }
      },)

    }
  }

  saveData(){
    console.log("clicked");
    const paragraph = this.input.nativeElement as HTMLElement;
    console.log(paragraph)
    if(this.TokenElement.length === 0 ){
      throw alert("Add Aleast One Token")
    }
    this.appService.setTokenList(this.TokenList,paragraph);
  }

}

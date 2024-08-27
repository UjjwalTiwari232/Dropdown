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
  TokenElement:number[] = [];
  TokenList:IToken[] = [];
  isFocused :boolean = false;
  isFocusedButton :boolean = false;
  correctOptionsCount = 1;
  daalnakuch? : HTMLElement; 
  @ViewChild('input')input!: ElementRef;
  @ViewChild('data-id')span!: ElementRef;
  @Input() token!: IToken;
  // editor: EditorC;
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
  addToken(pos:number) {
    const newToken: IToken = {
      id: this.TokenList.length + 1,
      pos:pos,
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
    this.daalnakuch = paragraph;
    // this.daalnakuch.
    console.log("out",this.daalnakuch);
    
    this.addToken(this.getCursorPosition());
  }
   // Method to get the cursor position
   getCursorPosition(): number {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    const { startOffset, endOffset } = range;
    const startContainer = range.startContainer as HTMLElement;

    const cursorPosition = {
      startContainer,
      startOffset,
      endOffset
    };

    console.log('Cursor Position:', cursorPosition);
    return startOffset;
  }
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      // public getCursorPosition() {
        // const cursorPosition = this.input.nativeElement.;
      // }
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      
      const range = sel.getRangeAt(0);
      const startContainer = range.startContainer;
  
      const findClosestTokenInParagraph = (paragraph: HTMLElement): HTMLElement | null => {
        console.log("test",paragraph,this.getCursorPosition() ,paragraph.children.length);
        if(paragraph.children.length<=0) return null;
        let cnt:number = 0;
        let child =null;
        console.log("para: ",paragraph.innerHTML);
        let temp = paragraph.children;
        for(let i = 0;i<temp.length-1;i++){
          let id:number = parseInt( temp[i].getAttribute('data-id')!)
          console.log("count",cnt,"id",id,"children",paragraph);
          if(cnt+1 !== id){
            child = temp[i]
            break
          }
          else{
            cnt += 1;

          }
         
        }
        // console.log(child);
        const element = child as HTMLElement;
        console.log(element);
        // console.log(this.daalnakuch);
        
        if (element.tagName === 'SPAN' && element.hasAttribute('data-id')) {
          
          return element;
        }
     
  
        return null;
      };
  
      // Find the paragraph element containing the selection
      const paragraph = this.input.nativeElement as HTMLElement;
      console.log("new",paragraph,"prev",this.daalnakuch);
      
      // Find the closest token element within the paragraph
      const tokenElement = findClosestTokenInParagraph(paragraph);
      console.log(tokenElement);
      
      if (tokenElement) {
        const tokenId = parseInt(tokenElement.getAttribute('data-id')!, 10);
        console.log("id that we are getting",tokenId);
        
  
        // Remove the token from TokenList
        this.TokenList = this.TokenList.filter(token => token.id !== tokenId);
        //reset the id's for better UI
        this.TokenList.forEach((value, index) => {
          value.id = index + 1;
        });
        for(let i = 0;i<paragraph.children.length;i++){
          
          paragraph.children[i].setAttribute('data-id', i.toString());
          
        }
        // Remove the element from the DOM
        tokenElement.remove();
  
        // Prevent default Backspace behavior
        event.preventDefault();
  
        console.log(`Token with ID ${tokenId} removed from list`);
        
      }
    }
  }
  
  
  
}

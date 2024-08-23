import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IOption, IQuestions, IToken } from '../shared/interface';
import { AppService } from '../shared/DataService';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  questionsList: IQuestions[] = [];
  questionString:String=""
  optionsList: IOption[] = [];
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
  showButton:boolean = false;
  correctOptionsCount = 1;
  @ViewChild('input')input!: ElementRef;
  @Input() token!: IToken;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    console.log("Questions OnInit Called");


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

  // addText(){
  //   this.input.nativeElement.focus();
  //   // let startPos = this.input.nativeElement.selectionStart;
  //   let startPos = window.getSelection()!.getRangeAt(0).startOffset;
  //   let value = this.input.nativeElement.innerHTML;
  //   console.log(startPos,this.input.nativeElement.innerHTML);
  //   let prevText = "";
  //   let afterText = "";
  //   for(let i = 0 ;i<startPos;i++){
  //     prevText += value[i];
  //   }
  //   for(let i=startPos;i<value.length;i++){
  //     afterText += value[i];
  //   }
  //   console.log(prevText,afterText);
    
  //   this.input.nativeElement.innerHTML = value.substring(0, startPos) + `<span class="Token-text">I am inserted</span>`+ value.substring(startPos, value.length)
   
  // }


  ngAfterViewInit() {
    // Attach the keydown listener to handle backspace
    this.input.nativeElement.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  addText() {
    const el = this.input.nativeElement;
    const sel = window.getSelection();

    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'Token-text';
    span.textContent = 'Token';

    // Insert the span at the current cursor position
    range.deleteContents(); // Remove any selected content
    range.insertNode(span);

    // Move cursor to the end of the inserted span
    range.setStartAfter(span);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const startNode = range.startContainer;
      const parentElement = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode as HTMLElement : startNode as HTMLElement;

      // Handle backspace at the beginning of a Token-text span
      if (parentElement && parentElement.classList.contains('Token-text') && range.startOffset === 0) {
        parentElement.remove();
        event.preventDefault(); // Prevent default backspace action
      } else {
        // Handle cursor directly before or at the end of a Token-text span
        const previousNode = range.startContainer.previousSibling as HTMLElement;
        if (previousNode && previousNode.classList.contains('Token-text')) {
          previousNode.remove();
          event.preventDefault(); // Prevent default backspace action
        }
      }
    }
  }
}

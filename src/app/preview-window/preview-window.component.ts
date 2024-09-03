import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AppService } from '../shared/DataService';
import { IOption, IToken } from '../shared/interface';
import { event } from 'jquery';

@Component({
  selector: 'app-preview-window',
  templateUrl: './preview-window.component.html',
  styleUrls: ['./preview-window.component.css']
})
export class PreviewWindowComponent implements OnInit {
  tokenList: IToken[] = [];
  @ViewChild('question') queston!: ElementRef;
  selectedOption: string = '';
  orginialQuestion = ''
  constructor(
    private appService: AppService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }


  
  ngOnInit(): void {
    // Fetch token list and question element
    this.tokenList = this.appService.getTokenList();
    let questionElement = this.appService.getQuestionElement();



    // Parse and modify HTML
    this.replaceSpansWithSelects(questionElement.innerHTML);
    this.orginialQuestion = questionElement.innerHTML;
  }

  replaceSpansWithSelects(htmlString: string): void {
    // Create a temporary container to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

      

    // Select all <span> elements
    const spanElements = doc.querySelectorAll('span');

    spanElements.forEach((span, index) => {
      // Create a <select> element
      const select = document.createElement('select');
      select.style.width = '135px';
      select.id = "select1";
      select.style.margin = '0px 5px 0px 5px'
      select.setAttribute('Token-index', index.toString());
      select.addEventListener('change', (event) => this.onSelected(event));
      // Add options to the <select> element
      const option = document.createElement('option');
      option.textContent = "Select";
      option.setAttribute("default","true");
      option.setAttribute("selection","disabled");
      option.setAttribute('option-index', '-1');
      select.appendChild(option);
      this.tokenList[index].optionList.forEach((token, index) => {

        const option = document.createElement('option');
        option.textContent = "";
        
        if (token.option != undefined && token.option != null) {
          option.textContent = token.option;
          option.value = token.option;
          option.setAttribute('option-index', token.id.toString());
          // option.value = token.id.toString();

        }
        // option.style.width = ''
        select.appendChild(option);
      });

      // Replace the <span> with <select>
      span.parentNode!.replaceChild(select, span);
    });

    // Update the view with modified HTML
    this.el.nativeElement.children[2].children[1].innerHTML += doc.body.innerHTML;
  }



  onSelected(event: Event): void {

    const selectElement = event.target as HTMLSelectElement;
    // Implement your handling logic here
  }

  tryAgain(){
    this.el.nativeElement.children[2].children[1].innerHTML = "";
  
    this.replaceSpansWithSelects(this.orginialQuestion);
  }

  checkAnswer() {
    // Get the 'queston' element
    const val = this.queston.nativeElement;

    // Create a temporary container to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(val.innerHTML, 'text/html')

    // Select all <select> elements
    const selectElements = document.querySelectorAll('select');

    selectElements.forEach((select) => {
      // Ensure `select` is properly cast

      
      const selectElement = select as HTMLSelectElement;

      // Get the selected value from the select element
      let ansValue = (select as HTMLSelectElement);


      // Find the token-index attribute
      const tokenIndexAttr = selectElement.getAttribute('token-index');
      const TokenId = tokenIndexAttr ? parseInt(tokenIndexAttr, 10) : -1;

      // Initialize variables for option ID
      let CorrectOptionId = -1;
      let WrongOptionId = -1;
      let selectedOptId = parseInt(ansValue.selectedOptions[0].attributes.getNamedItem('option-index')?.value!);
      
      // Loop through options to find the selected option ID
      this.tokenList[TokenId].optionList.forEach((option, i) => {
        if (option.id === selectedOptId && ansValue.value === option.option && option.isCorrect) {
          CorrectOptionId = i;
        }
        else if(option.id === selectedOptId && ansValue.value === option.option && !option.isCorrect){
          WrongOptionId = i;
        }
      });



      if (ansValue.value === 'Select') {
        alert("Select the Options First");
        return; // Exit the function if invalid
      }
      if(CorrectOptionId != -1){
        // Create a <div> to replace the <select> element
        const containerDiv = document.createElement('span');
        containerDiv.style.width = '135px';
        containerDiv.style.margin = '0px 5px 0px 5px';
        containerDiv.style.display = 'inline-flex';
  
        const checkIcon = document.createElement('span');
        checkIcon.innerHTML = '<i class="fa-solid fa-check" style="color: #ffffff;"></i>';
        checkIcon.style.background = '#035800';
        checkIcon.style.padding = '5px';
        checkIcon.style.alignItems = 'center'
        checkIcon.style.justifyContent = 'center'
        checkIcon.style.width = '30px';
  
        const optionSelected = document.createElement('span');
        optionSelected.textContent = this.tokenList[TokenId].optionList[CorrectOptionId].option;
        optionSelected.style.border = '1px solid #035800';
        optionSelected.style.padding = '5px';
        optionSelected.style.width = '105px';
        
  
        containerDiv.appendChild(optionSelected);
        containerDiv.appendChild(checkIcon);
  
        // Replace the <select> element with the new container
        select.parentNode!.replaceChild(containerDiv, select);


        //Another way to do the Same thing just We will Requried to store the List of the Span Avaiable in the Question
        // select.style.display = 'none'
        // let span = document.getElementsByClassName("main-answer-span") as HTMLSelectElement
        // span.style.display = 'inline-flex'
      }
      else if(WrongOptionId != -1){
        // // Create a <div> to replace the <select> element
        const containerDiv = document.createElement('span');
        containerDiv.style.width = '135px';
        containerDiv.style.margin = '0px 5px 0px 5px';
        containerDiv.style.display = 'inline-flex';
  
        const checkIcon = document.createElement('span');
        checkIcon.innerHTML = '<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>';
        checkIcon.style.background = '#f42020';
        checkIcon.style.padding = '5px';
        checkIcon.style.alignItems = 'center'
        checkIcon.style.justifyContent = 'center'
        checkIcon.style.width = '30px';
  
        const optionSelected = document.createElement('span');
        optionSelected.textContent = this.tokenList[TokenId].optionList[WrongOptionId].option;
        optionSelected.style.border = '1px solid #f42020';
        optionSelected.style.padding = '5px';
        optionSelected.style.width = '105px';
  
        containerDiv.appendChild(optionSelected);
        containerDiv.appendChild(checkIcon);
  
        // Replace the <select> element with the new container
        select.parentNode!.replaceChild(containerDiv, select);

        //Another way to do the Same thing just We will Requried to store the List of the Span Avaiable in the Question
        // select.style.display = 'none'
        // let span = document.getElementById("main-Wronganswer-span") as HTMLSelectElement
        // span.style.display = 'inline-flex'
      }
    });
  }
}



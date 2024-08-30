import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AppService } from '../shared/DataService';
import { IToken } from '../shared/interface';
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

  constructor(
    private appService: AppService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // Fetch token list and question element
    this.tokenList = this.appService.getTokenList();
    let questionElement = this.appService.getQuestionElement();

    // Log fetched data
    console.log(this.tokenList);
    console.log(questionElement);

    // Parse and modify HTML
    this.replaceSpansWithSelects(questionElement.innerHTML);
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
      select.id = "select";
      select.style.margin = '0px 5px 0px 5px'
      select.setAttribute('Token-index', index.toString());
      // select.addEventListener('click', this.onOptionChange.bind(this));
      // Add options to the <select> element
      this.tokenList[index].optionList.forEach((token, index) => {

        const option = document.createElement('option');
        option.textContent = "";
        if (token.option != undefined && token.option != null) {
          option.textContent = token.option;
          option.value = token.option;
          option.setAttribute('option-index', index.toString());
          // option.value = token.id.toString();

        }
        // option.style.width = ''
        select.appendChild(option);
      });

      // Replace the <span> with <select>
      span.parentNode!.replaceChild(select, span);
    });

    // Update the view with modified HTML
    console.log(this.el.nativeElement.children[2].children[1]);
    console.log(doc.body.innerHTML);
    this.el.nativeElement.children[2].children[1].innerHTML += doc.body.innerHTML;
  }






  //   checkAnswer() {
  //     // Get the 'queston' element
  //     const val = this.queston.nativeElement;

  //     // Get the 'ans' element
  //     const ansElement = document.getElementById("select");

  //     // Log the question element
  //     console.log("Question:", val, ansElement);

  //     // Create a temporary container to parse the HTML
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(val.innerHTML, 'text/html');

  //     // Select all <select> elements
  //     const selectElements = doc.querySelectorAll('select');



  //     selectElements.forEach((select, index) => {

  //       let ansValue = '';
  //       let TokenId = -1;
  //       let Option;
  //       let OptionId = -1;
  //       // console.log("position",select);
  //       // Check if 'ans' element exists
  //       // if (select) {
  //       //   // Cast ansElement to HTMLInputElement or HTMLSelectElement based on your use case
  //       // ansValue = (select as HTMLInputElement | HTMLSelectElement).value;
  //       setTimeout(() => {

  //         let temp = (select as HTMLInputElement | HTMLSelectElement);
  //         console.log("ZZZZZZZZZZZZ", temp);
  //         console.log("ZZZZZZZZZZZZval", temp.value);

  //       }, 0)

  //       ansValue = (select as HTMLInputElement | HTMLSelectElement).value;


  //       console.log("ansValue: ", ansValue);
  //       TokenId = parseInt((select as HTMLInputElement | HTMLSelectElement).getAttribute('token-index')!);
  //       Option = (select as HTMLInputElement | HTMLSelectElement).children;
  //       // console.log("Answer",Option,TokenId);

  //       for (let i = 0; i < Option.length; i++) {
  //         let a = (Option[i] as HTMLInputElement | HTMLSelectElement)
  //         if (a.value === ansValue) {
  //           OptionId = parseInt(a.getAttribute("option-index")!);
  //           break;
  //         }
  //       }
  //       // } 
  //       console.log("Answer:", ansValue, TokenId, OptionId);
  //       // else {
  //       //   console.log("Element with id 'ans' not found.");
  //       // }


  //       if (TokenId === -1 || OptionId === -1) {
  //         throw alert("Select the Options First")

  //       }


  //       // Get the selected value from the select element
  //       let selectedValue = ansValue;
  //       console.log("Selected Value:", selectedValue);
  //       // this.tokenList[0].optionList.forEach( (val,index) => {
  //       //   if()
  //       // })
  //       // Create a <div> to replace the <select> element
  //       const containerDiv = document.createElement('div');
  //       containerDiv.style.width = '135px';
  //       containerDiv.style.margin = '0px 5px 0px 5px';
  //       containerDiv.style.display = 'flex';

  //       const checkIcon = document.createElement('span');
  //       checkIcon.innerHTML = '<i class="fa-solid fa-check" style="color: #ffffff;"></i>';
  //       checkIcon.style.background = '#035800';
  //       checkIcon.style.padding = '5px';

  //       const optionSelected = document.createElement('p');
  //       optionSelected.textContent = this.tokenList[TokenId].optionList[OptionId].option;
  //       optionSelected.style.background = '#035800';
  //       optionSelected.style.padding = '5px';

  //       containerDiv.appendChild(optionSelected);
  //       containerDiv.appendChild(checkIcon);

  //       // Replace the <select> element with the new container
  //       select.parentNode!.replaceChild(optionSelected, select);
  //     });
  //   }
  // }



  checkAnswer() {
    // Get the 'queston' element
    const val = this.queston.nativeElement;

    // Create a temporary container to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(val.innerHTML, 'text/html');

    // Select all <select> elements
    const selectElements = doc.querySelectorAll('select');

    selectElements.forEach((select, index) => {
      // Ensure `select` is properly cast
      const selectElement = select as HTMLSelectElement;

      // Get the selected value from the select element
      const ansValue = selectElements[index].selectedOptions;
      console.log("ansValue: ", ansValue);

      // Find the token-index attribute
      const tokenIndexAttr = selectElement.getAttribute('token-index');
      const TokenId = tokenIndexAttr ? parseInt(tokenIndexAttr, 10) : -1;

      // Initialize variables for option ID
      let OptionId = -1;

      // // Loop through options to find the selected option ID
      // Array.from(selectElement.options).forEach((option, i) => {
      //   if (option.value === ansValue) {
      //     OptionId = i;
      //   }
      // });

      // console.log("Answer:", ansValue, TokenId, OptionId);

      // if (TokenId === -1 || OptionId === -1) {
      //   alert("Select the Options First");
      //   return; // Exit the function if invalid
      // }

      // // Create a <div> to replace the <select> element
      // const containerDiv = document.createElement('div');
      // containerDiv.style.width = '135px';
      // containerDiv.style.margin = '0px 5px 0px 5px';
      // containerDiv.style.display = 'flex';

      // const checkIcon = document.createElement('span');
      // checkIcon.innerHTML = '<i class="fa-solid fa-check" style="color: #ffffff;"></i>';
      // checkIcon.style.background = '#035800';
      // checkIcon.style.padding = '5px';

      // const optionSelected = document.createElement('p');
      // optionSelected.textContent = this.tokenList[TokenId].optionList[OptionId].option;
      // optionSelected.style.background = '#035800';
      // optionSelected.style.padding = '5px';

      // containerDiv.appendChild(optionSelected);
      // containerDiv.appendChild(checkIcon);

      // // Replace the <select> element with the new container
      // select.parentNode!.replaceChild(containerDiv, select);
    });
  }
}



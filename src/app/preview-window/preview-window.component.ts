import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AppService } from '../shared/DataService';
import { IToken } from '../shared/interface';

@Component({
  selector: 'app-preview-window',
  templateUrl: './preview-window.component.html',
  styleUrls: ['./preview-window.component.css']
})
export class PreviewWindowComponent implements OnInit {
  tokenList: IToken[] = [];
  
  constructor(
    private appService: AppService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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

    spanElements.forEach((span,index) => {
      // Create a <select> element
      const select = document.createElement('select');
      select.style.width = '135px';
      // Add options to the <select> element
      this.tokenList[index].optionList.forEach((token,index) => {
        
        const option = document.createElement('option');
        option.textContent = "";
        if(token.option != undefined && token.option != null) {
          option.textContent = token.option; // Assuming token.option contains the text for the option
          option.value = token.id.toString();

        }
        // option.style.width = ''
        select.appendChild(option);
      });

      // Replace the <span> with <select>
      span.parentNode!.replaceChild(select, span);
    });

    // Update the view with modified HTML
    console.log(this.el.nativeElement.children[2]);
    console.log(doc.body.innerHTML);
    this.el.nativeElement.children[2].innerHTML = doc.body.innerHTML;
  }
}

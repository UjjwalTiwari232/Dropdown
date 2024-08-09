import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  tokenId:number = 0;
  count:any[] = ["hello"];
  Tokens = ["Red","Purple","Black"];
  ngOnInit(): void {

    // throw new Error('Method not implemented.');
  }


  addToken(){
    this.count.push("hello");
  }
}

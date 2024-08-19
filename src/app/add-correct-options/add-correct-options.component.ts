import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/DataService';
import { IOption } from '../shared/interface';

@Component({
  selector: 'app-add-correct-options',
  templateUrl: './add-correct-options.component.html',
  styleUrls: ['./add-correct-options.component.css']
})
export class AddCorrectOptionsComponent implements OnInit {
  optionsList:IOption[] = [];
  constructor(private appService:AppService) {
    this.appService =appService;
  }

  ngOnInit(): void {
    // this.appService.optionsList$.subscribe(options =>{
      // this.optionsList = options;
    // })
  }

}

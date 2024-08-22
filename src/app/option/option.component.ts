import { Component, Input, OnInit } from '@angular/core';
import { IOption } from '../shared/interface';
import { AppService } from '../shared/DataService';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  optionsList: IOption[] = [];
  @Input() option: IOption = { id: 0, option: '', isCorrect: false }; // Default value

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.optionsList = this.appService.getOptions();
  }

  deleteToken(id: number) {
    this.appService.deleteOptionById(id);
    
  }

  addToken() {
    const newOption: IOption = {
      id: this.optionsList.length + 1,
      option: '',
      isCorrect: false
    };

    this.appService.addOption(newOption);
    this.optionsList = this.appService.getOptions(); // Refresh the options list
  }
}


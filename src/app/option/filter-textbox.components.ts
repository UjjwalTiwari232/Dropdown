import { Component, Input, OnInit } from "@angular/core";
import { AppService } from "../shared/DataService";
import { IOption } from "../shared/interface";

@Component({
    selector: 'filter-textbox',
    template: `
        
        <input type="text" [(ngModel)]="filter"/>
    `,
    styles:[`   
    input{
        width: 95%;
        height:35px;
        border: none;
        margin-left: 6px;
        }
    
    input:focus{
            border: none;
           
            border-bottom:1px solid black ;
            outline: none;
        }`]
})
export class FilterTextboxComponent implements OnInit {

    private _filter: string = "";

    @Input() get filter() {
        return this._filter;
    }

    set filter(val: string) {
        this._filter = val;
        this.option.option = val;
        this.appService.updateOption(this.option);
    }

    @Input() option: IOption = { id: 0, option: '', isCorrect: false }; // Default value

    constructor(private appService: AppService) {}

    ngOnInit(): void {}
}


import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppService } from "../shared/DataService";
import { IOption } from "../shared/interface";

@Component({
    selector:'filter-textbox',
    template:`
        <input type="text" [(ngModel)]="filter"/>
    `

})

export class FilterTextboxComponent implements OnInit{

    private _filter:string = "";
    @Input() get filter(){
        return this._filter;
    }

    set filter(val:string){
        this._filter = val;
        this.option.option = val;
        console.log(this.option);
        // this.changed.emit(this._filter); //Raise Change Event
        this.appService.updateOption(this.option)
    }

    @Input() option: IOption = { id: 0, option: '', isCorrect: false }; // Default value

    @Output() changed: EventEmitter<string> = new EventEmitter<string>();
    constructor( private appService: AppService ) {}

    ngOnInit(): void {
        
    }
}


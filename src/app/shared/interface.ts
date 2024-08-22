import { I18nPluralPipe } from "@angular/common";

export interface IQuestions{
    id: number;
    Question: string;
    OptionsList:IOption[];
    CorrectOptionList:IOption[];

}

export interface IOption{
    id:number;
    option:string;
    isCorrect:boolean;
}
export interface IToken{
    id:number;
    optionList:IOption[];
}
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Output() callBackData : EventEmitter<any> = new EventEmitter();
  constructor() { }
  src : string= ''

  callSearch(term: string): void{
    if (term.length > 2){
      this.callBackData.emit(term);
      console.log(term);
    }
    
  }

}

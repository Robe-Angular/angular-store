import { Component, OnInit, Output, EventEmitter, Input,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges {

  @Output() pageEmitt = new EventEmitter<number>();
  @Input() page: number;
  @Input() pagesChild: number;
  @Input() pageInitHalfChild: number;
  @Input() pageFinalHalfChild: number;
  public ellipses: Array<Boolean>;

  constructor() { 
    this.page = 1;
    this.pageInitHalfChild = 0;
    this.pageFinalHalfChild = 0;
    this.pagesChild = 0;
    this.ellipses = [];
  } 
  ngOnChanges(changes: SimpleChanges): void {
      this.checkSequence();
  }
  sendPage(page: number){
    this.pageEmitt.emit(page);
  }

  checkSequence(){
    console.log(this.page)

    let firstVisible = {
      visible: this.page != 1,
      value: 1
    };
    let initHalfVisible = {
      visible: this.page != this.pageInitHalfChild && 1 != this.pageInitHalfChild,
      value: this.pageInitHalfChild
    };
    let page = {
      visible: true,
      value: this.page
    };
    let finalHalfVisible = {
      visible: this.page != this.pageFinalHalfChild && this.pagesChild != this.pageFinalHalfChild,
      value: this.pageFinalHalfChild
    };
    let lastPageVisible = {
      visible: this.page != this.pagesChild,
      value: this.pagesChild
    };
    
    let pagesTargeted = [firstVisible, initHalfVisible, page ,finalHalfVisible, lastPageVisible];
    
    this.ellipses = [false,false,false,false]; // ellipses are ...
    let count = 0;//Count for index Ellipses array
    let firstValue = 0; //To compare between loops on forEach
    let secondValue = 0; //Íbidem

    pagesTargeted.forEach( target => {
      if(target.visible && firstValue == 0){
        firstValue = target.value;
      }else if(target.visible && firstValue != 0){
        secondValue = target.value;
        if(secondValue - 1 != firstValue){
          this.ellipses[count] = true;
        }
        firstValue = secondValue;
      }
      count += 1;     
    } );
  } //check consequence of numbers for ellipses

  ngOnInit(): void {
    this.checkSequence();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-models-boot',
  templateUrl: './models-boot.component.html',
  styleUrls: ['./models-boot.component.css']
})
export class ModelsBootComponent implements OnInit {
  public createModelStatus: string;
  constructor() { 
    this.createModelStatus = '';
  }

  ngOnInit(): void {
  }

  parentFeedback(feedback: string){
    if(feedback = 'create-model-boot-success'){
      this.createModelStatus = 'success';
    }
  }

}

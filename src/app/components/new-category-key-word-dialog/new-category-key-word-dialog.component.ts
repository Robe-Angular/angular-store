import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-category-key-word-dialog',
  templateUrl: './new-category-key-word-dialog.component.html',
  styleUrls: ['./new-category-key-word-dialog.component.css']
})
export class NewCategoryKeyWordDialogComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<NewCategoryKeyWordDialogComponent>
  ) { }

  ngOnInit(): void {
  }
  closeThisDialog(){
    this.dialogRef.close();
  }

}

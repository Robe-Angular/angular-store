import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../services/user.service';
import{ User } from '../../models/user'
import{ ConfirmationCodeUpdate } from '../../models/confirmationCodeUpdate'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-consumer-data',
  templateUrl: './consumer-data.component.html',
  styleUrls: ['./consumer-data.component.css'],
  providers: [UserService]
})
export class ConsumerDataComponent implements OnInit {
  public consumer: User;
  public confirmationCode: ConfirmationCodeUpdate;
  public token: any;
  public identity: any;
  public status: string;
  public isEdit: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute   
  ) {
    this.consumer = new User('', '', '', '', '', '', 'ROLE-USER','','',null);
    this.confirmationCode = new ConfirmationCodeUpdate('', '');
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.status = '';
    this.isEdit = false;
  }
  ngOnInit(): void {
    this.getParamsId();    
  }

  getConsumerData(){
    this._userService.getConsumerData(this.consumer._id, this.token.token).subscribe(
      response => {
        //identity
        if(response.status != Error){
          this.consumer = response.user;
          this.status = 'dataSuccess';
        }else{
          this.status = 'dataError';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }
  getParamsId(){
    this._route.params.subscribe(params => {
      let consumerId = params['consumerId'];
      this.consumer._id = consumerId;
      this.getConsumerData();
    });
  }
  editView(){
    this.isEdit = true;
  }

  consumerUpdated(response:any){
    this.status = response.status != Error ? 'success':'error';
    this.consumer = response.userUpdated;
    localStorage.setItem('token',JSON.stringify({token:response.token}));
    this.token = this._userService.getToken ();
    this.isEdit = false;
  }

  onSubmitUpdate(form:any){
   this._userService.update(this.token.token, this.consumer, this.consumer._id).subscribe(
     response =>{
      if(response.confirmationUpdateEmailStored){
        this.showSnackBar('se ha enviado un email','success');
        this.status = 'emailSuccess';
      }else{
        this.consumerUpdated(response);
        this.showSnackBar('se ha actualizado correctamente','success');
      }
      
      
     },
     error => {
      this.showSnackBar(error.error.message , 'error' );
    }
   );
  }

  onSubmitConfirmation(form:any){
    this._userService.confirmEmailUpdate(this.token.token, this.confirmationCode).subscribe(
      response => {
        this.consumerUpdated(response);
        this.showSnackBar('se ha actualizado correctamente','success');
      }, err => {
        
        this.showSnackBar(err.error.message , 'error' );
      }
    )
  }

  showSnackBar(snackBarText:string, status:string){
    if(status == 'error'){
      this._snackBar.open(snackBarText, ":)", {
        duration: 3000,
        panelClass: ['red-snackbar'],
        });
    }
    if(status == 'success'){
      this._snackBar.open(snackBarText, "ok", {
        
        panelClass: ['green-snackbar']
        });
    }
  }
  
}

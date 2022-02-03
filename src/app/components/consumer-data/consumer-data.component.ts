import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../services/user.service';
import{ User } from '../../models/user'
import{ ConfirmationCodeUpdate } from '../../models/confirmationCodeUpdate'

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
  public status: string;
  public isEdit: boolean;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute    
  ) {
    this.consumer = new User('', '', '', '', '', '', 'ROLE-USER','',null);
    this.confirmationCode = new ConfirmationCodeUpdate('', '');
    this.token = this._userService.getToken ();
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
          console.log(response);
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
        this.status = "emailSuccess";
      }else{
        this.consumerUpdated(response);
      }
      
      
     },
     error => {
      this.status = 'errorUserTaken'
      if(error.error.status != 409){
        this.status = 'error';
      }
    }
   );
  }

  onSubmitConfirmation(form:any){
    this._userService.confirmEmailUpdate(this.token.token, this.confirmationCode).subscribe(
      response => {
        this.consumerUpdated(response);
      }, err => {
        this.status = "noMatchCodeError"
      }
    )
  }
}

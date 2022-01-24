import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../services/user.service';
import{ User } from '../../models/user'

@Component({
  selector: 'app-consumer-data',
  templateUrl: './consumer-data.component.html',
  styleUrls: ['./consumer-data.component.css'],
  providers: [UserService]
})
export class ConsumerDataComponent implements OnInit {
  public consumer: User;
  public token: string;
  public status: string;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.consumer = new User('', '', '', '', '', '', 'ROLE-USER','',null);
    this.token = this._userService.getToken();
    this.status = '';
   }

  ngOnInit(): void {

  }
  getConsumerData(){
    this._userService.getConsumerData(this.consumer.id, this.token).subscribe(
      response => {
        //identity        
        if(response.status != Error){
          this.status = 'success';
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }
}

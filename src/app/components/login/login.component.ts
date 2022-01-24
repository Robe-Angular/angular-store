import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit{  
  public userLogin: User;
  public userRegister: User;
  public status:string;
  public token:any;
  public identity:any;
  public confirmPwd:string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.status = '';
    this.token = null;
    this.identity = null;
    this.userLogin = new User('', '', '','', '', '','ROLE-USER', '',null);
    this.userRegister = new User('', '', '', '', '', '', 'ROLE-USER','',null);
    this.confirmPwd = '';
  }

  ngOnInit(): void {
    //Se ejecuta siempre y cierra sesión sólo cuando le llega el parámetro action por la urL
    this.readParams();    
  }

  onSubmitLogin(form:any):void{
    this._userService.signup(this.userLogin).subscribe(
      response => {
        
        //identity        
        if(response.status != Error){
          this.status = 'success';
          
          this.identity = response;

          //Objeto usuario identificado
          this._userService.signup(this.userLogin, 'true').subscribe(
            response => {
              
              //Usuario
              this.token = response;
              //Persistir datos de usuario identificado
              localStorage.setItem('token',JSON.stringify(this.token));
              localStorage.setItem('identity',JSON.stringify(this.identity));
              
              //Redirección
              //this._router.navigate([]);
            },
            error => {              
              this.status = 'loginError';

            }
        );
        }else{
          this.status = 'loginError';
        }
      },
      error => {
        this.status = 'loginError';
        
      }
    );
  }

  onSubmitRegister(form:any):void{
    
    this._userService.register(this.userRegister).subscribe(
      response => {
        //identity        
        if(response.status != Error){
          this.status = 'success';
          this._router.navigate(['verify-email','0']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = error.error.status == 300 ? 'registerInvalid':'registerError'       

        if(error.error.userStored){
          this._router.navigate(['verify-email','1']);
        }        
      }
    );
  }

  readParams(){
    this._route.params.subscribe(params => {

      if(params['action'] == 'logout'){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;
      }else if(params['action'] == 'resetSuccess'){
        this.status = 'resetSuccess';
      }
    });
  }

  forgotten(){
    this._router.navigate(['/forgotten']);
  }

}


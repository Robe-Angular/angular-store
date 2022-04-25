import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';

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
    private _route: ActivatedRoute,
    private _snackbarService: SnackbarAdviceService

  ) { 
    this.status = '';
    this.token = null;
    this.identity = null;
    this.userLogin = new User('', '', '','', '', '','ROLE-USER', '','',null);
    this.userRegister = new User('', '', '', '', '', '', 'ROLE-USER','','',null);
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
              this._router.navigate(['/consumer',this.identity.user._id]);
            },
            error => {              
              this.status = 'loginError';
              this._snackbarService.showSnackBar(error.error.message, "error");
            }
        );
        }else{
          this.status = 'loginError';
          this._snackbarService.showSnackBar(response.error.message, "error");
        }
      },
      error => {
        this.status = 'loginError';
        this._snackbarService.showSnackBar(error.error.message, "error");        
      }
    );
  }

  onSubmitRegister(form:any):void{
    
    this._userService.register(this.userRegister).subscribe(
      response => {
        //identity        
        if(response.status != Error){
          this.status = 'success';
          this._snackbarService.showSnackBar("Hemos enviado un correo de confirmación", "success",-1);
          this._router.navigate(['verify-email','0']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = error.error.status == 300 ? 'registerInvalid':'registerError'       
        this._snackbarService.showSnackBar(error.error.message,'error');
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
        this._userService.getIdentity();
        this._userService.getToken();
        this.identity = null;
        this.token = null;
      }else if(params['action'] == 'resetSuccess'){
        this.status = 'resetSuccess';
        this._snackbarService.showSnackBar('Se ha reseteado la contraseña',"success");
      }
    });
  }

  forgotten(){
    this._router.navigate(['/forgotten']);
  }

}



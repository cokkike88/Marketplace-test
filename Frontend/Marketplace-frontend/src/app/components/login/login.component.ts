import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Login';
        this.user = new User(0, '', '', false);
    }

    ngOnInit(){
        console.log('product.component cargador!!');
        
    }

    onLogin(){
        this._userService.login(this.user).subscribe(
            response => {                
                //console.log("RESPONSE: " + JSON.stringify(response));
                if(response.code != 200){
                                                            
                    this.status = 'error';
                }
                else{
                    this.user = new User(0, '', '', false);      
                    console.log(JSON.stringify(response.data));
                    localStorage.setItem('useremail', response.data.email);
                    localStorage.setItem('userid', response.data.id.toString());
                    localStorage.setItem('isseller', response.data.isSeller);

                    this._router.navigate(['/home']);
                }
                
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
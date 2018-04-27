import { Component, DoCheck, OnInit } from '@angular/core';
import {Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  title = 'MARKETPLACE';
  email: string;

  constructor(private _router: Router){
    
  }

  ngOnInit(){
    this.email = localStorage.getItem('useremail');
  }

  ngDoCheck(){
    this.email = localStorage.getItem('useremail');
  }

  onLogout(){
    console.log("LONGOUT");
    localStorage.removeItem('useremail');
    localStorage.removeItem('userid');
    localStorage.removeItem('isseller');
    localStorage.clear();
    this.email = null;

    this._router.navigate(['/home']);
  }
}

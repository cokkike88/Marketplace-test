import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  title = 'MARKETPLACE';
  email: string;

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
  }
}

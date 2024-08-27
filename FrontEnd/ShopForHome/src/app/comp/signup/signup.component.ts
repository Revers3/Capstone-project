import { Component } from '@angular/core';

import { UserService } from '../service/User.Service';
import { Router } from '@angular/router';
import { Login } from '../service/Auth.Model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username: string = '';

  password: string = '';

  newUser: Login = {id: 0, username: '', password: ''};

  isFound:boolean= false;

  users: Login[] = [];


    constructor(private router: Router, private userService: UserService) {}

    onSubmit() {
      if(this.username && this.password)
      {
        this.newUser.username = this.username;
        this.newUser.password = this.password;
        this.userService.getAllUsers().subscribe(
          (users: Login[]) => {
            this.users = users;
            for(let i = 0; i < this.users.length; i++)
            {
              if(this.users[i].username === this.newUser.username)
              {
                this.isFound = true;
                break;
              } else 
              {
                this.isFound = false;
              }
            }


            if(this.isFound === true)
            {
              alert('User already exists');
            } else 
            {
              this.userService.signUp(this.newUser).subscribe(
                (response) => {
                  console.log(response);
                }, 
                (error) => {
                  console.log('Error making user: ' + error);
                }
              );
              this.navigateToLogin();
              
            }
          }
        )
      } else 
      {
        alert('Please enter a username and password');
      }
        
        


        
    }
  
    navigateToLogin() {
      this.router.navigate(['/login']);
    }
}

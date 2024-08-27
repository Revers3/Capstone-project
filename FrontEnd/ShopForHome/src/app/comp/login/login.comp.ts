import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Login } from "../service/Auth.Model";
import { UserService } from "../service/User.Service";
export const userToken = "userToken";

@Component({
    selector: 'app-login',
    templateUrl: './login.comp.html',
    styleUrls: ['./login.comp.css']
  })
  export class LoginComponent {

    username: string = '';
    password: string = '';
    role: string = 'User'; // Default role

  roles: string[] = ['Admin', 'User']; // List of roles

  constructor(private router: Router, private userService: UserService) {}
  
    
    onSubmit() {
       // Call different methods based on the selected role
    if (this.role === 'Admin') {
      if(this.username && this.password)
      {
        this.userService.login(this.username, this.password).subscribe({
          next: () => {
            console.log('Retrieval successful!');
            if(this.username == 'admin')
            {
              //storing the username to access later
            localStorage.setItem('userToken', this.username);
              this.router.navigate(['/adminProd']);
            } else
            {
              alert('only admins have access to this page');
            }
            
            
          },
          error: (err) => {
            alert('Could not find account');
            console.error('Login failed', err);
            // Handle login error
          }
        });
      } else {
        alert('Please enter a username and password');
      }
        

        
      } else if(this.role === 'User') {
        if(this.username && this.password)
        {
          this.userService.login(this.username, this.password).subscribe({
            next: () => {
              console.log('Login successful!');
              //storing the username to access later
             localStorage.setItem('userToken', this.username);
              this.router.navigate(['/user']);
              // Redirect or show success message
            },
            error: (err) => {
              alert('Could not find account');
              console.error('Login failed', err);
              // Handle login error
            }
          });
        } else 
        {
          alert('Please enter a username and password');
        }
        
        
    }


  }

  navigateToSignUp() {
    this.router.navigate(['/signup']); // Adjust the route based on your routing configuration
  }
   
  }
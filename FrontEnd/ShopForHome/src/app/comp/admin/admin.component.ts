import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/User.Service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router, private userService: UserService) { }
  
  token: string | null = null;

  //getting token
  ngOnInit(): void {
    this.token = this.userService.getToken();
    console.log('JWT Token: ', this.token);
  }
  
  
  goToUsers()
  {
    this.router.navigate(['/adminUser']);
  }

  goToProducts()
  {
    this.router.navigate(['/adminProd']);
  }

  logout()
  {
    this.router.navigate(['/']);
  }

  goToDiscounts()
  {
    this.router.navigate(['/adminDis']);
  }

  goToReport()
  {
    this.router.navigate(['/adminRep']);
  }
}

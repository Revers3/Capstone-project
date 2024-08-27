import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../service/Auth.Model';
import { UserService } from '../../service/User.Service';
import { MatTableDataSource } from '@angular/material/table';
import { response } from 'express';
import { userToken } from '../../login/login.comp';

@Component({
  selector: 'app-admin.users',
  templateUrl: './admin.users.component.html',
  styleUrl: './admin.users.component.css'
})
export class AdminUsersComponent {


  constructor(private router: Router, private userService: UserService) { }
  goToHome()
  {
    this.router.navigate(['/admin']);
  }

  goToUsers()
  {
    this.router.navigate(['/adminUser']);
  }

  logout()
  {
    localStorage.removeItem(userToken);
    this.userService.deleteToken();
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

  goToProducts()
  {
    this.router.navigate(['/adminProd']);
  }

  goToOrders()
  {
    this.router.navigate(['/adminOrd']);
  }



  newUser: Login = { id: 0, username: '', password: '' };

  userToEdit: Login | null = null;

  isFormVisible: boolean = false;


  id: number = 0;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  addUser() {
    if (this.newUser.id && this.newUser.username && this.newUser.password) {
      if (this.userToEdit) {
        if(this.newUser.username != 'admin'){
          // Update existing user
          console.log(this.newUser);

          

        this.userService.updateUser(this.newUser, this.newUser.id).subscribe(updatedUser => {
          const index = this.dataSource.data.findIndex(user => user.id === updatedUser.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedUser;
            this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
          }
          this.userToEdit = null; // Clear the user being edited
        });
        } else {
          alert('User cannot become administrator');
        }
        
        
      } else {
        // Add new user
        if(this.newUser.username == 'admin'){
            alert('Creating Administrators is not allowed');
        } else {
          this.userService.signUp(this.newUser).subscribe(newUser => {
            this.dataSource.data = [...this.dataSource.data, newUser];
          });
        }
        
      }
      // Clear form
      this.newUser = { id: 0, username: '', password: '' };
      this.isFormVisible = false; // Hide form after submission
    } else {
      alert('All fields are required');
    }
  }

//using angular material to make this table
displayedColumns: string[] = ['id', 'username', 'actions'];
dataSource = new MatTableDataSource<Login>();


  users: Login[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: Login[]) => 
      {
        console.log('Fetched data:', data);
        this.dataSource.data = data;

        
      },
      
      error => console.error('Error fetching user data', error)
    );
  }

  editUser(user: Login) {
    this.newUser = { ...user }; // Pre-fill form with user data
    this.userToEdit = user;
    this.isFormVisible = true; // Show form if hidden
  }

  deleteUser(user: Login, id: number) {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      
      this.userService.deleteUser(id).subscribe(
        (error) => {
          console.log('Error', error);
        }
      )
      this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
    }
  }

  isDeleteDisabled(user: Login): boolean{
    //disables the delete button if the username is admin
    return user.username === 'admin';
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
  const filterValue = input.value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  }
}

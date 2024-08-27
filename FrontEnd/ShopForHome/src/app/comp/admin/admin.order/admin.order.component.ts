import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../service/Order.Service';
import { ProductService } from '../../service/Product.Service';
import { Login, Order, Product } from '../../service/Auth.Model';
import { MatTableDataSource } from '@angular/material/table';
import { userToken } from '../../login/login.comp';
import { UserService } from '../../service/User.Service';


@Component({
  selector: 'app-admin.order',
  templateUrl: './admin.order.component.html',
  styleUrl: './admin.order.component.css'
})
export class AdminOrderComponent {

  displayedColumns: string[] = ['id', 'userid', 'productid', 'name', 'quantity', 'price', 'actions'];
  orders: Order[] = [];
  isFormVisible: boolean = false;
  ordToEdit: Order | null = null;
  newOrd: Order = {
    id: 0,
    login: {
      id: 0,
      username: '',
      password: ''
    },
    product: {
      name: '',
      category: '',
      price: 0,
      stock: 0,
      image: ''
    },
    quantity: 0,
    totalPrice: 0
  };
  dataSource = new MatTableDataSource<Order>();
  newProd: any;
  prodToEdit: any;
  constructor(private router: Router, private prodService: ProductService, private orderService: OrderService, private userSer: UserService) {}

  ngOnInit(): void{
    this.getAllOrders();
  }

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
    this.userSer.deleteToken();
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


  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  getAllOrders()
  {
    this.orderService.getAllOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        console.log(this.orders);
        this.dataSource.data = this.orders;
      }
    )
  }
  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
  const filterValue = input.value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  }

  addOrd() {
    if (this.newOrd.id   && this.newOrd.quantity && this.newOrd.totalPrice && this.newOrd.product.id) {
        if (this.ordToEdit) {
          // Update existing product
          //get id from username first
          this.userSer.getUserByUsername(this.newOrd.login.username).subscribe(
            (user) => {
              this.newOrd.login = user as Login; 
              this.prodService.getProductById(this.newOrd.product.id as number).subscribe(
                (product: Product) => {
                  this.newOrd.product = product; 
                  console.log(this.newOrd);
                  //this.newOrd.user = null;
                  this.orderService.updateOrder(this.newOrd).subscribe(updatedOrd => {
                    const index = this.dataSource.data.findIndex(ord => ord.id === updatedOrd.id);
                    if (index !== -1) {
                      this.dataSource.data[index] = updatedOrd;
                      this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
                    }
                    this.ordToEdit = null; // Clear the product being edited
                  });
                },
                (error) => 
                  {
                    console.log('error getting product', error);
                  }
              );
            },
            (error) => 
            {
              console.log('error getting user', error);
            }
          );  
          
          
        } else {
          //get id from username first
          this.userSer.getUserByUsername(this.newOrd.login.username).subscribe(
            (user) => {
              this.newOrd.login = user as Login;
              this.prodService.getProductById(this.newOrd.product.id as number).subscribe(
                (product) => {
                  this.newOrd.product = product;
                  
                  // Add new product
                   this.orderService.createOrder(this.newOrd).subscribe(newOrd => {
                     this.dataSource.data = [...this.dataSource.data, newOrd];
                   this.getAllOrders();
                   });
                },
                (error) => 
                  {
                    console.log('error getting product', error);
                  }
              );
            },
            (error) => 
            {
              console.log('error getting user', error);
            }
          );
          
          console.log(this.newOrd.login.id);
          
        }
        // Clear form
        this.newProd = { id: 0, name: '', category: '', price: 0, stock: 0, image: '' };
        this.isFormVisible = false; // Hide form after submission
      } else {
        alert('Invalid Data');
      }
  }
      /*
    } else {
      alert('All fields are required');
    } */
    

  editOrd(ord: Order, user: Login) {
    //getting login info 
   /* this.userSer.getUserByUsername(username).subscribe(
      (user) => { 
      //console.log(user?.username); */
      this.newOrd = { ...ord }; // Pre-fill form with user data
      if(!this.newOrd.login)
      {
        console.log('no login');
      }
      
     // this.newOrd.login.id = id;
      
      //console.log(id);
       
      console.log('in editOrd method' + this.newOrd);
      this.ordToEdit = ord;
      this.isFormVisible = true; // Show form if hidden
   
    
  }

  deleteOrd(o: Order, id: number)
  {
    this.orderService.deleteOrder(id).subscribe(
      (error) => {
        console.log('Error', error);
      }
    );
    this.dataSource.data = this.dataSource.data.filter(u => u.id !== o.id);
  }

  usernameToShow: string= '';
  getUsername(ord: Order)
  {
    this.userSer.getUserByUsername(ord.login.username).subscribe(
      (user)=> {
        this.usernameToShow = user?.username as string;
      },
      (error) => {
        console.log('error', error);
      }
    );
    return this.usernameToShow;
  }
}



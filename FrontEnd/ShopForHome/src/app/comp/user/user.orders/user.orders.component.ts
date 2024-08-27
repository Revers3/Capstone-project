import { Component } from '@angular/core';
import { OrderService } from '../../service/Order.Service';
import { DiscountService } from '../../service/Discount.Service';
import { UserService } from '../../service/User.Service';
import { Router } from '@angular/router';
import { Discount, Order, OrderWithDiscount } from '../../service/Auth.Model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../service/Product.Service';
import { userToken } from '../../login/login.comp';

@Component({
  selector: 'app-user.orders',
  templateUrl: './user.orders.component.html',
  styleUrl: './user.orders.component.css'
})
export class UserOrdersComponent {
  ordersWithDiscounts: any[] = [];
  username: string | null = '';

  //dataSource = new MatTableDataSource<OrderWithDiscount>();
  dataSource = new MatTableDataSource<Order>();


  
  constructor(private orderSer: OrderService, private disSer: DiscountService, private userSer: UserService, 
    private prodSer: ProductService, private router: Router) 
  {
    this.username = localStorage.getItem('userToken') as string;
  }

  //links to other pages
  goToHome() {
    this.router.navigate(['/user']);
  }

  logout() {
    localStorage.removeItem(userToken);
    this.userSer.deleteToken();
    this.router.navigate(['/']);
  }

  goToWishlists()
  {
    this.router.navigate(['/userWish']);
  }

  goToProducts() {
    this.router.navigate(['/user']);
  }

  goToOrders()
  {
    this.router.navigate(['/userOrder']);
  }

  goToCart()
  {
    this.router.navigate(['/userCart']);
  }

  displayedColumns: string[] = ['id', 'image', 'product','quantity', 'price', 'actions'];

  ngOnInit(): void {
    //this.loadOrderAndDiscounts();
    this.getOrders();
  }

  private loadOrderAndDiscounts(): void {
    //need to get user details first
    this.userSer.getUserByUsername(this.username as string).subscribe(user => {
      console.log('User Id: ' + user?.id);
      this.orderSer.getOrdersByUser(user?.id as number).subscribe(orders => {
        this.disSer.getAllDiscounts().subscribe(discounts => {
          this.ordersWithDiscounts = this.applyDiscounts(orders, discounts);
          this.dataSource.data = this.ordersWithDiscounts;
        });
      });
    });
  }



   applyDiscounts(orders: Order[], discounts: Discount[]): any[] {
    return orders.map(order => {
      const discount = discounts.find(d => d.product.id === order.product.id);
      const discountedPrice = discount ? order.product.price - (order.product.price * (discount.discount)) : order.product.price;
      return {
        ...order,
        discountedPrice
      };
    });
  }


  deleteOrder(id: number, quantity: number) {

    //running getOrderById to get the related product
    //then update product to increase stock by 1
    //then delete the order
    this.orderSer.getOrderById(id).subscribe(
      order => {
        this.prodSer.getProductById(order.product.id as number).subscribe(
          (prod) => {
            console.log('Old Stock', prod.stock);
            prod.stock = prod.stock + quantity;
            console.log('New Stock', prod.stock);
            this.prodSer.updateProduct(prod).subscribe(
              (response) => {
                console.log(response);
              }, 
              (error) => {
                console.log('Error updating product', error);
              }
            )
          }
        )
      }
    )


    this.orderSer.deleteOrder(id).subscribe(
      (response) => {
        console.log('Order Canceled');
        alert('Order Cancelled');
      },
      (error) => {
        console.log('Error Cancelling Order: ', error);
      }
    )
    this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);


    
  }

  //don't need order and discount anymore
  getOrders()
  {
    this.userSer.getUserByUsername(this.username as string).subscribe(user => {
      console.log('User Id: ' + user?.id);
      this.orderSer.getOrdersByUser(user?.id as number).subscribe(orders => {
        console.log(orders);
        this.dataSource.data = orders;
      });
    });
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
  const filterValue = input.value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  }
}


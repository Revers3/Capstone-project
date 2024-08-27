import { Component, NgModule } from '@angular/core';
import { OrderService } from '../../service/Order.Service';
import { DiscountService } from '../../service/Discount.Service';
import { UserService } from '../../service/User.Service';
import { Router } from '@angular/router';
import { Discount, Order, OrderWithDiscount } from '../../service/Auth.Model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../service/Product.Service';
import { MatMenuModule } from '@angular/material/menu';
import { NgModel } from '@angular/forms';
import { userToken } from '../../login/login.comp';


@Component({
  selector: 'app-admin.report',
  templateUrl: './admin.report.component.html',
  styleUrl: './admin.report.component.css'
})
export class AdminReportComponent {
  
  //stores orders and discounts
  ordersWithDiscounts: any[] = [];
  orders: Order[] = [];

  //stores revenue total and number of orders
  revenue: number = 0;
  numOrders: number = 0;




  constructor(private orderSer: OrderService, private disSer: DiscountService, private userService: UserService, 
    private prodSer: ProductService, private router: Router) {}

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
  

    //mapping orders and discounts together to get accurate prices
    ngOnInit(): void {
     // this.getOrdersAndDiscounts();
     this.getAllOrders();
    }

    getOrdersAndDiscounts() {
      this.orderSer.getAllOrders().subscribe(orders => {
        this.disSer.getAllDiscounts().subscribe(discounts => {
          this.ordersWithDiscounts = this.applyDiscounts(orders, discounts);
          this.countOrders();
        })
      })
    }

    applyDiscounts(orders: Order[], discounts: Discount[]): any[]
    {
      return orders.map(order => {
        const discount = discounts.find(d => d.product.id === order.product.id);
        const discountedPrice = discount ? order.product.price - (order.product.price * (discount.discount)) : order.product.price;
        this.revenue = this.revenue + discountedPrice;
       // console.log(this.revenue);
        return {
          ...order,
          discountedPrice
        };
        
      });
      
    }
    
    countOrders()
    {
      this.orders.forEach((order) => {
        //increase total by 1 for each order
        this.numOrders = this.numOrders + 1;
        //sending it to console to check
      });

     // console.log(this.numOrders);
    }

    getAllOrders()
    {
      this.orderSer.getAllOrders().subscribe(
        (orders) => {
          this.orders = orders;
          this.countOrders();
          this.getRevenue();
        }
      )
    }

    getRevenue()
    {
      this.orders.forEach((order) => {
        this.revenue += order.totalPrice;
      })
    }


}

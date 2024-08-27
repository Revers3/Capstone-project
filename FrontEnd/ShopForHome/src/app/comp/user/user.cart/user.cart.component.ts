import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../service/Product.Service';
import { UserService } from '../../service/User.Service';
import { OrderService } from '../../service/Order.Service';
import { DiscountService } from '../../service/Discount.Service';
import { userToken } from '../../login/login.comp';
import { CartService } from '../../service/Cart.Service';
import { MatTableDataSource } from '@angular/material/table';
import { Cart, CartWithDiscount, Discount, Login, Order } from '../../service/Auth.Model';
import { response } from 'express';
import { forkJoin } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-user.cart',
  templateUrl: './user.cart.component.html',
  styleUrl: './user.cart.component.css'
})
export class UserCartComponent {

  displayedColumns: string[] = ['image', 'name', 'category', 'stock', 'quantity', 'discount', 'total', 'actions'];
  cartList: Cart[] = [];
  cartWithDiscoutList: CartWithDiscount[] = [];
  username: string = '';

  dataSource = new MatTableDataSource<CartWithDiscount>([]);


  constructor(private router: Router, private prodService: ProductService,
    private userService: UserService,
    private orderSer: OrderService,
    private disSer: DiscountService,
    private cartSer: CartService) {
    this.username = localStorage.getItem('userToken') as string;

  }

  logout() {
    localStorage.removeItem(userToken);
    this.userService.deleteToken();
    this.router.navigate(['/']);
  }

  goToOrders() {
    this.router.navigate(['/userOrder']);
  }

  goToProducts() {
    this.router.navigate(['/user']);
  }

  goToWishlists() {
    this.router.navigate(['/userWish']);
  }

  goToCart() {
    this.router.navigate(['/userCart']);
  }


  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    console.log(this.username);
    this.userService.getUserByUsername(this.username).subscribe(
      (user) => {
        console.log(user?.id);
        this.cartSer.getCartItemsById(user?.id as number).subscribe(
          (carts) => {
            if (carts) {
              this.cartList = carts;
              console.log(carts);
              this.disSer.getAllDiscounts().subscribe(
                (discounts) => {
                  

                  this.combineCartAndDiscount(carts, discounts);
                  console.log(this.dataSource.data);
                },
                (error) => {
                  console.log('Error getting discounts', error);
                }
              )
            }
          }
        )
      },
      (error) => {
        console.log('Error getting user', error);
      }
    )
  }



  combineCartAndDiscount(carts: Cart[], discounts: Discount[]) {
    const combinedData: CartWithDiscount[] = carts.map(cart => {    //do math here for discount
      const discount = discounts.find(d => d.product.id === cart.product.id)?.discount || 0;
      return {
        cart,
        discount,
        quantity: 1
      };
    });

    this.dataSource.data = combinedData;
  }

  //increasing and decreasing quantity for amount wanted
  increaseQuantity(element: CartWithDiscount) {
    if (element.quantity < element.cart.product.stock) {
      element.quantity++;
      this.updateDataSource();
    }
  }

  decreaseQuantity(element: CartWithDiscount) {
    if (element.quantity > 1) {
      element.quantity--;
      this.updateDataSource();
    }
  }

  private updateDataSource() {
    this.dataSource.data = [...this.dataSource.data];
  }

  getTotalPrice(element: CartWithDiscount): number {
    const unitPrice = element.cart.product.price;
    const discount = element.discount;
    return element.quantity * (unitPrice - (unitPrice * discount));
  }

  

  


    OGItemStock: number = 0;
    newItemStock: number = 0;
    tempId: number = 0;

  orderItems()
  {
    // Ensure cart list is available
    this.cartWithDiscoutList = this.dataSource.data;

    if (this.cartWithDiscoutList && this.cartWithDiscoutList.length > 0) {
    // Fetch user info once
    this.userService.getUserByUsername(this.username).subscribe(
      (user) => {
        // Process each item in the cart
        this.tempId = user?.id as number;
        const orderRequests = this.cartWithDiscoutList.map(item => {
          // Create a new order object for each item
          //storing the original stock 
          this.OGItemStock = item.cart.product.stock;

          // Create a deep copy of the product to avoid direct mutation
          const productCopy = cloneDeep(item.cart.product);

            // Calculate the total price for the item
            const totalPrice = this.getTotalPrice(item);
            console.log(totalPrice);

            const order: Order = {
            login: user as Login,
            quantity: item.quantity,
            totalPrice: totalPrice,
            id: this.generateUniqueId(),
            product: productCopy
          };

          //getting the new stock
          this.newItemStock = this.OGItemStock - item.quantity;
          productCopy.stock = this.newItemStock;
          
          // Return the observable from orderSer.createOrder
          //return this.orderSer.createOrder(order);
          // Call createOrder and updateProductStock in parallel
          item.cart.product.stock = this.newItemStock;
          const orderObservable = this.orderSer.createOrder(order);
          const stockUpdateObservable = this.prodService.updateProduct(productCopy);
          
          return forkJoin([orderObservable,stockUpdateObservable]);

        });


        // Wait for all order requests to complete
        forkJoin(orderRequests).subscribe(
          (responses) => {
            alert('Orders have been made');
            console.log('All orders placed successfully:', responses);
            //wipe the cart by user id
            this.cartSer.wipeCartById(this.tempId).subscribe(
              (reponse)=> {
                this.getCart();
              },
              (error) => {
                console.error('Error', error);
              }
            )
          },
          (error) => {
            console.log('Error ordering cart items:', error);
            
          }
        );
      },
      (error) => {
        console.error('Error fetching user:', error);
        
      }
    );
  } else {
    alert('Cart is currently empty');
  }
}

  

// Helper method to generate a unique ID
generateUniqueId(): number {
  return Math.floor(Math.random() * 1000) + 1;
}
  
  deleteCart(element: CartWithDiscount)
  {
    this.cartSer.deleteCartByCartId(element.cart.id as number).subscribe(
      (response) => {
        console.log('Removed', response);
        alert('Item Removed from cart');
        this.getCart();
      },
      (error) => {
        console.log('error', error);
      }
    );

    
  }

}

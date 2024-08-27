import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../service/Wishlist.Service';
import { UserService } from '../../service/User.Service';
import { of, switchMap } from 'rxjs';
import { Wishlist, Login, ProductWithDiscount, Cart, Product, Discount } from '../../service/Auth.Model';
import { MatTableDataSource } from '@angular/material/table';
import { userToken } from '../../login/login.comp';
import { CartService } from '../../service/Cart.Service';
import { DiscountService } from '../../service/Discount.Service';



@Component({
  selector: 'app-user.wishlists',
  templateUrl: './user.wishlists.component.html',
  styleUrl: './user.wishlists.component.css'
})
export class UserWishlistsComponent {

  username: string | null = '';

  userId: number | undefined = 0;

  carts: Cart[] = [];
  prod: Product = { id: 0, name: '', category: '', price: 0, stock: 0, image: ''};
  cart: Cart = {
    id: 0,
    login: {id: 0, username: '', password: ''},
    product: { id: 0, name: '', category: '', price: 0, stock: 0, image: ''}
  }

  prodDiscount: ProductWithDiscount = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    discount: 0
  };

  constructor(private router: Router, private wishService: WishlistService, private userService: UserService, 
    private cartSer: CartService,
    private disSer: DiscountService) 
    {
      this.username = localStorage.getItem('userToken') as string;
    }

  //links to other pages
  logout()
  {
    localStorage.removeItem(userToken);
    this.userService.deleteToken();
    this.router.navigate(['/']);
  }

  goToOrders()
  {
    this.router.navigate(['/userOrder']);
  }

  goToProducts() {
    this.router.navigate(['/user']);
  }

  goToWishlists()
  {
    this.router.navigate(['/userWish']);
  }

  goToCart()
  {
    this.router.navigate(['/userCart']);
  }


  //need to get user id, and then get all wishlists that have that user id

  displayedColumns: string[] = ['image', 'name', 'category', 'stock', 'actions'];

  ngOnInit(): void {
    this.loadWishlists(this.username as string);
  }

  dataSource = new MatTableDataSource<Wishlist>();

  loadWishlists(username: string) {
    //get user id first and then get all the wishlists by that
    this.userService.getUserByUsername(username).subscribe(
      (data: Login | null) => {
        this.userId = data?.id;
        console.log('id: ', this.userId);
        this.wishService.getWishlistsByUser(this.userId as number).subscribe(
          (data: Wishlist[]) => {
            console.log('Fetched data:', data);
            this.dataSource.data = data;
          }
        )
      },
      (error: any) => {
        console.error('Error getting user: ', error);
      }
    )


  }


  deleteWishlist(id: number)
  {
    this.wishService.deleteWishlist(id).subscribe(
      (response) => {
        console.log('Wishlisted Item Removed');
      },
      (error) => {
        console.log('Error deleting Wishlisted Item: ', error);
      }
    )
    this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
  }

  isOrderDisabled(element: Wishlist): boolean
  {
    return element.product.stock <= 0;
  }

  isDiscountFound: boolean = false;
  

  applyFilter(event: Event): void {

    /* const input = event.target as HTMLInputElement;
  const filterValue = input.value.trim().toLowerCase();
  this.dataSource.filter = filterValue; */
    

  const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Wishlist, filter: string) => {
      return data.product.name.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue;
  }

}

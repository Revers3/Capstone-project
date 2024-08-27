import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Discount, LoginOrder, Order, Product, Wishlist } from '../../service/Auth.Model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../service/Product.Service';
import { Login } from '../../service/Auth.Model';
import { UserService } from '../../service/User.Service';
import { DiscountService } from '../../service/Discount.Service';
import { OrderService } from '../../service/Order.Service';
import { ProductWithDiscount } from '../../service/Auth.Model';
import { catchError, combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { WishlistService } from '../../service/Wishlist.Service';
import { userToken } from '../../login/login.comp';
import { CartService } from '../../service/Cart.Service';


@Component({
  selector: 'app-user.products',
  templateUrl: './user.products.component.html',
  styleUrl: './user.products.component.css'
})
export class UserProductsComponent {

  
  username: string | null = '';


  constructor(private router: Router, private prodService: ProductService, 
    private userService: UserService, 
    private orderSer: OrderService, 
    private disSer: DiscountService,
    private wishSer: WishlistService,
    private cartSer: CartService) 
  {
    this.username = localStorage.getItem('userToken') as string;
    
  }


  //empty objects to put data into
  login: Login = { id: 0, username: '', password: ''};
  loginOrder: LoginOrder = { id: 0, username: '', password: ''};
  prod: Product = { id: 0, name: '', category: '', price: 0, stock: 0, image: ''};
  ord: Order = {
    id: 0, login: this.login, product: this.prod,
    quantity: 0,
    totalPrice: 0
  };
  wish: Wishlist = {id: 0, login: {id: 0, username: '', password: ''}, product: {id: 0, name: '', category: '', price: 0, stock: 0, image: ''}}

  cart: Cart = {
    id: 0,
    login: {id: 0, username: '', password: ''},
    product: { id: 0, name: '', category: '', price: 0, stock: 0, image: ''}
  }
  carts: Cart[] = [];
  wishlists: Wishlist[] = [];



  //links to other pages
  
  goToProducts() {
    this.router.navigate(['/user']);
  }

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

  goToWishlists()
  {
    this.router.navigate(['/userWish']);
  }

  goToCart()
  {
    this.router.navigate(['/userCart']);
  }

  


  
  displayedColumns: string[] = ['image', 'name', 'category', 'price', 'discount', 'stock', 'actions'];

  dataSource = new MatTableDataSource<ProductWithDiscount>();
  ngOnInit(): void {
    this.loadData();
    
  }

  

userId: number | undefined;
OGPrice: number = 0;
newPrice: number= 0;

prodId: number = 0;

isFound: boolean = false;

//instead of adding to order we are making a cart item

addToCart(element: ProductWithDiscount, imageSrc: string)
{
  
  this.userService.getUserByUsername(this.username as string).subscribe(
    (user) => {
      this.cartSer.getCartItemsById(user?.id as number).subscribe(
        (data) => {
          
          this.carts = data;
            // Check if the product is already in the cart
            const isProductInCart = data.some(cartItem => cartItem.product.id === element.id);

          
          
           
          if(isProductInCart) {
            console.log('Product already in cart');
            alert('Product already in cart');
          } else {
            this.prod = {
              id: element.id,
              name: element.name,
              category: element.category,
              stock: element.stock,
              price: element.price,
              image: imageSrc//need to get image src here
            };
      
            this.cart.login = user as Login;
      
            this.cart.product = this.prod;
      
            this.cart.id = Math.floor(Math.random() * 1000) + 1;
      
            //resetting this to default value
            this.isFound = false;
      
            //creating cart item
            this.cartSer.createCartItem(this.cart).subscribe(
              (response) => {
                console.log('Item Added to Cart', response);
                alert('Item Added to Cart');
              },
              (error) => {
                console.log('Error saving Item to Cart, ', error);
              }
            )
          }
        },
        (error) => {
          console.log('Error getting all Cart Items for this user');
        }
      )

      

    }, 
    (error) => {
      console.log('Error getting user id', error);
    }
  )
} 


  // Method to refresh table data
refreshTableData(): Observable<void> {
  // Fetch the updated product list or data for your table
  return this.loadNewData();
}

//this is for refreshing the table itself
loadNewData(): Observable<void> 
{
  // Fetch both products and discounts
  return combineLatest([
    this.prodService.getAllProducts(),
    this.disSer.getAllDiscounts()
  ]).pipe(
    map(([products, discounts]) => {
      this.combineProductAndDiscount(products, discounts);
    }),
    catchError(error => {
      console.error('Error loading data', error);
      return of(void 0); // Return an observable that emits void in case of error
    })
  );
}



//this is for fetching it for the first time
loadData()
  {
    
    //fetching both products and discounts
    this.prodService.getAllProducts().subscribe(products => {
      this.disSer.getAllDiscounts().subscribe(discounts => {
        this.combineProductAndDiscount(products, discounts);
      })
    })
  }

  combineProductAndDiscount(products: Product[], discounts: Discount[])
  {
    const combinedData: ProductWithDiscount[] = products.map(product => {
      const discount = discounts.find(d => d.product.id === product.id)?.discount || 0;
      return {
        ...product,
        discount
      };
    });

    this.dataSource.data = combinedData;
  }


  updateProductStock(product: ProductWithDiscount) {
    //find the product and update it
    const index = this.dataSource.data.findIndex(p => p.id === product.id);
    if(index > -1) {
      this.dataSource.data[index] = product;
      this.dataSource._updateChangeSubscription();
    }
  }


  isOrderDisabled(element: ProductWithDiscount): boolean
  {
    return element.stock <= 0;
  }


  isWishlistExist: boolean = false;
  createWishList(element: ProductWithDiscount, imageUrl: string)
  {
    this.userService.getUserByUsername(this.username as string).subscribe(
      (data: Login | null) => {
        this.userId = data?.id;
       // console.log(this.userId);
        
        //creating a wishlist
        //setting the user for the wishlist record
        this.wish.login = data as Login;
        //putting data into the product 
        this.prod = {
          id: element.id,
          name: element.name,
          category: element.category,
          stock: element.stock,
          price: element.price,
          image: imageUrl
        };

        //putting product into wishlist
        //and setting random number as id
        this.wish.id = Math.floor(Math.random() * 1000) + 1,
        this.wish.product = this.prod;


        //checking if wishlist already exists
        this.wishSer.getWishlistsByUser(this.userId as number).subscribe(
          (data: Wishlist[]) => {
            this.wishlists = data;
            for(let i = 0; i < this.wishlists.length; i++)
            {
              if(this.wishlists[i].product.id === this.wish.product.id)
              {
                console.log('Wishlist item exists');
                this.isWishlistExist = true;
                break;
              } else
              {
                this.isWishlistExist = false;
              }
            }

            if(this.isWishlistExist)
            {
              alert('Wishlist record already exists');
            } else
            {
              //running the method to create the wishlist
          this.wishSer.createWishlist(this.wish).subscribe(
          (response) => {
            console.log('Success', response);
            alert('Item added to Wishlist');
          }, 
          (error) => {
            //error for making wishlist
            console.log('Error: ', error);
          }
        )
            }

          }
        )
        
      },
      //user error
      (error: any) => {
        console.error('Error getting user: ', error);
      }
    )
  }

  applyFilter(event: Event): void {

    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


}

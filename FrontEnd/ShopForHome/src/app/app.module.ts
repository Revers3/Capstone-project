import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort'; 
import { MatMenuModule } from '@angular/material/menu';

import { LoginComponent } from './comp/login/login.comp';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './comp/admin/admin.component';
import { MatSelectModule } from '@angular/material/select'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './comp/service/User.Service';
import { AdminUsersComponent } from './comp/admin/admin.users/admin.users.component';
import { AdminProductsComponent } from './comp/admin/admin.products/admin.products.component';
import { ProductService } from './comp/service/Product.Service';
import { AdminDiscountComponent } from './comp/admin/admin.discount/admin.discount.component';
import { UserProductsComponent } from './comp/user/user.products/user.products.component';
import { UserWishlistsComponent } from './comp/user/user.wishlists/user.wishlists.component';
import { UserOrdersComponent } from './comp/user/user.orders/user.orders.component';
import { AdminReportComponent } from './comp/admin/admin.report/admin.report.component';
import { SignupComponent } from './comp/signup/signup.component';
import { OrderService } from './comp/service/Order.Service';
import { WishlistService } from './comp/service/Wishlist.Service';
import { AwsS3Service } from './comp/service/Aws.Service';
import { UserCartComponent } from './comp/user/user.cart/user.cart.component';
import { AdminWishlistComponent } from './comp/admin/admin.wishlist/admin.wishlist.component';
import { AdminOrderComponent } from './comp/admin/admin.order/admin.order.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AdminDiscountComponent,
    UserProductsComponent,
    UserWishlistsComponent,
    UserOrdersComponent,
    AdminReportComponent,
    SignupComponent,
    UserCartComponent,
    AdminWishlistComponent,
    AdminOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCard,
    FormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule

  ],
  providers: [
    //provideClientHydration(),
    UserService,
    ProductService,
    OrderService,
    WishlistService,
    AwsS3Service,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

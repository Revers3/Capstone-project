import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './comp/login/login.comp';
import { AdminComponent } from './comp/admin/admin.component';
import { AdminUsersComponent } from './comp/admin/admin.users/admin.users.component';
import { AdminProductsComponent } from './comp/admin/admin.products/admin.products.component';
import { AdminDiscountComponent } from './comp/admin/admin.discount/admin.discount.component';
import { UserWishlistsComponent } from './comp/user/user.wishlists/user.wishlists.component';
import { UserProductsComponent } from './comp/user/user.products/user.products.component';
import { UserOrdersComponent } from './comp/user/user.orders/user.orders.component';
import { AdminReportComponent } from './comp/admin/admin.report/admin.report.component';
import { SignupComponent } from './comp/signup/signup.component';
import { AuthGuard } from './comp/Authguard/AuthGuard.guard';
import { UserCartComponent } from './comp/user/user.cart/user.cart.component';
import { AdminOrderComponent } from './comp/admin/admin.order/admin.order.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent},
  { path: 'adminUser', component: AdminUsersComponent, canActivate:[AuthGuard] },
  {path: 'adminOrd', component:AdminOrderComponent, canActivate:[AuthGuard] },
  { path: 'adminProd', component: AdminProductsComponent, canActivate:[AuthGuard] },
  { path: 'adminDis', component: AdminDiscountComponent, canActivate:[AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard] },
  {path: 'adminRep', component: AdminReportComponent, canActivate:[AuthGuard]},
  { path: 'userWish', component: UserWishlistsComponent, canActivate:[AuthGuard]},
  {path: 'userCart', component: UserCartComponent, canActivate:[AuthGuard] },
  { path: 'user', component: UserProductsComponent, canActivate:[AuthGuard]},
  { path: 'userOrder', component: UserOrdersComponent, canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

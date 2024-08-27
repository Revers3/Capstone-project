import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, of, switchMap, throwError } from "rxjs";
import { Cart, Login, ProductWithDiscount } from "./Auth.Model";
import { UserService } from "./User.Service";

@Injectable({
    providedIn: 'root'
  })
export class CartService {
    private baseUrl: string = 'http://localhost:8080/shop'; //base url
    constructor(private http: HttpClient, private userService: UserService) { }

    //creating a cart item
  createCartItem(car: Cart) {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.post<Cart>(`${this.baseUrl}/cart/add/${car.login.id}`, car, {headers});
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }

  //get all carts
  getAllCartItems(){
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<Cart[]>(`${this.baseUrl}/cart/all`, {headers});
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }

  //get all cart items by user id
  getCartItemsById(id: number)
  {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<Cart[]>(`${this.baseUrl}/cart/all/${id}`, {headers});
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }

  wipeCartById(id: number)
  {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.delete<Cart[]>(`${this.baseUrl}/cart/clear/${id}`, {headers});
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }

  deleteCartByCartId(id: number)
  {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.delete<Cart>(`${this.baseUrl}/cart/delete/${id}`, {headers});
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }
  

  
  }

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Order } from "./Auth.Model";
import { UserService } from "./User.Service";


@Injectable({
    providedIn: 'root'
  })

  export class OrderService{
    private baseUrl: string = 'http://localhost:8080/shop'; //base url
    constructor(private http: HttpClient, private userService: UserService) { }

    //creating an order
    createOrder(ord: Order): Observable<Order>{
        const token = this.userService.getToken();
        if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.post<Order>(`${this.baseUrl}/order/add/${ord.login.id}`, ord, {headers});
    } else {
        return throwError(()=> new Error('No token found'));
      }
    }

    //get all orders by user
    //need to change the link for this because it won't work
    getOrdersByUser(id: number): Observable<Order[]>
    {
        const token = this.userService.getToken();
        if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.get<Order[]>(`${this.baseUrl}/order/getByUser/${id}`, {headers});
    } else {
        return throwError(()=> new Error('No token found'));
      }
    }

    //get order by id
    getOrderById(id: number) {
        const token = this.userService.getToken();
        if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.get<Order>(`${this.baseUrl}/order/get/${id}`, {headers});
    } else {
        return throwError(()=> new Error('No token found'));
      }
    }

    getAllOrders()
    {
        const token = this.userService.getToken();
        if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.get<Order[]>(`${this.baseUrl}/order/all`, {headers});
    } else {
        return throwError(()=> new Error('No token found'));
      }
    }

    updateOrder(order: Order)
    {
        const token = this.userService.getToken();
        if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.put<Order>(`${this.baseUrl}/order/update`, order, {headers});
    } else {
        return throwError(()=> new Error('No token found'));
      }
    }

    //cancel/delete an order
    deleteOrder(id: number): Observable<void> {
        const token = this.userService.getToken();
        if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.delete<void>(`${this.baseUrl}/order/delete/${id}`, {headers});
    } else {
        return throwError(()=> new Error('No token found'));
      }
    }
  


}
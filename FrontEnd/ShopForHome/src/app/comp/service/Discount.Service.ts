import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Discount } from "./Auth.Model";
import { Product } from "./Auth.Model";
import { UserService } from "./User.Service";

@Injectable({
    providedIn: 'root'
  })
  export class DiscountService {
    private baseUrl: string = 'http://localhost:8080/shop'; //base url
    constructor(private http: HttpClient, private userService: UserService) { }

    //creating a discount
  createDiscount(dis: Discount): Observable<Discount> {
    const token = this.userService.getToken();
        if(token){
  // Create headers with the token if it exists
    return this.http.post<Discount>(`${this.baseUrl}/discount/add`, dis);
        }else {
      return throwError(()=> new Error('No token found'));
    }
  }

  //get all discounts
  getAllDiscounts(): Observable<Discount[]> {
    const token = this.userService.getToken();
        if(token){
    return this.http.get<Discount[]>(`${this.baseUrl}/discount/all`);
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }

  // Update an existing product
  updateDiscount(dis: Discount): Observable<Discount> {
    const token = this.userService.getToken();
    if(token){
    return this.http.put<Discount>(`${this.baseUrl}/discount/update`, dis);
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }

  deleteDiscount(id: number): Observable<void> {
    const token = this.userService.getToken();
        if(token){
    return this.http.delete<void>(`${this.baseUrl}/discount/delete/${id}`);
  }else {
    return throwError(()=> new Error('No token found'));
  }
  }



}
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Product } from "./Auth.Model";
import { UserService } from "./User.Service";
import { head } from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/shop'; //base url

  constructor(private http: HttpClient, private userService: UserService) { }

  //creating a product
  createProduct(prod: Product): Observable<Product> {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.post<Product>(`${this.baseUrl}/product/add`, prod, {headers});
    } else {
      return throwError(()=> new Error('No token found'));
    }
  }


  //get all products
  getAllProducts(): Observable<Product[]> {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<Product[]>(`${this.baseUrl}/product/all`, {headers});
  } else {
    return throwError(()=> new Error('No token found'));
  }
  }

  //getting product by id
  getProductById(id: number) {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<Product>(`${this.baseUrl}/product/get/${id}`, {headers})
  } else {
    return throwError(()=> new Error('No token found'));
  }
  }

  // Update an existing product
  updateProduct(prod: Product): Observable<Product> {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.put<Product>(`${this.baseUrl}/product/update`, prod, {headers});
  } else {
    return throwError(()=> new Error('No token found'));
  }
  }

  deleteProduct(id: number): Observable<void> {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.delete<void>(`${this.baseUrl}/product/delete/${id}`, {headers});
  } else {
    return throwError(()=> new Error('No token found'));
  }
  }
}
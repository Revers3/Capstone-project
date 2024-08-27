import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Login, Wishlist } from "./Auth.Model";
import { tap } from 'rxjs/operators';
import { UserService } from "./User.Service";

@Injectable({
    providedIn: 'root'
  })
export class WishlistService {
    private baseUrl: string = 'http://localhost:8080/shop'; //base url

  constructor(private http: HttpClient, private userService: UserService) { }

  //creating a wishlist item
  createWishlist(wish: Wishlist): Observable<Wishlist> {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.post<Wishlist>(`${this.baseUrl}/wishlist/add/${wish.login.id}`, wish, {headers});
    }
    {
      return throwError(()=> new Error('No token found'));
    }
  }

  //get all wishlists by user
  getWishlistsByUser(id: number): Observable<Wishlist[]>
  {
    
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<Wishlist[]>(`${this.baseUrl}/wishlist/all/${id}`, {headers});
  }
  {
    return throwError(()=> new Error('No token found'));
  }
  }

  //delete wishlist
  deleteWishlist(id: number): Observable<void> {
    const token = this.userService.getToken();
    if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.delete<void>(`${this.baseUrl}/wishlist/delete/${id}`, {headers});
  }
  {
    return throwError(()=> new Error('No token found'));
  }
}
}
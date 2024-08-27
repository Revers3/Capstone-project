import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Login } from "./Auth.Model";
import { tap } from 'rxjs/operators';
import { userToken } from "../login/login.comp";

//login is the same for both user and admin, but the requests are different

interface LoginResponse {
  token: string;
}

interface RegisterUserDto{
  username: string;
  password: string;
}

interface LoginUserDto{
  username: string;
  password: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string = 'http://localhost:8080/shop'; //base url

    constructor(private http: HttpClient) { }

    /*
    //creating a new user
    //doesn't work anymore
    createUser(loginUserDto: LoginUserDto): Observable<Login> {
        return this.http.post<Login>(`${this.baseUrl}/user/add`, loginUserDto);
    }  */

    //creating a new user
    signUp(registerUserDto: RegisterUserDto): Observable<any> {
      return this.http.post<any>('http://localhost:8080/shop/signup', registerUserDto);
    }


    login(username: string, password: string): Observable<LoginResponse> {
      return this.http.post<LoginResponse>('http://localhost:8080/shop/login', { username, password})
      .pipe(
        tap(response => this.storeToken(response.token))
      );

      
    }

    private storeToken(token: string): void {
      localStorage.setItem('jwtToken', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('jwtToken');
    }

    deleteToken()
    {
      return localStorage.removeItem('jwtToken');
    }
  
    logout(): void {
      localStorage.removeItem('jwtToken');
    }




    // Method to get user by username
  getUserByUsername(username: string): Observable<Login | null> {
    // Get the token from local storage
  const token = this.getToken();

  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  
    return this.http.get<Login>(`${this.baseUrl}/user/get/${username}`).pipe(
        map(response => response), // Directly map response to User
        catchError(this.handleError) // Handle errors
      );
  }

  // Handle errors from HTTP requests
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  //get all users
  getAllUsers(): Observable<Login[]> {
    // Get the token from local storage
  const token = this.getToken();
  // Create headers with the token if it exists
  if(token)
  {
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<Login[]>(`${this.baseUrl}/user/all`, { headers });
  } else 
  {
    return throwError(()=> new Error('No token found'));
  }
  }
  


    // Update an existing user
    updateUser(login: LoginUserDto, id: number) {
        {
      // Get the token from local storage
      const token = this.getToken();
      if(token){
      // Create headers with the token if it exists
      const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.put<any>(`${this.baseUrl}/user/update/${id}`, login);
      } else 
      {
        return throwError(()=> new Error('No token found'));
      }
    }
  }



    //deleting a user
    // Delete a user by ID
    deleteUser(id: number): Observable<void> {
      // Get the token from local storage
  const token = this.getToken();
  if(token){
  // Create headers with the token if it exists
  const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
        return this.http.delete<void>(`${this.baseUrl}/user/delete/${id}`);
      } else 
      {
        return throwError(()=> new Error('No token found'));
      }
    }




    isUserAuthenticated(): boolean
    {
      const data = localStorage.getItem(userToken);
      if(data)
      {
        return true;
      } else 
      {
        return false;
      }
    }
}
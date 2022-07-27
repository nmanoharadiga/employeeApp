import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 userData  = {
  username : "",
  isValidUser : false
 }
  constructor(private http: HttpClient) { }

  authenticateUser(username: string, password: string) {
    //return this.http.get('/api/athenticate');
    this.userData.username = username;
    this.userData.isValidUser =true;
    return this.userData;
  }


}

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';

import { environment } from '../../../environments/environment';
import { of, EMPTY, Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends BaseService {
    BaseURI: string;

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
            super();
            this.BaseURI = environment.ResourceServer.Endpoint + "authentication";
    }

    login(user) {
        return this.http.post(this.BaseURI + '/authenticate', user).pipe(map(res  => {
           
            const decodedToken = jwt_decode(res['token']);
            console.log(decodedToken);
            this.localStorage.setItem('currentUser', JSON.stringify({

                token: res['token'],
                role: res['role'],
                fullName: res['username'],
                expiration : res['expiration']
            }));
            return true;
        }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
         return JSON.parse(this.localStorage.getItem('currentUser'));
       
    }
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.BaseURI+"/users" );
      }
      getAllRoles(): Observable<any[]> {
        return this.http.get<any[]>(this.BaseURI+"/roles" );
      }
      add(value) {
        console.log(value);
      let header = new HttpHeaders();
      header.set("Content-Type", "applications/json;charset=UTF-8");
      return this.http.post(this.BaseURI+"/register" , value, {headers : header}).pipe(catchError(this.handleError) );
    }
    
    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).delay(1000);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }
}

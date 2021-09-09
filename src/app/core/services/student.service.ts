import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as uuid from 'uuid';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService{
  delete(id: string) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    
    return this.httpCLient.delete(this.baseURL + "/" + id  ).pipe(catchError(this.handleError) )
  }
  activate(id: string) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.httpCLient.put(this.baseURL+"/" +  id +"/activate" , null).pipe(catchError(this.handleError) );
  }
  deactivate(id: string) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.httpCLient.put(this.baseURL+"/" +  id +"/reject" , null).pipe(catchError(this.handleError) );
  }
  add(value) {
      console.log(value);
    let header = new HttpHeaders();
    header.set("Content-Type", "applications/json;charset=UTF-8");
    return this.httpCLient.post(this.baseURL , value, {headers : header}).pipe(catchError(this.handleError) );
  }
  
  baseURL = "";
  constructor(private httpCLient: HttpClient) {
    super();
    this.baseURL = environment.ResourceServer.Endpoint + "students";
  }
 
  getAll(): Observable<any[]> {
    return this.httpCLient.get<any[]>(this.baseURL );
  }
  
}

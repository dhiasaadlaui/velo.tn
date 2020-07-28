import { Claim } from './../model/Claim';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Disponibility } from '../model/Disponibility';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  errorMsg: string;

  private baseUrl = 'http://localhost:8000';

  constructor(private httpcl:HttpClient) { }

  getAll(){
    return this.httpcl.get<User[]>(`${this.baseUrl}/getusers`);
   }


   enroll(user : User): Observable<User>{
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

     return this.httpcl.put<User>(`${this.baseUrl}/updateuser/`+user.id, user ,{
		headers: httpHeaders,
    observe: 'response'}
    
    ).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );;
    
   }

   getClaims(){
    return this.httpcl.get<Claim[]>(`${this.baseUrl}/getclaims`);
   }

  addClaim(claim : Claim): Observable<Claim>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.post<Claim>(`${this.baseUrl}/addclaim`, claim ,{
  headers: httpHeaders,
  observe: 'response'}
  ).pipe(
    map(res => res.status),
    catchError(this.handleError)
  );
 }

 deleteClaim(claim : Claim): Observable<Claim>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.post<Claim>(`${this.baseUrl}/deleteclaim/`+claim.id, claim ,{
  headers: httpHeaders,
  observe: 'response'}
  ).pipe(
    map(res => res.status),
    catchError(this.handleError)
  );
 }

 updateClaim(claim : Claim): Observable<Claim>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.put<Claim>(`${this.baseUrl}/updateclaim/`+claim.id, claim ,{
  headers: httpHeaders,
  observe: 'response'}
  
  ).pipe(
    map(res => res.status),
    catchError(this.handleError)
  );;
  
 }

 updateAssignClaim(claim : Claim): Observable<Claim>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.put<Claim>(`${this.baseUrl}/updateassignclaim/`+claim.id, claim ,{
  headers: httpHeaders,
  observe: 'response'}
  
  ).pipe(
    map(res => res.status),
    catchError(this.handleError)
  );;
  
 }

 getUserDisp(user : User) : Observable<any>{
  return this.httpcl.get<any>(`${this.baseUrl}/disponibility/`+user.id);
  
}

updateDisp(user : User): Observable<User>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.put<User>(`${this.baseUrl}/updatedisp/`+user.id, user ,{
  headers: httpHeaders,
  observe: 'response'}
  
  ).pipe(
    map(res => res.status),
    catchError(this.handleError)
  );;
  
 }

 asign(user : number,claim : number): Observable<any>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.post(`${this.baseUrl}/assign/`+user+"/"+claim,user ,{
  headers: httpHeaders,
  observe: 'response'}
  ).pipe(
    catchError(error => {
      if (error.error) {
          this.errorMsg = this.getServerErrorMessage(error);
      }
        console.log("THROWNING ERROR");
      return throwError(this.errorMsg);
  })
  );;
  
 }

 getAssignedTome(user : number){
  return this.httpcl.get(`${this.baseUrl}/getassigned/`+user)
  
}

getStats(){
  return this.httpcl.get<any>(`${this.baseUrl}/getstats/`);
 }

 private handleError(error: any): Promise<any> {
  console.log('An error occurred', error , "+ ");
  return Promise.reject(error.message || error);
}

private getServerErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
      case 404: {
          return `Not Found: ${error.message}`;
      }
      case 403: {
          return `Access Denied: ${error.message}`;
      }
      case 500: {
          return `Internal Server Error: ${error.message}`;
      }
      default: {
          return `Unknown Server Error: ${error.message}`;
      }

  }
}

}

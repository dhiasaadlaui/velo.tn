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

  constructor(private httpcl:HttpClient) { }

  getAll(){
    return this.httpcl.get<User[]>("http://localhost/BackendSF/web/app_dev.php/getusers");
   }


   enroll(user : User): Observable<User>{
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

     return this.httpcl.put<User>("http://localhost/BackendSF/web/app_dev.php/updateuser/"+user.id, user ,{
		headers: httpHeaders,
    observe: 'response'}
    
    ).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );;
    
   }

   getClaims(){
    return this.httpcl.get<Claim[]>("http://localhost/BackendSF/web/app_dev.php/getclaims");
   }

  addClaim(claim : Claim): Observable<Claim>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.post<Claim>("http://localhost/BackendSF/web/app_dev.php/addclaim", claim ,{
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

   return this.httpcl.post<Claim>("http://localhost/BackendSF/web/app_dev.php/deleteclaim/"+claim.id, claim ,{
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

   return this.httpcl.put<Claim>("http://localhost/BackendSF/web/app_dev.php/updateclaim/"+claim.id, claim ,{
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

   return this.httpcl.put<Claim>("http://localhost/BackendSF/web/app_dev.php/updateassignclaim/"+claim.id, claim ,{
  headers: httpHeaders,
  observe: 'response'}
  
  ).pipe(
    map(res => res.status),
    catchError(this.handleError)
  );;
  
 }

 getUserDisp(user : User) : Observable<any>{
  return this.httpcl.get<any>("http://localhost/BackendSF/web/app_dev.php/disponibility/"+user.id);
  
}

updateDisp(user : User): Observable<User>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   return this.httpcl.put<User>("http://localhost/BackendSF/web/app_dev.php/updatedisp/"+user.id, user ,{
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

   return this.httpcl.post("http://localhost/BackendSF/web/app_dev.php/assign/"+user+"/"+claim,user ,{
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
  return this.httpcl.get("http://localhost/BackendSF/web/app_dev.php/getassigned/"+user)
  return this.httpcl
  .get("http://localhost/BackendSF/web/app_dev.php/getassigned/"+user)
  .pipe(
      catchError(error => {
          
          if (error.error) {
              this.errorMsg = this.getServerErrorMessage(error);
          }
            console.log("THROWNING ERROR");
          return throwError(this.errorMsg);
      })
  );
  
}

getStats(){
  return this.httpcl.get<any>("http://localhost/BackendSF/web/app_dev.php/getstats/");
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

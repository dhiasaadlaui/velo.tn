import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataFlow } from '../models/DataFlow';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})

export class DataFlowService {
  public obs :Observable <DataFlow>;

  constructor(private _http: HttpClient
    ) { }

    createStory(dataFlow : DataFlow){

      return this._http.post<DataFlow>(`${BASE_PATH}/addData`, dataFlow );
       }
 
      getData(username:string){
            this.obs=this._http.get<DataFlow>(`${BASE_PATH}/getData/`+username );
             return this.obs;

        }

        getDataLikes(username:string){
         return this._http.get<number>(`${BASE_PATH}/getDataLikes/`+username );
 
      }

      report(username:string){
        return this._http.post<any>(`${BASE_PATH}/report/`+username, null );

     }

     commend(username:string){
      return this._http.post<any>(`${BASE_PATH}/commend/`+username, null );

   }
   getPoints(username:string){
    return this._http.get<number>(`${BASE_PATH}/getPoints/`+username );

 }
}

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
  public obs: Observable<DataFlow>;

  constructor(private _http: HttpClient
  ) { }

  createStory(dataFlow: DataFlow) {

    return this._http.post<DataFlow>(`${BASE_PATH}/addData`, dataFlow);
  }

  deleteStory(username: string) {

    return this._http.delete<DataFlow>(`${BASE_PATH}/unsubscribe/` + username);
  }

  getData(username: string) {
    this.obs = this._http.get<DataFlow>(`${BASE_PATH}/getData/` + username);
    return this.obs;

  }

  getDataLikes(username: string) {
    return this._http.get<number>(`${BASE_PATH}/getDataLikes/` + username);

  }

  report(username: string) {
    return this._http.post<any>(`${BASE_PATH}/report/` + username, null);

  }

  commend(username: string) {
    return this._http.post<any>(`${BASE_PATH}/commend/` + username, null);

  }
  getPoints(username: string) {
    return this._http.get<number>(`${BASE_PATH}/getPoints/` + username);

  }

  getSotriesCount(username: string) {
    return this._http.get<number>(`${BASE_PATH}/getStoriesCount/` + username);
  }

  getRideCount(username: string) {
    return this._http.get<number>(`${BASE_PATH}/getRideCount/` + username);
  }

  getEventCount(username: string) {
    return this._http.get<number>(`${BASE_PATH}/getEventCount/` + username);
  }

  getParkiteer(username: string) {
    return 0;
  }
  getRidingDistance(username: string) {
    return this._http.get<number>(`${BASE_PATH}/getRidingDistance/` + username);
  }

} 

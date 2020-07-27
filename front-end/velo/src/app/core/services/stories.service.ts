import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { story } from '../models/story';
import { comment } from '../models/comment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';



const BASE_PATH = environment.basePath;
@Injectable({
  providedIn: 'root'
})
export class StoriesService {
 public obs :Observable <story[]>;
 public obs1 :Observable <comment[]>;

  constructor(
   private _http: HttpClient
  ) { }

  getStories(){
    
     this.obs=this._http.get<story[]>(`${BASE_PATH}/getStories`)
     return this.obs;
  }
  getComments(){
    this.obs1=this._http.get<comment[]>(`${BASE_PATH}/findComments`)
    return this.obs1;
  }
  createStory(story : story){

     return this._http.post<story>(`${BASE_PATH}/addStory`, story )
     }

  updateStory(story : story, id: number){
    return this._http.post<story>(`${BASE_PATH}/updateStory/`+id, story )
  }

  deleteStory(id:number){
    return this._http.delete<story>(`${BASE_PATH}/deleteStory/`+id)
  }
  /**
   * 
   * @param id - story identifier
   * @return {story} - story object
   */
  getStoryById(id : number){
// TO DO
  }
  likeStory(id: number){
    return this._http.post<story>(`${BASE_PATH}/likeStory/`+id, null )

  }
  
  unlikeStory(id: number){
    return this._http.post<story>(`${BASE_PATH}/unlikeStory/`+id, null )

  }


  createComment(comment : comment, id:number){
    return this._http.post<comment>(`${BASE_PATH}/addComment/`+id, comment )
  }

  updateComment(comment : comment, id:number){
    return this._http.post<comment>(`${BASE_PATH}/updateComment/`+id, comment )
  }

  deleteComment(id:number){
    return this._http.delete<comment>(`${BASE_PATH}/deleteComment/`+id)
  }
  
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error , "+ ");
    return Promise.reject(error.message || error);
  }
  
}

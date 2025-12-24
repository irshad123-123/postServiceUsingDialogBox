import { Injectable } from '@angular/core';
import { Ipost } from '../models/posts';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }
  postArr : Array<Ipost>  = [
  { id: '1', title: 'Angular Basics', body: 'This post explains Angular basics.' },
  { id: '2', title: 'CRUD Operations', body: 'This post is about CRUD in Angular.' },
  { id: '3', title: 'UUID Function', body: 'UUID is used to generate unique ids.' },
  { id: '4', title: 'HTTP Client', body: 'Angular HttpClient is used for API calls.' },
  { id: '5', title: 'RxJS Basics', body: 'RxJS helps in handling async data.' }
];
getAllPost():Observable<Ipost[]>{
  return of(this.postArr)
}
addPost(obj:Ipost){
  this.postArr.push(obj)
  return of(obj)
}
removePost(obj : Ipost){
  let getIndex = this.postArr.findIndex(f=>f.id === obj.id)
  this.postArr.splice(getIndex, 1)
  return of(obj)
}
updatePost(obj : Ipost){
  let getIndex = this.postArr.findIndex(f=>f.id === obj.id)
  this.postArr[getIndex] = obj
  return of(obj)
}
}

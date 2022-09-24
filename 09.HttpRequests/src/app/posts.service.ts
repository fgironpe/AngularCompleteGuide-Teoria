import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Error } from "./error.model";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<Error>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content }; 
    
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-6d845-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
        console.log("resp => ", responseData);
      }, (error: Error) => {
        this.error.next(error);
      });
  } 
  
  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-6d845-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: new HttpParams().set('print', 'pretty')
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData)  {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );  
  }

  deletePosts() {
    return this.http
      .delete(
        'https://ng-complete-guide-6d845-default-rtdb.europe-west1.firebasedatabase.app/post.json',
        {
          observe: 'events'
        }
      ).pipe(tap(event => {
        console.log("event => ", event);
        if (event.type === HttpEventType.Sent) {
          // Hacer cosas mientras la solicitud se está enviando
        }
        if (event.type === HttpEventType.Response) {
          console.log("eventBody => ", event.body)
        }
      }));
  }

}
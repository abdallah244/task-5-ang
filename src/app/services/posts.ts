import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('GET Error:', error);
        return throwError(() => error);
      })
    );
  }

  addPost(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(error => {
        console.error('POST Error:', error);
        return throwError(() => error);
      })
    );
  }
}

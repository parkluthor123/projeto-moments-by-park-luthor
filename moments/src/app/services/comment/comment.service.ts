import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../../interfaces/comment';
import { Response } from 'src/app/interfaces/response';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseApiURL = environment.baseApiURL;
  private apiUrl = `${this.baseApiURL}moments`;

  constructor(private http: HttpClient) { }

  createComment(data: Comment): Observable<Response<Comment>>
  {
    return this.http.post<Response<Comment>>(`${this.apiUrl}/${data.momentId}/comments`, data);
  }
}

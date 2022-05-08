import { MessagesService } from './../messages/messages.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Moment } from 'src/app/interfaces/moment';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiURL = environment.baseApiURL;
  private apiUrl = `${this.baseApiURL}moments`;

  constructor(private http: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData>
  {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getMoments(): Observable<Response<Moment[]>>
  {
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<Response<Moment>>{
    return this.http.get<Response<Moment>>(`${this.apiUrl}/${id}`);
  }

  removeMoment(id: number)
  {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData>
  {
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData);
  }

}

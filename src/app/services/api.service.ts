import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResult } from '../models/http-result';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<any>;

  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient
  ) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('current_user')));
    
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public getCurrentUser() {
    return this.currentUserSubject.value;
  }

  public getTickets() {
    return this.http.get<HttpResult>(`${this.apiUrl}/tickets`);
  }

  public register(data: any) {
    return this.http.post<HttpResult>(`${this.apiUrl}/participant`, data)
      .pipe(map(res => {
        if (res.success) {
          localStorage.setItem('current_user', JSON.stringify(res.data));
          localStorage.setItem('access_token', res.token);
          this.currentUserSubject.next(res.data);
        }
        return res;
      }));
  }

  public update(data: any) {
    return this.http.put<HttpResult>(`${this.apiUrl}/participant`, data)
      .pipe(map(res => {
        if (res.success) {
          localStorage.setItem('current_user', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
        return res;
      }));
  }

  public login(data: any) {
    return this.http.post<HttpResult>(`${this.apiUrl}/participant/login`, data)
      .pipe(map(res => {
        if (res.success) {
          localStorage.setItem('current_user', JSON.stringify(res.data));
          localStorage.setItem('access_token', res.token);
          this.currentUserSubject.next(res.data);
        }
        return res;
      }));
  }

  public logout() {
    const token = localStorage.getItem('access_token');
    return this.http.post<HttpResult>(`${this.apiUrl}/participant/logout`, { token })
      .pipe(map(res => {
        if (res.success) {
          localStorage.clear();
          this.currentUserSubject.next(null);
        }
        return res;
      }));
  }

  public getAuth() {
    return this.http.get<HttpResult>(`${this.apiUrl}/participant`);
  }
  
  public pay(data: any) {
    return this.http.post<HttpResult>(`${this.apiUrl}/participant/pay`, data);
  }
  
}

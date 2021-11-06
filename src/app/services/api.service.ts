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

  public login(data: any) {
    return this.http.post<HttpResult>(`${this.apiUrl}/auth/login`, data)
      .pipe(map(res => {
        if (res.success) {
          localStorage.setItem('current_user', JSON.stringify(res.data.user));
          localStorage.setItem('access_token', res.data.token);
          this.currentUserSubject.next(res.data.user);
        }
        return res;
      }));
  }

  public logout() {
    return this.http.post<HttpResult>(`${this.apiUrl}/auth/logout`, null)
      .pipe(map(res => {
        if (res.success) {
          localStorage.clear();
          this.currentUserSubject.next(null);
        }
        return res;
      }));
  }

  public dashboard() {
    return this.http.get<HttpResult>(`${this.apiUrl}/dashboard`);
  }

  public getCustomers(params?: any) {
    return this.http.get<HttpResult>(`${this.apiUrl}/customer`, { params: params });
  }

  public getExpiredCustomers() {
    return this.http.get<HttpResult>(`${this.apiUrl}/customer/expired`);
  }

  public getPositiveCustomers() {
    return this.http.get<HttpResult>(`${this.apiUrl}/customer/positive`);
  }

  public createCustomer(data: any) {
    return this.http.post<HttpResult>(`${this.apiUrl}/customer`, data);
  }

  public syncCustomer(data: any) {
    return this.http.post<HttpResult>(`${this.apiUrl}/customer/sync`, data);
  }

  public getPaymentOptions() {
    return this.http.get<HttpResult>(`${this.apiUrl}/order/options`);
  }

  public getProducts(params?: any) {
    return this.http.get<HttpResult>(`${this.apiUrl}/product`, { params: params });
  }

  public getProductPrices(params: any) {
    return this.http.get<HttpResult>(`${this.apiUrl}/product/prices`, { params: params });
  }

  public getProductTables() {
    return this.http.get<HttpResult>(`${this.apiUrl}/product/tables`);
  }

  public getLabs() {
    return this.http.get<HttpResult>(`${this.apiUrl}/product/labs`);
  }

  public getOrders(params?: any) {
    return this.http.get<HttpResult>(`${this.apiUrl}/order`, { params: params });
  }

  public getOrderById(id: number) {
    return this.http.get<HttpResult>(`${this.apiUrl}/order/${id}`);
  }

  public createOrder(data: any) {
    return this.http.post<HttpResult>(`${this.apiUrl}/order`, data);
  }

}

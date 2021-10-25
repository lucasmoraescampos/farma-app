import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { LoadingService } from './services/loading.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private navCtrl: NavController,
        private loadingSrv: LoadingService
    ) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {

        if (err.status === 401) {

            localStorage.clear();

            this.navCtrl.navigateRoot('login', { animationDirection: 'forward' });

            return of(err.message);

        }

        return throwError(err);

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loadingSrv.show();

        const token = localStorage.getItem('access_token');

        if (token != null) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            
        }

        return next.handle(request)
            .pipe(catchError(err => this.handleAuthError(err)))
            .pipe(finalize(() => this.loadingSrv.hide()));
    
    }

}
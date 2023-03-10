import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private navCtrl: NavController
    ) {

    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const token = localStorage.getItem('access_token');

        if (token) {
            return true;
        }

        this.navCtrl.navigateRoot('/login');
        
        return false;

    }
}
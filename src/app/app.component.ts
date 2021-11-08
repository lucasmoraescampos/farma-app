import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SQLiteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private sqliteSrv: SQLiteService
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      if (Capacitor.isNativePlatform()) {

        this.sqliteSrv.createDatabase();

        StatusBar.setBackgroundColor({ color: '#FFFFFF' });

        StatusBar.setStyle({ style: Style.Light });

      }

    });

  }
  
}

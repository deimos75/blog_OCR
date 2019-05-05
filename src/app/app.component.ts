import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // Configuration de la BDD firebase
    const config = {
      apiKey: 'AIzaSyBw93lm8BevqOI0mBc7xtkrg29leKTKm8w',
      authDomain: 'blog-31933.firebaseapp.com',
      databaseURL: 'https://blog-31933.firebaseio.com',
      projectId: 'blog-31933',
      storageBucket: 'blog-31933.appspot.com',
      messagingSenderId: '365127096675',
      appId: '1:365127096675:web:d888030b3942d384'
    };
    firebase.initializeApp(config);
  }

}

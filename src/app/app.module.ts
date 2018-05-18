import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pipes
import { PipesModule } from "../pipes/pipes.module";

// Plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';


// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
};

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from "../pages/subir/subir";

import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider
  ]
})
export class AppModule {}

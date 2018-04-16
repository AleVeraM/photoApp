import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";


import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";

/*
  Generated class for the CargaArchivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaArchivoProvider {

  constructor(public http: HttpClient,
              private toastCtrl: ToastController) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase(archivo: ArchivoSubir) {

    let promesa = new Promise((resolve, reject) => {
      this.mostrar_toast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`img/${nombreArchivo}`)
          .putString(archivo.img, 'base64', {contentType: 'image/jpeg'});

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
        }, // saber el % de cuantos Mbs se han subido
        (error) => {
          console.log("Eroro en la carga");
          console.log(JSON.stringify(error));

          this.mostrar_toast(JSON.stringify(error));
          reject();

        },
        () => {
          // Todo bien
          console.log("Archivo subido");
          this.mostrar_toast('Imagen cargada correctamente');
          resolve();
        }
      )


    })

    return promesa;

  }

  mostrar_toast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }

}

interface ArchivoSubir {

  titulo: string;
  img: string;
  key?: string

}

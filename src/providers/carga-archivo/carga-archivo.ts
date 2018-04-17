import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";


import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";


@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];


  constructor(private toastCtrl: ToastController,
              public afDB: AngularFireDatabase) {

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

          let url = uploadTask.snapshot.downloadURL;

          this.crear_post(archivo.titulo, url, nombreArchivo);

          resolve();
        }
      )


    });

    return promesa;

  }

  private crear_post(titulo: string, url: string, nombreArchvio: string) {

    let post: ArchivoSubir =
      {
        img: url,
        titulo: titulo,
        key: nombreArchvio
      };

    console.log(JSON.stringify(post));
    // this.afDB.list(('/post')).push(post);
    this.afDB.object(`/post/${nombreArchvio}`).update(post); // hacer un then por más seguridad

    this.imagenes.push(post);


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

import {Component} from '@angular/core';
import {ViewController, ToastController} from 'ionic-angular';

import {Camera, CameraOptions} from '@ionic-native/camera';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker';
import {CargaArchivoProvider} from "../../providers/carga-archivo/carga-archivo";
import { Base64 } from '@ionic-native/base64';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string = "";
  imagenPreview: string ="";
  imagen64: string;


  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              private imagePicker: ImagePicker,
              private toastCtrl: ToastController,
              public _cap: CargaArchivoProvider,
              private base64: Base64) {
  }


  cerrar_modal() {
    this.viewCtrl.dismiss();
  }


  mostar_camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 = imageData;
      console.log("Imagen sacada por camara");
      console.log(this.imagenPreview);
    }, (err) => {
      this.presentToast(err);
      console.error("Error en cámara", JSON.stringify(err));
    });

  }

  seleccionar_foto() {

    let opciones: ImagePickerOptions = {
      quality: 70,
      outputType: 0,
      maximumImagesCount: 1
    };


    this.imagePicker.getPictures(opciones).then((results) => {


      for (var i = 0; i < results.length; i++) {
        //console.log('Image URI: ' + results[i]);
        let filePath: string = results[i];
        console.log(results[i]);
        this.base64.encodeFile(filePath).then((base64File: string) => {
          console.log(base64File);
          this.imagenPreview =  base64File;
          this.imagen64 = base64File;
        }, (err) => {
          console.log(err);
        });

      }

    }, (err) => {
      this.presentToast(err);
      console.error("Error en la Seleccion", JSON.stringify(err));
    });
  }

  crear_post() {
    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    };

    this._cap.cargar_imagen_firebase(archivo).then(() => this.cerrar_modal());

  }


  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }


}

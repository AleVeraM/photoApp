import {Component} from '@angular/core';
import {ViewController, ToastController} from 'ionic-angular';

import {Camera, CameraOptions} from '@ionic-native/camera';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker';
import {CargaArchivoProvider} from "../../providers/carga-archivo/carga-archivo";

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;
  imagenPreview: string;
  imagen64: string;


  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              private imagePicker: ImagePicker,
              private toastCtrl: ToastController,
              public _cap: CargaArchivoProvider) {
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 = imageData;
    }, (err) => {
      this.presentToast(err);
      console.error("Error en cámara", JSON.stringify(err));
    });

  }

  seleccionar_foto(){
    let opciones:ImagePickerOptions = {
      quality: 100,
      outputType: 1,
      maximumImagesCount: 1

    }

    this.imagePicker.getPictures(opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
        //console.log('Image URI: ' + results[i]);
        this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
        this.imagen64 = results[i];
      }

    }, (err) => {
      this.presentToast(err);
      console.error("Error en la Seleccion", JSON.stringify(err));
    });
  }

  crear_post(){
    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }

    this._cap.cargar_imagen_firebase(archivo);
  }


  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }


}

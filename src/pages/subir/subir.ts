import {Component} from '@angular/core';
import {ViewController, ToastController} from 'ionic-angular';

import {Camera, CameraOptions} from '@ionic-native/camera';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;
  imagenPreview: string;


  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              private toastCtrl: ToastController) {
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
    }, (err) => {
      this.presentToast(err);
      console.error("Error en cámara", JSON.stringify(err));
    });

  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }


}

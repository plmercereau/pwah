import { Injectable, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController} from "ionic-angular";

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  constructor(private toastCtrl: ToastController) {
    super(false);
  }

  handleError(error: any): void {
    super.handleError(error);
    console.log('Error: ' + error);
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  /* Errors Method */
  // handleError(err){
  //   // open ionic alert dialog
  //   let msg:string[] = [];
  //   JSON.parse(err).map(error => {
  //     let vals = Object.keys(error).map(key => error[key])
  //     msg.push(vals.join(''))
  //   })
  //
  //   // Create alert to display errors
  //   let alert = this.alertCtrl.create({
  //     title: 'Erreur',//TODO translate
  //     subTitle: msg.join(' <br/> '),
  //     buttons: ['OK']//TODO translate
  //   });
  //   alert.present();
  // }

}

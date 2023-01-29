import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {

  qrCodeString: any;
  showQRCode: boolean;
  randomString: string;
  constructor() { }

  ngOnInit() {
    this.showQRCode = false;
  }

  ionViewWillEnter(){
    this.randomString = (Math.random() + 1).toString(36).substring(7);
    this.generateQRCode(this.randomString);
  }

  generateQRCode(data: string) {
    this.showQRCode = true;
    this.qrCodeString = data.toString();
  }

  async share(){
    await Share.share({
      title: 'Generated QR',
      text: this.randomString,
    });
  }
}
